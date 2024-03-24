const dotenv = require("dotenv");
dotenv.config();

const { ethers } = require("ethers");
const {
  Contract: MulticallContract,
  Provider: MulticallProvider,
} = require("ethers-multicall");

const fs = require("fs");

const PoolMasterAbi = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster.json"),
);
const PoolMasterAddress = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster-address.json"),
);

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const multicallProvider = new MulticallProvider(provider);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const poolMaster = new ethers.Contract(
  PoolMasterAddress.address,
  PoolMasterAbi.abi,
  wallet,
);

const poolMasterMulticall = new MulticallContract(
  PoolMasterAddress.address,
  PoolMasterAbi.abi,
);

const winnerDeterminedSignature = "WinnerDetermined(address,uint256,bool)";
const loserDeterminedSignature = "LoserDetermined(address,uint256,bool)";

const eventData = {
  winnerEvents: [],
  loserEvents: [],
};

async function setup() {
  await multicallProvider.init();
}

module.exports = {
  provider,
  poolMaster,
  multicallProvider,
  poolMasterMulticall,
  eventData,
  setup,
  CMC_API_KEY: process.env.CMC_API_KEY,
};
