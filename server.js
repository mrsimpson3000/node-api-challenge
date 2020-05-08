const express = require("express");

const projectRouter = require("./projectRouter");

const server = express();

server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

module.exports = server;
