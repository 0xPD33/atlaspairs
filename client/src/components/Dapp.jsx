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
    <div className="h-full py-8 flex flex-col items-center">
      <div className="pt-16 flex justify-center gap-12">
        {pools.map((pool, index) => (
          <div
            key={index}
            className="lg:min-w-[280px] lg:min-h-[360px] xl:min-w-[360px] xl:min-h-[440px]"
          >
            <PoolCard
              key={index + 1}
              pool={pool}
              poolNumber={index + 1}
              phase={phase}
              clickBet={clickBet}
              stakedAmountForAddress={stakedAmountForAddress}
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
      <div className="p-2 mt-16 rounded-md bg-black/50 w-1/4 flex flex-col items-center">
        <p>Testnet Faucet</p>
        <div className="gap-4 flex py-2">
          <button onClick={claim} className="main-button">
            Claim $ATLAS
          </button>
        </div>
      </div>
      {showPlaceBetPopup && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-[#8a8a8e] text-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">
                  Place a Bet in Vault {chosenPool + 1}
                </h1>
                {chosenPool !== 2 && (
                  <div className="flex justify-center items-center my-2">
                    <label htmlFor="custom-switch" className="mr-2">
                      {chosenUsdc ? "USDC" : "$ATLAS"}
                    </label>
                    {/* <input
                      type="checkbox"
                      id="custom-switch"
                      className="toggle toggle-primary"
                      checked={!chosenUsdc}
                      onChange={toggleTokenSwitch}
                    /> */}
                  </div>
                )}
                <div className="my-4">
                  <label className="block mb-2">Amount:</label>
                  <input
                    type="number"
                    className="w-full p-1 rounded-md text-white"
                    value={chosenAmount}
                    onChange={onChangeChosenAmount}
                  />
                  <input
                    type="range"
                    className="mt-4"
                    step={1}
                    max={1000}
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
                    Place Bet
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
