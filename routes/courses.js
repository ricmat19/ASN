const express = require("express");
const router = express.Router();
const db = require("../db");

//Get all collection items of a certain type
router.get("/courses/:subject", async (req, res) => {
  try {
    const subject = await db.query(
      "SELECT * FROM courses WHERE subject=$1 ORDER BY qty DESC",
      [req.params.subject]
    );

    res.status(200).json({
      status: "success",
      results: subject.rows.length,
      data: {
        subject: subject.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific collection item
router.get("/courses/:subject/:course", async (req, res) => {
  try {
    const course = await db.query(`SELECT * FROM courses WHERE id=$1`, [
      req.params.course,
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
