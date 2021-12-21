const express = require("express");
const router = express.Router();
const db = require("../db");

//Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await db.query(
      "SELECT * FROM projects"
    );

    res.status(200).json({
      status: "success",
      results: projects.rows.length,
      data: {
        projects: projects.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific project
router.get("/projects/:project", async (req, res) => {
  try {
    const project = await db.query(`SELECT * FROM projects WHERE id=$1`, [
        req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: project.rows.length,
      data: {
        project: project.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
