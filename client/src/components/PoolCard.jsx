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
  noUsdc,
}) => {
  return (
    <div className="card-body transition-all duration-150 ease-in-out">
      {pool !== 0 && pool !== 1 && pool !== 2 ? (
        <div className="relative h-full flex flex-col gap-2">
          <div className="flex-1">
            <p className="card-title">Vault {poolNumber}</p>
            {!noWinner && (
              <div className="token-display">
                <p className="mr-1">{pool?.token}</p>
                <Icon width={24} icon="iconoir:question-mark-circle" />
              </div>
            )}
            <div className="token-info">
              <p>Staked ATLAS: {pool?.tokenCount}</p>
              {!noUsdc && <p>Staked USDC: {pool?.usdcCount}</p>}
            </div>
            {!noWinner &&
            pool?.lastWinner &&
            pool?.lastWinner !==
              "0x0000000000000000000000000000000000000000" ? (
              <div className="winner-info">
                <p>Last Winner: {pool?.lastWinner}</p>
              </div>
            ) : null}
          </div>
          <div>
            {phase === 0 && stakedAmountForAddress === 0 && (
              <button
                className="main-button text-lg px-4"
                onClick={() => clickBet(poolNumber - 1)}
              >
                Bet
              </button>
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
      ) : (
        <span className="text-xl animate-pulse p-8">Loading...</span>
      )}
    </div>
  );
};

export default PoolCard;
