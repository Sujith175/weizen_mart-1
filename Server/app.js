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
require("./models/Stock");
require("./models/Checkout");
require("./models/Cart");

app.use(express.json());
app.use(require("./Routes/auth"));
app.use(require("./Routes/products"));
app.use(require("./Routes/stock"));
app.use(require("./Routes/cart"));
app.use(require("./Routes/checkout"));


app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});


