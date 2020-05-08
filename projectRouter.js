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
      res.status(500).json({
        error:
          "The actions for the requested project could not be returned from the database.",
      });
    });
});

// Delete project and returns a message
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then((qty) => {
      res.status(200).json({
        message: `Deleted ${qty} record with the id of ${req.params.id}`,
      });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The specified project could not be deleted." });
    });
});

// Posts new project to db and returns newly created project
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({
          error:
            "There was an error while trying to save the project to the database.",
        });
    });
});

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

// Validate body of project is present and that the body has a name and description
function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({ error: "Missing project data." });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ error: "You must provide a name and description." });
  } else {
    next();
  }
}

module.exports = router;
