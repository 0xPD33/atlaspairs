const { ethers } = require("ethers");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const { Mutex } = require("async-mutex");

const router = express.Router();

const PoolMasterAbi = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster.json")
);
const PoolMasterAddress = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster-address.json")
);
const tokenList = JSON.parse(fs.readFileSync("tokens.json"));

dotenv.config();

// The release function will be used to signal when a request can be removed from the semaphore
let release;

// Create a Mutex and get a lock
const semaphore = new Mutex();
let isEpochOperationInProgress = false;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Delay is probably only needed for testing on slow testnets

router.post("/", async (req, res) => {
  // Use .acquire() to add a request to the semaphore. This will wait if there are already max allowed requests processing
  console.log("Acquiring semaphore...");
  release = await semaphore.acquire();

  try {
    if (isEpochOperationInProgress) {
      console.log("Epoch operation already in progress");
      res.status(429).json({ error: "Epoch operation already in progress" });
      return;
    }

    isEpochOperationInProgress = true;
    console.log("Starting epoch operation...");

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL, {
      name: "goerli",
      chainId: 5,
    });
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log("wallet address", wallet.address);

    const poolMaster = new ethers.Contract(
      PoolMasterAddress.address,
      PoolMasterAbi.abi,
      wallet
    );
    console.log("poolMaster address", poolMaster.address);

    console.log("Getting current phase...");
    await delay(5000);

    const phase = parseInt(await poolMaster.getPhase());
    console.log("phase", phase);

    await delay(3000);
    const epochEnded = await poolMaster.epochEnded();
    console.log("epochEnded", epochEnded);

    if (phase === 2 && !epochEnded) {
      console.log("Finding out winner...");
      const fetchedToken1 = await getTokenBySymbol(
        await poolMaster.getSymbol(0)
      );
      const fetchedToken2 = await getTokenBySymbol(
        await poolMaster.getSymbol(1)
      );

      console.log(
        "fetchedToken1",
        fetchedToken1,
        "fetchedToken2",
        fetchedToken2
      );

      console.log("Getting initial prices...");
      let initialPrice1 = await poolMaster.getInitialPrice(0);
      let initialPrice2 = await poolMaster.getInitialPrice(1);
      initialPrice1 = parseFloat(initialPrice1);
      initialPrice2 = parseFloat(initialPrice2);
      console.log("initial prices: ", initialPrice1, initialPrice2);

      console.log("Getting current prices...");
      const fetchedPrice1 = parseFloat(fetchedToken1.price);
      const fetchedPrice2 = parseFloat(fetchedToken2.price);
      console.log("current prices: ", fetchedPrice1, fetchedPrice2);

      const performance1 =
        ((fetchedPrice1 - initialPrice1) / initialPrice1) * 100;
      const performance2 =
        ((fetchedPrice2 - initialPrice2) / initialPrice2) * 100;

      console.log("performance1", performance1);
      console.log("performance2", performance2);

      const winnerId = performance1 > performance2 ? 0 : 1;

      console.log("winnerId", winnerId);

      console.log("Ending epoch...");
      try {
        let transaction = await poolMaster.endEpoch(winnerId);
        let receipt = await provider.waitForTransaction(transaction.hash);
        console.log("Transaction has been mined:");
        console.log(receipt);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
        isEpochOperationInProgress = false;
        release();
        return;
      }
    } else if (epochEnded) {
      console.log("Starting new epoch...");
      let randomIndex1 = getRandom32Int() % tokenList.length;
      let randomIndex2 = getRandom32Int() % tokenList.length;
      let nextToken1Symbol = tokenList[randomIndex1].symbol;
      let nextToken2Symbol = tokenList[randomIndex2].symbol;
      let token1 = await getTokenBySymbol(nextToken1Symbol);
      let token2 = await getTokenBySymbol(nextToken2Symbol);
      console.log("nextToken1Symbol", nextToken1Symbol);
      console.log("nextToken2Symbol", nextToken2Symbol);
      console.log("token1.price:", token1.price);
      console.log("token2.price:", token2.price);

      try {
        await poolMaster.startEpoch(
          nextToken1Symbol,
          String(token1.price),
          nextToken2Symbol,
          String(token2.price)
        );
        console.log("start epoch success");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
        isEpochOperationInProgress = false;
        release();
        return;
      }
    } else {
      console.log("No epoch action required");
      res.status(200).json({ msg: "No epoch action required" });
      isEpochOperationInProgress = false;
      release();
      return;
    }

    res.status(200).json({ msg: "Epoch operation completed" });
    isEpochOperationInProgress = false;
    release();
    return;
  } catch (error) {
    console.error("Error during epoch operation:", error);
    res.status(500).json({ error: "Server error during epoch operation" });
  } finally {
    isEpochOperationInProgress = false;
    release();
  }
});

const getTokenBySymbol = async (symbol) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
      {
        params: {
          symbol: symbol,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }
    );

    const token = response.data.data[symbol];
    return {
      name: token.name,
      symbol: token.symbol,
      price: token.quote.USD.price,
    };
  } catch (error) {
    console.log("CMC Api ERROR:");
    console.error(error);
    console.log("End CMC Api ERROR");
  }
};

const getTop100Tokens = async () => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit: 100,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }
    );

    const tokens = response.data.data.map((token) => {
      return {
        name: token.name,
        symbol: token.symbol,
        price: token.quote.USD.price,
        address: token.platform ? token.platform.token_address : null,
      };
    });

    return tokens;
  } catch (error) {
    console.error(error);
  }
};

const getRandom32Int = () => {
  var temp = "0b";
  for (let i = 0; i < 32; i++) temp += Math.round(Math.random());

  const randomNum = BigInt(temp);
  return randomNum.toString();
};

module.exports = router;
