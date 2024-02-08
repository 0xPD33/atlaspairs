const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const { startBot } = require("./bot.js");
const global = require("./global.js");

dotenv.config();
global.setup();

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 1000, // Limit each IP to 'x' amount of requests per `window`
});

const app = express();
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));

const endEpochRoutes = require("./routes/end_epoch.js");
const phaseRoutes = require("./routes/phase.js");
const tokenPerformanceRoutes = require("./routes/token_performance.js");

app.use("/api/phase", phaseRoutes);
app.use("/api/end_epoch", endEpochRoutes);
app.use("/api/token_performance", tokenPerformanceRoutes);

// Start the server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
	startBot();
});
