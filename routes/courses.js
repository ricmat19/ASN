const express = require("express");
const router = express.Router();
const db = require("../db");

//Get all courses of a certain subject
router.get("/courses/:subject", async (req, res) => {
  try {
    const subject = await db.query(
      "SELECT * FROM courses WHERE subject=$1",
      [req.params.subject]
    );

    res.status(200).json({
      status: "success",
      results: subject.rows.length,
      data: {
        courses: subject.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific course
router.get("/courses/:subject/:id", async (req, res) => {
  try {
    const course = await db.query(`SELECT * FROM courses WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
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

module.exports = router;
