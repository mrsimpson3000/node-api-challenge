const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

module.exports = server;
