const express = require("express");
const router = express.Router();
const db = require("../db");

//Get all medias of a type
router.get("/medias/:media", async (req, res) => {
  try {
    const medias = await db.query(
      "SELECT * FROM medias WHERE media=$1",
      [req.params.media]
    );

    res.status(200).json({
      status: "success",
      results: medias.rows.length,
      data: {
        medias: medias.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific media post
router.get("/medias/:media/:id", async (req, res) => {
  try {
    const post = await db.query(`SELECT * FROM medias WHERE id=$1`, [
      req.params.id,
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
