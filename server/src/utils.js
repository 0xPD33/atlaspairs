const axios = require("axios");
const {
	CMC_API_KEY,
	multicallProvider,
	poolMasterMulticall,
} = require("./global");

const getTokenBySymbol = async (symbol) => {
	const url =
		"https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
	try {
		const response = await axios.get(url, {
			params: { symbol, convert: "USD" },
			headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
		});
		const data = response.data.data[symbol];
		return { symbol, price: data.quote.USD.price };
	} catch (error) {
		console.error(`Error fetching price for ${symbol}:`, error);
		return;
	}
};

const getPhaseEndTimestamp = async (phase) => {
	try {
		const calls = [
			poolMasterMulticall.timestampStartEpoch(),
			poolMasterMulticall.bettingPhaseDuration(),
			poolMasterMulticall.battlingPhaseDuration(),
		];

		// Execute multicall
		const [timestampStartEpoch, bettingPhaseDuration, battlingPhaseDuration] =
			await multicallProvider.all(calls);

		let endTimestamp;

		if (phase === 0) {
			// Betting phase ends after its own duration
			endTimestamp = Number(timestampStartEpoch) + Number(bettingPhaseDuration);
		} else if (phase === 1) {
			// Battling phase ends after the sum of the durations of both phases
			endTimestamp =
				Number(timestampStartEpoch) +
				Number(bettingPhaseDuration) +
				Number(battlingPhaseDuration);
		} else {
			endTimestamp = 0;
		}

		return endTimestamp;
	} catch (error) {
		console.error("Error fetching phase end timestamp:", error);
		throw error;
	}
};

const calculatePerformance = (currentPrice, initialPrice) =>
	((currentPrice - initialPrice) / initialPrice) * 100;

module.exports = {
	getTokenBySymbol,
	calculatePerformance,
	getPhaseEndTimestamp,
};
