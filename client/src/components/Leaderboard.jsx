import { useState, useEffect } from "react";
import { ethers } from "ethers";

import PoolMasterAbi from "../data/PoolMaster.json";
import PoolMasterAddress from "../data/PoolMaster-address.json";

const fromWei = (num) => Math.ceil(ethers.utils.formatEther(num));
const toWei = (num) => ethers.utils.parseEther(num.toString());

const Leaderboard = ({ network }) => {
  return (
    <>
      <div className="mt-8 text-2xl">Coming soon!</div>
    </>
  );

  const [poolMaster, setPoolMaster] = useState(null);
  const [elements, setElements] = useState([]);

  const loadLeaderboard = async (poolMaster) => {
    console.log("loadLeaderboard");

    let timeRandInSeconds = 60 * 60 * 24 * 7; // 1 week

    let winnerAddressAmountsForLastSeconds =
      await poolMaster.getWinnerAddressAmountsForLastSeconds(timeRandInSeconds);
    console.log(
      "winnerAddressAmountsForLastSeconds",
      winnerAddressAmountsForLastSeconds
    );
    let winnerAddressStakerAddressForLastSeconds =
      await poolMaster.getWinnerAddressStakerAddressForLastSeconds(
        timeRandInSeconds
      );
    console.log(
      "winnerAddressStakerAddressForLastSeconds",
      winnerAddressStakerAddressForLastSeconds
    );
    let winnerAddressIsUsdcForLastSeconds =
      await poolMaster.getWinnerAddressIsUsdcForLastSeconds(timeRandInSeconds);
    console.log(
      "winnerAddressIsUsdcForLastSeconds",
      winnerAddressIsUsdcForLastSeconds
    );

    let arrayLength = winnerAddressAmountsForLastSeconds.length;
    let elementsTemp = [];
    for (let i = 0; i < arrayLength; i++) {
      elementsTemp.push({
        address: winnerAddressStakerAddressForLastSeconds[i],
        amount: winnerAddressIsUsdcForLastSeconds[i]
          ? fromWei(winnerAddressAmountsForLastSeconds[i])
          : ethers.utils.formatUnits(winnerAddressAmountsForLastSeconds[i], 6),
        isUsdc: winnerAddressIsUsdcForLastSeconds[i],
      });
    }

    setElements(elementsTemp);
  };

  const loadContracts = async () => {
    console.log("loadContracts");
    const providerTemp = new ethers.providers.InfuraProvider(
      network,
      process.env.REACT_APP_INFURA_PROJECT_ID
    );

    const poolMasterTemp = new ethers.Contract(
      PoolMasterAddress.address,
      PoolMasterAbi.abi,
      providerTemp
    );
    setPoolMaster(poolMasterTemp);
    loadLeaderboard(poolMasterTemp);
  };

  useEffect(() => {
    // It's not recommended to use async directly in useEffect. Instead, define a function inside.
    const init = async () => {
      await loadContracts();
    };
    init();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Leaderboard</h1>
      <div className="mb-5">Showing results of the last 7 days</div>
      <div className="flex flex-col mt-5">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Gains
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {elements.length > 0 ? (
                    elements.map((val, i) => (
                      <tr
                        key={i}
                        className="bg-gray-800 border-b border-gray-700 text-white"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-sm whitespace-nowrap"
                        >
                          {val.address}
                        </th>
                        <td className="text-sm px-6 py-4">
                          {val.amount} {val.isUsdc ? "USDC" : "$ATLAS"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-white">
                      <td colSpan="2" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
