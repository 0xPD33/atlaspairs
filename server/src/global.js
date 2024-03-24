const dotenv = require("dotenv");
dotenv.config();

const { ethers } = require("ethers");
const { MulticallWrapper } = require("ethers-multicall-provider");

const fs = require("fs");

const PoolMasterAbi = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster.json"),
);
const PoolMasterAddress = JSON.parse(
  fs.readFileSync("contractsData/PoolMaster-address.json"),
);

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const multicallProvider = MulticallWrapper.wrap(provider);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const poolMaster = new ethers.Contract(
  PoolMasterAddress.address,
  PoolMasterAbi.abi,
  wallet,
);

const poolMasterMulticall = new ethers.Contract(
  PoolMasterAddress.address,
  PoolMasterAbi.abi,
  multicallProvider,
);

const winnerDeterminedSignature = "WinnerDetermined(address,uint256,bool)";
const loserDeterminedSignature = "LoserDetermined(address,uint256,bool)";

const eventData = {
  winnerEvents: [],
  loserEvents: [],
};

module.exports = {
  provider,
  poolMaster,
  multicallProvider,
  poolMasterMulticall,
  eventData,
  CMC_API_KEY: process.env.CMC_API_KEY,
};
