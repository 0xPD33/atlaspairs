import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { writeContract } from "@wagmi/core";
import { abi as presaleAbi } from "../data/Presale.json";
import { address as presaleAddress } from "../data/Presale-address.json";
import { BaseError, formatUnits, parseEther } from "viem";

const Presale = () => {
  const { isConnected, address: account } = useAccount();
  const [ethAmount, setEthAmount] = useState("0.01");

  const presaleContract = {
    address: presaleAddress,
    abi: presaleAbi,
  };

  const {
    data: presaleData,
    error: errorPresaleData,
    isLoading: isLoadingPresaleData,
  } = useContractReads({
    contracts: [
      // Public Sale Price
      {
        ...presaleContract,
        functionName: "publicSalePrice",
      },
      // Public Sale Cap
      {
        ...presaleContract,
        functionName: "publicSaleCap",
      },
      // Public Sale Start Time
      {
        ...presaleContract,
        functionName: "publicSaleStartTime",
      },
      // Public Sale Token Allocation
      {
        ...presaleContract,
        functionName: "publicSaleTokenAllocation",
      },
      // Public Sale Active
      {
        ...presaleContract,
        functionName: "publicSaleActive",
      },
      // Sale Ended
      {
        ...presaleContract,
        functionName: "saleEnded",
      },
    ],
  });

  const [
    publicSalePrice,
    publicSaleCap,
    publicSaleStartTime,
    publicSaleTokenAllocation,
    publicSaleActive,
    saleEnded,
  ] = presaleData || [];

  const { data: tokensOwed, refetch: refetchTokensOwed } = useContractRead({
    ...presaleContract,
    functionName: "tokensOwed",
    args: [account],
    watch: isConnected,
    enabled: isConnected,
  });

  const { data: isSaleOpenFor, refetch: refetchIsSaleOpenFor } =
    useContractRead({
      ...presaleContract,
      functionName: "isSaleOpenFor",
      args: [account],
      watch: isConnected,
      enabled: isConnected,
    });

  useEffect(() => {
    if (!isLoadingPresaleData) {
      // console.log(presaleData);
    }
  }, [isLoadingPresaleData]);

  useEffect(() => {
    if (isConnected) {
      refetchTokensOwed();
      refetchIsSaleOpenFor();
    }
  }, [isConnected, refetchTokensOwed]);

  const buyTokens = async () => {
    if (!isConnected) {
      console.log("Please connect your wallet");
      return;
    }

    try {
      const { hash } = await writeContract({
        ...presaleContract,
        functionName: "buyTokens",
        value: parseEther(ethAmount, "wei"),
      });
      console.log(hash);
    } catch (error) {
      console.error("Error buying tokens:", error);
    }
  };

  const claimTokens = async () => {
    if (!isConnected) {
      console.log("Please connect your wallet");
      return;
    }

    try {
      const { hash } = await writeContract({
        ...presaleContract,
        functionName: "claimTokens",
      });
      console.log(hash);
    } catch (error) {
      console.error("Error claiming tokens:", error);
    }
  };

  const handleSliderChange = (event) => {
    setEthAmount(event.target.value);
  };

  if (isLoadingPresaleData) return <div>Loading...</div>;

  return (
    <div className="presale-main">
      <h1 className="text-shadow-home">$ATLAS Presale</h1>
      <div className="presale-box mt-8 mb-16">
        {/* <div className="flex items-center justify-center gap-8"> */}
          {/* <div className="flex flex-col items-center">
            <p>Price:</p>
            {publicSalePrice?.result && (
              <p className="text-2xl">
                {publicSalePrice.result.toString()} $ATLAS per ETH
              </p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <p>Cap per address:</p>
            {publicSaleCap?.result && (
              <p className="text-2xl">
                {formatUnits(publicSaleCap?.result.toString(), 18)} ETH
              </p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <p>Token Allocation:</p>
            {publicSaleTokenAllocation?.result && (
              <p className="text-2xl">
                {formatUnits(publicSaleTokenAllocation?.result.toString(), 18)}{" "}
                $ATLAS
              </p>
            )}
          </div> */}
        {/* </div> */}
        <div className="">
          {tokensOwed && (
            <p>
              Your $ATLAS share:
              {formatUnits(tokensOwed?.toString(), 18)}
            </p>
          )}
        </div>
        {publicSaleActive?.result && (
          <div className="flex flex-col items-center my-4">
            <label className="mb-1" htmlFor="ethAmount">
              ETH Amount:
            </label>
            <input
              id="ethAmount"
              type="number"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="rounded-md p-1 text-black bg-white w-full max-w-xs"
              min="0.01"
              max="1"
              step="0.01"
            />
            <input
              type="range"
              min="0.01"
              max="1"
              value={ethAmount}
              step="0.01"
              onChange={handleSliderChange}
              className="mt-4 w-1/4 bg-white"
            />
          </div>
        )}
        <div>
          {isSaleOpenFor && (
            <button
              className="cta-button"
              onClick={buyTokens}
              // disabled={!publicSaleActive?.result || saleEnded?.result}
            >
              Buy Tokens
            </button>
          )}
          {!publicSaleActive?.result && saleEnded?.result && (
            <button
              className="cta-button"
              onClick={claimTokens}
              // disabled={publicSaleActive?.result || !saleEnded?.result}
            >
              Claim Tokens
            </button>
          )}
        </div>
        <div className="mt-4 text-3xl">
          <p>Public sale has ended!</p>
        </div>
        {errorPresaleData && (
          <div className="text-red-500">Error: {errorPresaleData.message}</div>
        )}
      </div>
      <ConnectButton />
    </div>
  );
};

export default Presale;
