const express = require("express");
const app = express();
const connect = require("./src/configs/db");
// const cors = require("cors");

const userController = require("./src/Controller/user.controller");
app.use(express.json());
// app.use(cors());

app.use("/signup", userController);

const PORT = process.env.PORT || 4000;

module.exports = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
