import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Icon } from "@iconify/react";

import holdingPepe from "./assets/holdingPepe.png";
import holdingBallsPepe from "./assets/holdingBallsPepe.png";

const fromWei = (num) => ethers.utils.formatEther(num);
const toWei = (num) => ethers.utils.parseEther(num.toString());

const PoolCard = ({
  pool,
  poolNumber,
  phase,
  clickBet,
  noWinner,
  stakedAmountForAddress,
  stakedShareForAddress,
  poolIdForAddress,
  noUsdc,
  currentPerformance,
}) => {
  return (
    <div className="card-body transition-all duration-150 ease-in-out">
      <div className="relative h-full flex flex-col gap-2">
        <div>
          <p className="card-title">Vault {poolNumber}</p>
          {!noWinner && (
            <div className="token-container mb-4">
              <div className="token-display">
                <p className="">{pool?.token}</p>
              </div>
              {currentPerformance?.token1 && currentPerformance?.token2 && (
                <div className="token-performance mt-0.5">
                  <p>
                    Initial:
                    <span className="ml-1 text-gray-300">
                      {pool?.token === currentPerformance.token1.symbol
                        ? Number(
                            currentPerformance.token1.initialPrice,
                          ).toFixed(4)
                        : Number(
                            currentPerformance.token2.initialPrice,
                          ).toFixed(4)}
                      $
                    </span>
                  </p>
                  <p className="">
                    Current:
                    <span className="ml-1 text-gray-300">
                      {pool?.token === currentPerformance.token1.symbol
                        ? Number(
                            currentPerformance.token1.currentPrice,
                          ).toFixed(4)
                        : Number(
                            currentPerformance.token2.currentPrice,
                          ).toFixed(4)}
                      $
                    </span>
                  </p>
                  <p>
                    Change:
                    <span
                      className={`ml-1 ${
                        pool?.token === currentPerformance.token1.symbol
                          ? Number(currentPerformance.token1.performance) > 0
                            ? "text-green-400"
                            : Number(currentPerformance.token1.performance) < 0
                              ? "text-red-400"
                              : "text-gray-400"
                          : Number(currentPerformance.token2.performance) > 0
                            ? "text-green-400"
                            : Number(currentPerformance.token2.performance) < 0
                              ? "text-red-400"
                              : "text-gray-400"
                      }`}
                    >
                      {pool?.token === currentPerformance.token1.symbol
                        ? Number(currentPerformance.token1.performance).toFixed(
                            2,
                          )
                        : Number(currentPerformance.token2.performance).toFixed(
                            2,
                          )}
                      %
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="token-info mb-4">
            <p>Staked ATLAS: {pool?.tokenCount}</p>
            {!noUsdc && <p>Staked USDC: {pool?.usdcCount}</p>}
          </div>
          {!noWinner &&
          pool?.lastWinner &&
          pool?.lastWinner !== "0x0000000000000000000000000000000000000000" ? (
            <div className="winner-info">
              <p>Last Winner: {pool?.lastWinner}</p>
            </div>
          ) : null}
        </div>
        <div>
          {phase === 0 && Number(stakedAmountForAddress) === 0 && (
            <button
              className="main-button text-lg px-4"
              onClick={() => clickBet(poolNumber - 1)}
            >
              {poolNumber === 3 ? "Stake" : "Bet"}
            </button>
          )}
          {Number(stakedAmountForAddress) > 0 &&
            poolNumber - 1 === poolIdForAddress && (
              <div className="text-center bet-info">
                <p>
                  You {poolNumber === 3 ? "staked" : "bet"}{" "}
                  {stakedAmountForAddress} $ATLAS in Vault{" "}
                  {poolIdForAddress + 1}
                </p>
                <p className="text-sm">
                  Your share is {stakedShareForAddress}%
                </p>
              </div>
            )}
        </div>
        <div>
          {poolNumber === 1 || poolNumber === 3 ? (
            <div className="w-72 absolute -z-10 -bottom-32 left-[50%] translate-x-[-50%]">
              <img
                className={poolNumber === 3 ? "-scale-x-[1]" : ""}
                src={holdingPepe}
                alt=""
              />
            </div>
          ) : (
            <div className="w-56 absolute -z-10 -bottom-32 left-[50%] translate-x-[-50%]">
              <img src={holdingBallsPepe} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
