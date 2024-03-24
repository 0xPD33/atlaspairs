const axios = require("axios");
const dotenv = require("dotenv");
const { ethers } = require("ethers");
const fs = require("fs");
const { provider, poolMaster } = require("./global");
const global = require("./global.js");
const { getPhaseEndTimestamp } = require("./utils");

dotenv.config();
global.setup();

let phase = 0;
let endTimestamp = 0;

let lastTriggerTime = 0;
const COOLDOWN_PERIOD = 20; // Cooldown period in seconds

async function checkContractState() {
  phase = Number(await poolMaster.getPhase());
  endTimestamp = await getPhaseEndTimestamp(phase);
  await triggerPhaseUpdate();
  const currentTime = Date.now() / 1000;
  if (phase === 2 && currentTime - lastTriggerTime > COOLDOWN_PERIOD) {
    console.log(
      "Poolmaster contract in actionable state. Triggering server endpoint...",
    );
    await triggerServerEndpoint();
    lastTriggerTime = currentTime;
  }
}

// async function startFetchingEvents() {
//   poolMaster.on(winnerDeterminedSignature, (winner, amount, isUsdc, event) => {
//     eventData.winnerEvents.push({
//       address: winner,
//       amount: amount.toNumber(),
//       isUsdc,
//       timestamp: event.blockNumber,
//     });
//   });
//
//   poolMaster.on(loserDeterminedSignature, (loser, amount, isUsdc, event) => {
//     eventData.loserEvents.push({
//       address: loser,
//       amount: amount.toNumber(),
//       isUsdc,
//       timestamp: event.blockNumber,
//     });
//   });
// }

async function startBot() {
  checkContractState();
  // startFetchingEvents();
  setInterval(async () => {
    await checkContractState();
  }, COOLDOWN_PERIOD * 1000);
}

async function triggerPhaseUpdate() {
  try {
    await axios.post("http://127.0.0.1:3333/api/phase", {
      phase: phase.toString(),
      endTimestamp: endTimestamp.toString(),
    });
  } catch (error) {
    console.error("Failed to trigger phase update:", error);
  }
}

async function triggerServerEndpoint() {
  try {
    await axios.post("http://127.0.0.1:3333/api/end_epoch");
  } catch (error) {
    console.error("Failed to trigger server endpoint:", error);
  }
}

module.exports = { startBot };
