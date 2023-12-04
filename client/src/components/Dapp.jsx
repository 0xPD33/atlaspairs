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
  requestEndEpoch,
}) => {
  const [showPlaceBetPopup, setShowPlaceBetPopup] = useState(false);
  const [chosenPool, setChosenPool] = useState(0);
  const [chosenAmount, setChosenAmount] = useState(100);
  const [chosenUsdc, setChosenUsdc] = useState(false);

  const onChangeChosenAmount = (e) => {
    setChosenAmount(parseInt(e.target.value, 10));
  };

  const phaseIdToText = () => {
    if (phase == 2) return "Epoch Ended";
    if (phase == 1) return "Battling Phase";
    return "Betting Phase";
  };

  const clickBet = (poolId) => {
    setChosenPool(poolId);
    setShowPlaceBetPopup(true);

    if (poolId == 2) setChosenUsdc(false);
  };

  const toggleTokenSwitch = () => {
    setChosenUsdc(!chosenUsdc);
  };

  const stake = async () => {
    console.log("stake", chosenPool, chosenAmount, chosenUsdc);
    let amount = toWei(chosenAmount);
    let isUsdc = chosenUsdc;

    setShowPlaceBetPopup(false);

    if (chosenUsdc) {
      amount = ethers.utils.parseUnits(chosenAmount.toString(), 6);
      if (parseInt(await usdc.allowance(account, poolMaster.address)) < amount)
        await (await usdc.approve(poolMaster.address, amount)).wait();
    } else {
      if (parseInt(await token.allowance(account, poolMaster.address)) < amount)
        await (await token.approve(poolMaster.address, amount)).wait();
    }

    await poolMaster.stake(chosenPool, amount, isUsdc);
  };

  return (
    <div className="h-screen pt-8">
      <div className="pt-16 flex justify-center gap-10">
        {pools.map((pool, index) => (
          <div
            key={index}
            className="lg:min-w-[280px] lg:min-h-[360px] xl:min-w-[360px] xl:min-h-[440px]"
          >
            <PoolCard
              key={index}
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
      {stakedAmountForAddress > 0 && (
        <div className="mt-8 text-center">
          You bet {stakedAmountForAddress} in vault {poolIdForAddress + 1}
        </div>
      )}
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
      {showPlaceBetPopup && (
        <>
          <div
            className="fixed inset-0 bg-black z-40"
            onClick={() => setShowPlaceBetPopup(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Place a Bet</h1>
              {chosenPool !== 2 && (
                <div className="flex justify-center items-center my-2">
                  <label htmlFor="custom-switch" className="mr-2">
                    {chosenUsdc ? "USDC" : "$ATLAS"}
                  </label>
                  <input
                    type="checkbox"
                    id="custom-switch"
                    className="toggle toggle-primary"
                    checked={!chosenUsdc}
                    onChange={toggleTokenSwitch}
                  />
                </div>
              )}
              <div className="my-3">
                <label className="block mb-2">Amount:</label>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  value={chosenAmount}
                  onChange={onChangeChosenAmount}
                />
                <input
                  type="range"
                  className="range range-primary mt-3"
                  min={5}
                  max={500}
                  step={1}
                  value={chosenAmount}
                  onChange={onChangeChosenAmount}
                />
              </div>
              <div className="flex justify-center space-x-4 my-5">
                <button
                  className="btn btn-warning"
                  onClick={() => setShowPlaceBetPopup(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={stake}>
                  Place Bet
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Dapp;
