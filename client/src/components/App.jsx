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
import Home from "./Home";
import Leaderboard from "./Leaderboard";

import MouseFollower from "./MouseFollower";

import Axios from "axios";

import UsdcAbi from "../data/usdc.json";
import UsdcAddress from "../data/usdc-address.json";
import TokenAbi from "../data/Token.json";
import TokenAddress from "../data/Token-address.json";
import PoolMasterAbi from "../data/PoolMaster.json";
import PoolMasterAddress from "../data/PoolMaster-address.json";

const API_ENDPOINT =
  import.meta.env.REACT_APP_IS_PRODUCTION_ENVIRONMENT === "true"
    ? "/api/end_epoch"
    : "http://localhost:4000/api/end_epoch";
const RPC_URL =
  import.meta.env.ARBITRUM_MAINNET_RPC_URL || "https://arb1.arbitrum.io/rpc";
const NETWORK = "arbitrum"; // move this to an environment variable

const fromWei = (num) => Math.floor(ethers.utils.formatEther(num));
const toWei = (num) => ethers.utils.parseEther(num.toString());

function App() {
  const [account, setAccount] = useState(null);

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

  const [phase, setPhase] = useState(0);
  const [stakedAmountForAddress, setStakedAmountForAddress] = useState(0);
  const [poolIdForAddress, setPoolIdForAddress] = useState(0);
  const [timestampStartEpoch, setTimestampStartEpoch] = useState(0);
  const [timeleft, setTimeleft] = useState(null);
  const [pools, setPools] = useState([0, 1, 2]);

  const [menu, setMenu] = useState(0);
  const [popup, setPopup] = useState(0);
  const [intervalVariable, setIntervalVariable] = useState(null);

  const intervalRef = useRef();
  intervalRef.current = intervalVariable;

  const poolMasterRef = useRef();
  poolMasterRef.current = contracts.poolMaster;

  const zeroPad = (num, places) => String(num).padStart(places, "0");

  const initTimer = useCallback((startTimestamp, duration) => {
    if (startTimestamp == 0) {
      setTimeleft(0);
      return;
    }
    const testOffset = 0 * 24 * 60 * 1000; // Set to 0 for live version

    const timestampEnd = (startTimestamp + duration) * 1000;
    let timeleftTemp = timestampEnd - Date.now() - testOffset;

    let dateNow = Date.now() + testOffset;
    setTimeleft(timeleftTemp);
    console.log("timeleftTemp: " + timeleftTemp);
    console.log("Date.now(): " + dateNow);
    console.log("Set interval");

    if (intervalRef.current == null) {
      let intervalId = setInterval(() => {
        dateNow = Date.now() + testOffset;

        let timeleftTemp = timestampEnd - dateNow;
        setTimeleft(timeleftTemp);

        // if (timeleftTemp <= 0 && phase < 2) {
        //   loadContractsData()
        //   clearInterval(intervalId);
        //   console.log("reset interval")
        // }
      }, 1000);

      intervalRef.current = intervalId;
      setIntervalVariable(intervalId);
    }
  }, []);

  const setupBrowserClient = useCallback(async () => {
    // Assuming only the first account is used
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account);

    // Write provider using ethers
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
    const multicallProvider = new MulticallProvider(readProvider);
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

  const fetchContractData = useCallback(async () => {
    if (contracts.multicallProvider === null || !contracts.poolMasterMulticall)
      return;

    const poolMasterCalls = [
      contracts.poolMasterMulticall.getPhase(),
      contracts.poolMasterMulticall.timestampStartEpoch(),
      contracts.poolMasterMulticall.bettingPhaseDuration(),
      contracts.poolMasterMulticall.battlingPhaseDuration(),
    ];

    if (account !== null) {
      poolMasterCalls.push(
        contracts.poolMasterMulticall.getStakedTokensForAddress(account),
        contracts.poolMasterMulticall.getPoolIdForAddress(account)
      );
    }

    try {
      const results = await contracts.multicallProvider.all(poolMasterCalls);

      const phase = parseInt(results[0], 10);
      setPhase(phase);
      const timestampStartEpoch = parseInt(results[1], 10);
      setTimestampStartEpoch(timestampStartEpoch);

      const timerDuration =
        phase === 0 ? parseInt(results[2], 10) : parseInt(results[3], 10);

      initTimer(timestampStartEpoch, timerDuration);

      if (account !== null) {
        setStakedAmountForAddress(fromWei(results[4]));
        setPoolIdForAddress(parseInt(results[5], 10));
      }

      await loadPoolData();
      if (phase === 2) {
        await requestEndEpoch();
      }
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }, [account, contracts.multicallProvider, contracts.poolMasterMulticall]);

  const loadTimerData = async () => {
    if (!contracts.multicallProvider || !contracts.poolMasterMulticall) return;

    try {
      const bettingPhaseDurationCall =
        contracts.poolMasterMulticall.bettingPhaseDuration();
      const battlingPhaseDurationCall =
        contracts.poolMasterMulticall.battlingPhaseDuration();

      const [bettingPhaseDuration, battlingPhaseDuration] =
        await contracts.multicallProvider.all([
          bettingPhaseDurationCall,
          battlingPhaseDurationCall,
        ]);

      const timerDuration =
        phase === 0
          ? parseInt(bettingPhaseDuration, 10)
          : parseInt(battlingPhaseDuration, 10);

      initTimer(timestampStartEpoch, timerDuration);
    } catch (error) {
      console.error("Error fetching timer data with multicall:", error);
    }
  };

  const loadPoolData = async () => {
    const calls = [0, 1, 2].flatMap((id) => [
      contracts.poolMasterMulticall.getSymbol(id),
      contracts.poolMasterMulticall.getStakedTokens(id, false),
      contracts.poolMasterMulticall.getStakedTokens(id, true),
      id < 2
        ? contracts.poolMasterMulticall.getLastWinner(id)
        : Promise.resolve(null),
    ]);
    calls.pop();

    const results = await contracts.multicallProvider.all(calls);

    const poolsTemp = [0, 1, 2].map((id, index) => ({
      token: id < 2 ? results[index * 4] : undefined,
      tokenCount: fromWei(results[index * 4 + 1]),
      usdcCount: ethers.utils.formatUnits(results[index * 4 + 2], 6),
      lastWinner: results[index * 4 + 3],
    }));

    setPools(poolsTemp);
  };

  const requestEndEpoch = async () => {
    console.log("requestEndEpoch");
    Axios.post(API_ENDPOINT).then((response) => {
      // production environment
      const serverResult = response.data;
      console.log(serverResult);

      if (serverResult.msg == "success") loadContractsData();
    });
  };

  useEffect(() => {
    async function initializeWeb3() {
      await setupReadClient();
    }
    initializeWeb3();
  }, []);

  useEffect(() => {
    async function loadInitialContractData() {
      await fetchContractData();
    }
    if (contracts.multicallProvider && contracts.poolMasterMulticall) {
      loadInitialContractData();
    }
  }, [contracts.multicallProvider, contracts.poolMasterMulticall]);

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
        <div className="m-0 p-0 container-fluid">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
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
                    phase={phase}
                    timeleft={timeleft}
                    pools={pools}
                    stakedAmountForAddress={stakedAmountForAddress}
                    poolIdForAddress={poolIdForAddress}
                    requestEndEpoch={requestEndEpoch}
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
          {/* {
            {
              '0': <Home poolMaster={poolMaster} account={account} usdc={usdc} token={token} phase={phase} timeleft={timeleft}
                pools={pools} stakedAmountForAddress={stakedAmountForAddress} poolIdForAddress={poolIdForAddress} 
                requestEndEpoch={requestEndEpoch} />,
              '1': <Leaderboard network={NETWORK} />
            }[menu]
          } */}
        </div>
      </div>
      <MouseFollower />
    </BrowserRouter>
  );
}

export default App;
