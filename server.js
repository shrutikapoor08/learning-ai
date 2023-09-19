import express from "express";
// import testAPI from "./client.js";
import fs from "fs";
import { dirname } from "path";
import path from "path";
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

const __dirname = path.resolve(path.dirname(""));

app.use(express.json({ strict: false }));

app.post("/parse-properties", function (req, res) {
  console.log("in parse properties post", req.body);
  res.json(`Here is what you sent me: ${req.body.post}`);
});

// app.get("/parse-properties", function (req, res) {
//   console.log("in parse properties");
// });

app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
