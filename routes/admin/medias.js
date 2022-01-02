const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all blogs
router.get("/admin/medias/blog", async (req, res) => {
  try {
    const blogs = await db.query("SELECT * FROM blogs");

    res.status(200).json({
      status: "success",
      results: blogs.rows.length,
      data: {
        blogs: blogs.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific blog
router.get("/admin/medias/blog/:id", async (req, res) => {
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

//Create a blog post
router.post("/admin/media/blog/create", upload.single("images"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    await db.query(
      "INSERT INTO blogs (title, content, imagekey) values ($1, $2, $3) RETURNING *",
      [
        req.body.title,
        req.body.content,
        result.key,
      ]
    );
  } catch (err) {
    console.log(err);
  }
});

//Update a blog
router.put("/admin/medias/blog/update/:id", async (req, res) => {
  try {

    const blog = await db.query(
      "UPDATE blogs SET title=$1, content=$2 WHERE id=$3",
      [
        req.body.title,
        req.body.content,
        req.params.id,
      ]
    );
    res.status(201).json({
      status: "success",
      results: blog.rows.length,
      data: {
        blog: blog.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a blog
router.delete("/admin/medias/blog/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM blogs WHERE id = $1", [
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
