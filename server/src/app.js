const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { startBot } = require("./bot.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let endEpochRoutes = require("./routes/end_epoch.js");

app.use("/api/end_epoch", endEpochRoutes);

// Start the server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
  startBot();
});
