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

let phase = 0;

async function checkContractState(contract) {
  phase = await contract.getPhase();
  await triggerPhaseUpdate();
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
  }, 1 * 10 * 1000); // Check every 10 seconds
}

async function triggerPhaseUpdate() {
  try {
    await axios.post("http://localhost:3333/api/phase", {
      phase: phase.toString(),
    });
  } catch (error) {
    console.error("Failed to trigger phase update:", error);
  }
}

async function triggerServerEndpoint() {
  try {
    await axios.post(API_ENDPOINT);
  } catch (error) {
    console.error("Failed to trigger server endpoint:", error);
  }
}

module.exports = { startBot };
