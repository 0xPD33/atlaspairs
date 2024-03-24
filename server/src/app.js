const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const { startBot } = require("./bot.js");
const global = require("./global.js");

dotenv.config();

const SERVER_IP = process.env.SERVER_IP;
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 'x' amount of requests per `window`
  skip: (req, res) => req.ip === SERVER_IP,
});

const app = express();
app.set("trust proxy", (ip) => {
  if (ip === SERVER_IP || ip === "127.0.0.1") {
    return true;
  }
  return false;
});
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5kb" }));

const endEpochRoutes = require("./routes/end_epoch.js");
const phaseRoutes = require("./routes/phase.js");
const tokenPerformanceRoutes = require("./routes/token_performance.js");
// const leaderboardRoutes = require("./routes/leaderboard.js");

app.use("/api/phase", phaseRoutes);
app.use("/api/end_epoch", endEpochRoutes);
app.use("/api/token_performance", tokenPerformanceRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);

// Start the server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
  startBot();
});
