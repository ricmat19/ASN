const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all products
router.get("/admin/products/:product", async (req, res) => {
  try {
    const products = await db.query(
      "SELECT * FROM products WHERE product=$1 ORDER BY qty DESC",
      [req.params.product]
    );

    res.status(200).json({
      status: "success",
      results: products.rows.length,
      data: {
        products: products.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a collection item
router.post("/admin/create", upload.single("images"), async (req, res) => {
  try {
    // const result = ""
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    const newItem = await db.query(
      "INSERT INTO collection (title, product, imagekey, qty, price, info) values ($1, $2, $3, $4, $5, $6) RETURNING *",
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
      results: newItem.rows.length,
      data: {
        newItem: newItem.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a collection item
router.delete("/admin/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM collection WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific collection item for update
router.get("/admin/update/:id", async (req, res) => {
  try {
    const item = await db.query(`SELECT * FROM collection WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: item.rows.length,
      data: {
        item: item.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// //Update a collection item
router.put("/admin/update/:id", async (req, res) => {
  try {
    console.log(req.body.primaryImage);
    console.log(req.body.type);
    if (req.body.primaryImage === "on") {
      await db.query(
        "UPDATE collection SET primaryimage=false WHERE product=$1",
        [req.body.type]
      );
    }

    const item = await db.query(
      "UPDATE collection SET title=$1, product=$2, qty=$3, price=$4, info=$5, primaryimage=$6 WHERE id=$7",
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
      results: item.rows.length,
      data: {
        item: item.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
