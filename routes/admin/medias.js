const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all medias
router.get("/admin/medias/:media", async (req, res) => {
  try {
    const medias = await db.query(
      "SELECT * FROM medias WHERE media=$1 ORDER BY date DESC",
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

//Create a media
router.post("/admin/medias/create", upload.single("images"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    const media = await db.query(
      "INSERT INTO medias (title, product, imagekey, qty, price, info) values ($1, $2, $3, $4, $5, $6) RETURNING *",
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
      results: media.rows.length,
      data: {
        media: media.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a media
router.delete("/admin/medias/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM medias WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific media to update
router.get("/admin/medias/update/:id", async (req, res) => {
  try {
    const media = await db.query(`SELECT * FROM medias WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: media.rows.length,
      data: {
        media: media.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update a media
router.put("/admin/medias/update/:id", async (req, res) => {
  try {
    if (req.body.primaryImage === "on") {
      await db.query(
        "UPDATE medias SET primaryimage=false WHERE media=$1",
        [req.body.type]
      );
    }

    const media = await db.query(
      "UPDATE medias SET title=$1, product=$2, qty=$3, price=$4, info=$5, primaryimage=$6 WHERE id=$7",
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
      results: media.rows.length,
      data: {
        media: media.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
