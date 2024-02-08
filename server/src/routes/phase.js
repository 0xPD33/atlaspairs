const { ethers } = require("ethers");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { Mutex } = require("async-mutex");

const router = express.Router();

let poolPhase = 0;
let poolEndTimestamp = 0;

router.post("/", async (req, res) => {
	try {
		const { phase, endTimestamp } = req.body;
		poolPhase = phase;
		poolEndTimestamp = endTimestamp;
		res.json({
			phase: poolPhase,
			endTimestamp: poolEndTimestamp,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		res.json({
			phase: poolPhase,
			endTimestamp: poolEndTimestamp,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

module.exports = router;
