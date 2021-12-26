const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all projects
router.get("/admin/projects", async (req, res) => {
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
router.get("/admin/projects/:id", async (req, res) => {
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

//Create a project
router.post("/admin/project/create", upload.single("images"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    await db.query(
      "INSERT INTO projects (title, imagekey, info) values ($1, $2, $3) RETURNING *",
      [
        req.body.title,
        result.key,
        req.body.info,
      ]
    );
  } catch (err) {
    console.log(err);
  }
});

//Update a project
router.put("/admin/projects/update/:id", async (req, res) => {
  try {
    if (req.body.primaryImage === "on") {
      await db.query(
        "UPDATE projects SET primaryimage=false WHERE project=$1",
        [req.body.type]
      );
    }

    const project = await db.query(
      "UPDATE projects SET title=$1, product=$2, qty=$3, price=$4, info=$5, primaryimage=$6 WHERE id=$7",
      [
        req.body.title,
        req.body.type,
        req.body.quantity,
        req.body.price,
        req.body.info,
        req.body.primaryImage,
        req.params.id,
      ]
    );
    res.status(201).json({
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

//Delete a project
router.delete("/admin/projects/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM projects WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
