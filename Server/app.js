const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
const { MONGOURL } = require("./keys");

mongoose.connect(MONGOURL);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Error in connection to database", err);
});

require("./models/User");
require("./models/Products");
app.use(express.json());
app.use(require("./Routes/auth"));
app.use(require("./Routes/products"));
app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
