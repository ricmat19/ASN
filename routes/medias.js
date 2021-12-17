const express = require("express");
const router = express.Router();
const db = require("../db");

//Get all collection items of a certain type
router.get("/medias/:media", async (req, res) => {
  try {
    const media = await db.query(
      "SELECT * FROM medias WHERE media=$1 ORDER BY qty DESC",
      [req.params.media]
    );

    res.status(200).json({
      status: "success",
      results: media.rows.length,
      data: {
        medium: media.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific collection item
router.get("/medias/:media/:post", async (req, res) => {
  try {
    const post = await db.query(`SELECT * FROM medias WHERE id=$1`, [
      req.params.post,
    ]);
    res.status(200).json({
      status: "success",
      results: post.rows.length,
      data: {
        post: post.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
