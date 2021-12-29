const express = require("express");
const router = express.Router();
const db = require("../db");
const axios = require("axios");

//Get all blogs
router.get("/medias/blog", async (req, res) => {
  try {
    const blogs = await db.query(
      "SELECT * FROM blogs");

    res.status(200).json({
      status: "success",
      results: blogs.rows.length,
      data: {
        medias: blogs.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific media post
router.get("/medias/blog/:id", async (req, res) => {
  try {
    const post = await db.query(`SELECT * FROM blogs WHERE id=$1`, [
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









//Get all youtube videos
router.get("/medias/channel", async (req, res) => {
  try {
    const videos = await axios.get("https://www.googleapis.com/youtube/v3/search?key=" + process.env.YOUTUBE_API_KEY + "&q=UCSJPFQdZwrOutnmSFYtbstA")
    res.status(200).json({
      status: "success",
      results: videos.data,
      data: {
        videos: videos.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
