const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all courses
router.get("/admin/courses/:course", async (req, res) => {
  try {
    const course = await db.query(
      "SELECT * FROM courses WHERE course=$1 ORDER BY date DESC",
      [req.params.course]
    );

    res.status(200).json({
      status: "success",
      results: course.rows.length,
      data: {
        course: course.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a course
router.post("/admin/course/create", upload.single("images"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    const course = await db.query(
      "INSERT INTO courses (title, product, imagekey, qty, price, info) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.body.title,
        req.body.product,
        result.key,
        req.body.quantity,
        req.body.price,
        req.body.info,
      ]
    );
    res.status(201).json({
      status: "success",
      results: course.rows.length,
      data: {
        course: course.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a course
router.delete("/admin/courses/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM courses WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific course
router.get("/admin/courses/update/:id", async (req, res) => {
  try {
    const course = await db.query(`SELECT * FROM courses WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: course.rows.length,
      data: {
        item: course.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update a course
router.put("/admin/courses/update/:id", async (req, res) => {
  try {
    if (req.body.primaryImage === "on") {
      await db.query(
        "UPDATE courses SET primaryimage=false WHERE course=$1",
        [req.body.course]
      );
    }

    const course = await db.query(
      "UPDATE courses SET title=$1, product=$2, qty=$3, price=$4, info=$5, primaryimage=$6 WHERE id=$7",
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
      results: course.rows.length,
      data: {
        item: course.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
