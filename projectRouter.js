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
      res.status(500).json({
        error:
          "The projects information could not be returned from the database.",
      });
    });
});

// Get project by id
router.get("/:id", validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      let info = {
        id: project.id,
        name: project.name,
        description: project.description,
        completed: project.completed,
      };
      res.status(200).json(info);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error:
          "The project information could not be returned from the database.",
      });
    });
});

// Get project by id and return project and all actions associated with project
router.get("/:id/actions", validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({
          error:
            "The actions for the requested project could not be returned from the database.",
        });
    });
});

// Delete project

// Custom Middleware
// Validate project id
function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      req.project = project;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Invalid project id." });
    });
}

module.exports = router;
