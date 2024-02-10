import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ethers } from "ethers";
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from "ethers-multicall";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Dapp from "./Dapp";
import Leaderboard from "./Leaderboard";

import MouseFollower from "./MouseFollower";

import Axios from "axios";

import UsdcAbi from "../data/Erc20Usdc.json";
import UsdcAddress from "../data/Erc20Usdc-address.json";
import TokenAbi from "../data/TestToken.json";
import TokenAddress from "../data/TestToken-address.json";
import PoolMasterAbi from "../data/PoolMaster.json";
import PoolMasterAddress from "../data/PoolMaster-address.json";

const API_ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT + "/api/phase";
const RPC_URL = import.meta.env.VITE_RPC_URL;
const NETWORK = import.meta.env.VITE_NETWORK;
const CHAIN_ID = import.meta.env.VITE_CHAIN_ID;

const fromWei = (num) => Math.floor(ethers.utils.formatEther(num));
const toWei = (num) => ethers.utils.parseEther(num.toString());

function App() {
  const [account, setAccount] = useState(null);
  const [setupDone, setSetupDone] = useState(false);

  // Consolidate states related to contracts into a single state object
  // This helps in managing related data together and reduces the number of state hooks
  const [contracts, setContracts] = useState({
    signer: null,
    writeProvider: {},
    poolMaster: null,
    token: {},
    usdc: {},
    multicallProvider: null,
    poolMasterMulticall: null,
    tokenMulticall: {},
    usdcMulticall: {},
  });

  const [currentPhase, setCurrentPhase] = useState(null);
  const [stakedAmountForAddress, setStakedAmountForAddress] = useState(0);
  const [poolIdForAddress, setPoolIdForAddress] = useState(0);
  const [shouldUpdateTimer, setShouldUpdateTimer] = useState(false);
  const [endTimestamp, setEndTimestamp] = useState(0);
  const [timeleft, setTimeleft] = useState(0);
  const [pools, setPools] = useState([0, 1, 2]);

  const [menu, setMenu] = useState(0);
  const [popup, setPopup] = useState(0);

  const intervalRef = useRef();
  const poolMasterRef = useRef();

  const initTimer = useEffect(() => {
    // Clear any existing timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    let timerEnded = false;

    const updateTimer = () => {
      const currentTime = parseInt(Date.now() / 1000);
      const timeLeft = Math.max(0, endTimestamp - currentTime);
      setTimeleft(timeLeft);

      // Check if the timer has ended and the fetch hasn't been triggered yet
      if (timeLeft <= 0 && !timerEnded) {
        console.log("Phase Interval was just reset.");
        timerEnded = true;
        clearInterval(intervalRef.current); // Clear the interval to stop the timer
        intervalRef.current = null;
      }
    };

    intervalRef.current = setInterval(updateTimer, 1000);
    updateTimer();
  }, [endTimestamp]);

  const setupBrowserClient = useCallback(async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account);

    const networkId = await window.ethereum.request({
      method: "net_version",
    });

    // If not connected to the Goerli testnet, ask to switch
    if (networkId !== "5") {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
      } catch (switchError) {
        console.error(switchError);
      }
    }

    const writeProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = writeProvider.getSigner();

    const poolMaster = new ethers.Contract(
      PoolMasterAddress.address,
      PoolMasterAbi.abi,
      signer
    );
    const token = new ethers.Contract(
      TokenAddress.address,
      TokenAbi.abi,
      signer
    );
    const usdc = new ethers.Contract(UsdcAddress.address, UsdcAbi.abi, signer);

    poolMasterRef.current = poolMaster;

    setContracts((prev) => ({
      ...prev,
      signer,
      writeProvider,
      poolMaster,
      token,
      usdc,
    }));
  });

  const setupReadClient = async () => {
    const readProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const multicallProvider = new MulticallProvider(
      readProvider,
      Number(CHAIN_ID)
    );
    await multicallProvider.init();

    const poolMasterMulticall = new MulticallContract(
      PoolMasterAddress.address,
      PoolMasterAbi.abi
    );
    const tokenMulticall = new MulticallContract(
      TokenAddress.address,
      TokenAbi.abi
    );
    const usdcMulticall = new MulticallContract(
      UsdcAddress.address,
      UsdcAbi.abi
    );

    setContracts((prev) => ({
      ...prev,
      multicallProvider,
      poolMasterMulticall,
      tokenMulticall,
      usdcMulticall,
    }));
  };

  const loadPoolData = async () => {
    const calls = [0, 1, 2].flatMap((id) => [
      contracts.poolMasterMulticall.getSymbol(id),
      contracts.poolMasterMulticall.getStakedTokens(id, false),
      contracts.poolMasterMulticall.getStakedTokens(id, true),
      contracts.poolMasterMulticall.getInitialPrice(id),
      id < 2
        ? contracts.poolMasterMulticall.getLastWinner(id)
        : Promise.resolve(null),
    ]);
    calls.pop();

    const results = await contracts.multicallProvider.all(calls);

    const poolsTemp = [0, 1, 2].map((id, index) => ({
      token: id < 2 ? results[index * 5] : undefined,
      tokenCount: fromWei(results[index * 5 + 1]),
      usdcCount: ethers.utils.formatUnits(results[index * 5 + 2], 6),
      initialPrice: results[index * 5 + 3],
      lastWinner: results[index * 5 + 4],
    }));

    setPools(poolsTemp);
  };

  const fetchContractData = useCallback(async () => {
    if (
      contracts.multicallProvider === null ||
      !contracts.poolMasterMulticall
    ) {
      console.log("multicallProvider is null");
      return;
    }

    if (account !== null) {
      const poolMasterCalls = [
        contracts.poolMasterMulticall.getStakedTokensForAddress(account),
        contracts.poolMasterMulticall.getPoolIdForAddress(account),
      ];
      try {
        const results = await contracts.multicallProvider.all(poolMasterCalls);
        if (account !== null) {
          setStakedAmountForAddress(fromWei(results[0]));
          setPoolIdForAddress(parseInt(results[1], 10));
        }
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    }

    await loadPoolData();
  }, [
    account,
    contracts.multicallProvider,
    contracts.poolMasterMulticall,
    loadPoolData,
  ]);

  const fetchPhase = useCallback(async () => {
    try {
      const response = await Axios.get(API_ENDPOINT);
      const { phase, endTimestamp } = response.data;

      if (currentPhase !== Number(phase)) {
        setCurrentPhase(Number(phase));
        setEndTimestamp(Number(endTimestamp));
        setShouldUpdateTimer(true);
      }
      return phase;
    } catch (error) {
      console.error("Error fetching phase:", error);
    }
  }, [currentPhase]);

  useEffect(() => {
    if (!shouldUpdateTimer) return;
    console.log("Fetching contract data after setting new phase...");
    fetchContractData();
  }, [shouldUpdateTimer]);

  useEffect(() => {
    async function initializeWeb3() {
      await setupReadClient();
      setSetupDone(true);
    }

    initializeWeb3();
  }, []);

  useEffect(() => {
    if (setupDone) {
      fetchPhase();
      const phaseInterval = setInterval(fetchPhase, 5000);

      return () => clearInterval(phaseInterval);
    }
  }, [setupDone]);

  useEffect(() => {
    if (setupDone && contracts.multicallProvider) {
      fetchContractData();

      const contractDataInterval = setInterval(fetchContractData, 15000);
      return () => clearInterval(contractDataInterval);
    }
  }, [setupDone, contracts.multicallProvider]);

  const closePopup = () => {
    setPopup(0);
  };

  const triggerPopup = (popupId) => {
    console.log("triggerPopup", popupId);
    setPopup(popupId);
  };

  const setMenuConnectWallet = async (menuId) => {
    if (!account) return;
    setMenu(menuId);
  };

  return (
    <BrowserRouter>
      <div className="App" id="wrapper">
        <div className="m-0 p-0">
          <Routes>
            <Route
              index
              path="/vaults"
              element={
                <>
                  <Navbar
                    setupBrowserClient={setupBrowserClient}
                    account={account}
                    setMenu={setMenu}
                  />
                  <Dapp
                    poolMaster={contracts.poolMaster}
                    account={account}
                    usdc={contracts.usdc}
                    token={contracts.token}
                    phase={currentPhase}
                    timeleft={timeleft}
                    pools={pools}
                    stakedAmountForAddress={stakedAmountForAddress}
                    poolIdForAddress={poolIdForAddress}
                  />
                </>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <>
                  <Navbar
                    setupBrowserClient={setupBrowserClient}
                    account={account}
                    setMenu={setMenu}
                  />
                  <Leaderboard network={NETWORK} />
                </>
              }
            />
          </Routes>
        </div>
      </div>
      <MouseFollower />
    </BrowserRouter>
  );
}

export default App;
