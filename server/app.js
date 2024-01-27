const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(cors());

dotenv.config();

let homeRoutes = require("./routes/home.js");
let endEpochRoutes = require("./routes/end_epoch.js");

app.use("/api/", homeRoutes);
app.use("/api/end_epoch", endEpochRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Running on port " + process.env.PORT);
});
