const axios = require("axios");
const dotenv = require("dotenv");
const { ethers } = require("ethers");
const fs = require("fs");

dotenv.config();

const PoolMasterAbi = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster.json")
);
const PoolMasterAddress = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster-address.json")
);

const API_ENDPOINT = "http://localhost:3333/api/end_epoch";

async function checkContractState(contract) {
  const phase = await contract.getPhase();
  console.log("Bot fetched Poolmaster phase:", phase.toString());
  if (phase.toString() === "2") {
    console.log(
      "Poolmaster contract in actionable state. Triggering server endpoint..."
    );
    await triggerServerEndpoint();
  }
}

async function startBot() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const contract = new ethers.Contract(
    PoolMasterAddress.address,
    PoolMasterAbi.abi,
    provider
  );

  checkContractState(contract);
  setInterval(async () => {
    await checkContractState(contract);
  }, 1 * 60 * 1000); // Check every minute
}

async function triggerServerEndpoint() {
  try {
    const response = await axios.post(API_ENDPOINT);
    console.log("Server response:", response.data);
  } catch (error) {
    console.error("Failed to trigger server endpoint:", error);
  }
}

module.exports = { startBot };
