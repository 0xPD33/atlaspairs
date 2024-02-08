const { ethers } = require("ethers");
const express = require("express");
const { poolMaster } = require("../global");
const { getTokenBySymbol, calculatePerformance } = require("../utils");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const [token1, token2] = await Promise.all([
			poolMaster.getSymbol(0),
			poolMaster.getSymbol(1),
		]);

		const [fetchedToken1, fetchedToken2] = await Promise.all([
			getTokenBySymbol(token1),
			getTokenBySymbol(token2),
		]);

		// Fetch initial prices from the contract
		const [initialPrice1, initialPrice2] = await Promise.all([
			poolMaster.getInitialPrice(0),
			poolMaster.getInitialPrice(1),
		]);

		// Calculate performance
		const performance1 = calculatePerformance(
			parseFloat(fetchedToken1.price),
			parseFloat(initialPrice1),
		);
		const performance2 = calculatePerformance(
			parseFloat(fetchedToken2.price),
			parseFloat(initialPrice2),
		);

		res.json({
			token1: {
				symbol: token1,
				initialPrice: initialPrice1,
				currentPrice: fetchedToken1.price,
				performance: performance1,
			},
			token2: {
				symbol: token2,
				initialPrice: initialPrice2,
				currentPrice: fetchedToken2.price,
				performance: performance2,
			},
		});
	} catch (error) {
		console.error("Error fetching token performance:", error);
		res.status(500).send("Failed to fetch token performance");
	}
});

module.exports = router;
