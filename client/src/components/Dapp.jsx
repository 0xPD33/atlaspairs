import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getTimeLeftString } from "./TimeOperation";

import PoolCard from "./PoolCard";

const fromWei = (num) => ethers.utils.formatEther(num);
const toWei = (num) => ethers.utils.parseEther(num.toString());

const Dapp = ({
  poolMaster,
  account,
  usdc,
  token,
  phase,
  timeleft,
  pools,
  stakedAmountForAddress,
  poolIdForAddress,
}) => {
  const [showPlaceBetPopup, setShowPlaceBetPopup] = useState(false);
  const [chosenPool, setChosenPool] = useState(0);
  const [chosenAmount, setChosenAmount] = useState(100);
  const [chosenUsdc, setChosenUsdc] = useState(false);

  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [userUsdcBalance, setUserUsdcBalance] = useState(0);
  const [stakedShareForAddress, setStakedShareForAddress] = useState(0);

  const onChangeChosenAmount = (e) => {
    setChosenAmount(parseInt(e.target.value, 10));
  };

  const phaseIdToText = () => {
    if (phase === 2) return "Epoch Ended";
    if (phase === 1) return "Battling Phase";
    return "Betting Phase";
  };

  const clickBet = (poolId) => {
    setChosenPool(poolId);
    setShowPlaceBetPopup(true);

    if (poolId === 2) setChosenUsdc(false);
  };

  const toggleTokenSwitch = () => {
    setChosenUsdc(!chosenUsdc);
  };

  const checkBalance = async () => {
    if (!account || !token || !usdc) return;

    const tokenToCheck = chosenUsdc ? usdc : token;
    const balance = await tokenToCheck.balanceOf(account);
    setUserTokenBalance(ethers.utils.formatUnits(balance, 18));
  };

  const calculateShare = async () => {
    if (!account || !stakedAmountForAddress) return;
    if (poolIdForAddress === undefined || !pools[Number(poolIdForAddress)])
      return;

    const poolTokenCount = pools[Number(poolIdForAddress)].tokenCount;

    if (!poolTokenCount || poolTokenCount === 0) {
      setStakedShareForAddress(0);
      return;
    }

    const pool = pools[Number(poolIdForAddress)];
    if (!pool || pool.tokenCount === 0) {
      console.warn("Invalid pool data or token count is zero.");
      setStakedShareForAddress(0);
      return;
    }

    const stakedInPoolPercentage =
      (stakedAmountForAddress / pool.tokenCount) * 100;

    if (!isNaN(stakedInPoolPercentage)) {
      setStakedShareForAddress(Number(stakedInPoolPercentage.toFixed(2)));
    } else {
      setStakedShareForAddress(0);
    }
  };

  useEffect(() => {
    calculateShare();
  }, [account, stakedAmountForAddress, pools, poolIdForAddress]);

  useEffect(() => {
    checkBalance();
  }, [account, token, usdc]);

  const stake = async () => {
    const amount = chosenUsdc
      ? ethers.utils.parseUnits(chosenAmount.toString(), 6)
      : toWei(chosenAmount);
    const tokenToApprove = chosenUsdc ? usdc : token;

    setShowPlaceBetPopup(false);

    if (
      parseInt(await tokenToApprove.allowance(account, poolMaster.address)) <
      amount
    )
      await (await tokenToApprove.approve(poolMaster.address, amount)).wait();

    await poolMaster.stake(chosenPool, amount, chosenUsdc);
  };

  const claim = async () => {
    await (await token.mint()).wait();
  };

  return (
    <div className="h-full py-8 px-4 lg:px-0 flex flex-col items-center">
      <div className="pt-0 lg:pt-16 flex flex-col lg:flex-row justify-center gap-24 lg:gap-12">
        {pools.map((pool, index) => (
          <div
            key={index}
            className="min-w-full min-h-full lg:min-w-[280px] lg:min-h-[360px] xl:min-w-[360px] xl:min-h-[440px]"
          >
            <PoolCard
              key={index + 1}
              pool={pool}
              poolNumber={index + 1}
              phase={phase}
              clickBet={clickBet}
              stakedAmountForAddress={stakedAmountForAddress}
              stakedShareForAddress={stakedShareForAddress}
              poolIdForAddress={poolIdForAddress}
              noWinner={index === 2}
              noUsdc={index === 2}
            />
          </div>
        ))}
      </div>
      {pools != null && pools.length > 0 && (
        <div className="text-shadow mt-32 text-center">
          <p className="text-2xl">
            Current phase:{" "}
            <span className="animate-pulse">{phaseIdToText()}</span>
          </p>
          <p className="mt-2">
            {phase !== 2
              ? getTimeLeftString(timeleft)
              : "Transitioning to the next epoch. This may take a few minutes..."}
          </p>
        </div>
      )}
      {/* <div className="p-2 mt-8 lg:mt-16 rounded-md bg-black/50 w-full lg:w-1/4 flex flex-col items-center">
        <p>Testnet Faucet</p>
        <div className="gap-4 flex py-2">
          <button onClick={claim} className="main-button">
            Claim $ATLAS
          </button>
        </div>
      </div> */}
      {showPlaceBetPopup && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-[#8a8a8e] text-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">
                  {chosenPool === 2
                    ? "Stake $ATLAS"
                    : `Place a Bet in Vault ${chosenPool + 1}`}
                </h1>
                {chosenPool !== 2 && (
                  <div className="flex flex-col items-center">
                    <p>Chose asset:</p>
                    <div className="flex justify-center items-center my-2 gap-4">
                      <button
                        className={`main-button ${
                          !chosenUsdc ? "bg-[#2d7fb3]" : ""
                        }`}
                        disabled={!chosenUsdc}
                        onClick={() => setChosenUsdc(false)}
                      >
                        ATLAS
                      </button>
                      <button
                        className={`main-button ${
                          chosenUsdc ? "bg-[#2d7fb3]" : ""
                        }`}
                        disabled={chosenUsdc}
                        onClick={() => setChosenUsdc(true)}
                      >
                        USDC
                      </button>
                    </div>
                  </div>
                )}
                <div className="my-4">
                  <label className="block mb-2">Amount:</label>
                  <input
                    type="number"
                    className="w-full p-1 rounded-md text-white bg-[#6d6d70]"
                    value={chosenAmount}
                    max={userTokenBalance}
                    onChange={onChangeChosenAmount}
                  />
                  <input
                    type="range"
                    className="mt-4"
                    step={1}
                    max={userTokenBalance}
                    value={chosenAmount}
                    onChange={onChangeChosenAmount}
                  />
                </div>
                <div className="flex justify-center space-x-4 my-5">
                  <button
                    className="main-button"
                    onClick={() => setShowPlaceBetPopup(false)}
                  >
                    Cancel
                  </button>
                  <button className="main-button" onClick={stake}>
                    {chosenPool === 2 ? "Stake" : "Place Bet"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Dapp;
