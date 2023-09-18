import express from "express";
// import testAPI from "./client.js";
import fs from "fs";
import { dirname } from "path";
import bodyParser from "body-parser";
import path from "path";
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

const __dirname = path.resolve(path.dirname(""));

app.use(bodyParser.json());
app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/parse-properties", function (req, res) {
  console.log("in parse properties post");
  const newUser = {
    first_name: "shruti",
    last_name: "kapoor",
  };
  response.status(201).json(newUser);
});

// app.get("/parse-properties", function (req, res) {
//   console.log("in parse properties");
// });

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
