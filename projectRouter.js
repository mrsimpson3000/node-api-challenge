const express = require("express");

const router = express.Router();

const Projects = require("./data/helpers/projectModel");
const Actions = require("./data/helpers/actionModel");

// Gets all projects (array)
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({
          error:
            "The projects information could not be returned from the database.",
        });
    });
});

module.exports = router;
