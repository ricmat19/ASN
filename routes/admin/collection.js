const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get all collection items
router.get("/collection", async (req, res) => {
  try {
    const collection = await db.query(
      "SELECT * FROM collection WHERE primaryImage=true"
    );

    res.status(200).json({
      status: "success",
      results: collection.rows.length,
      data: {
        collection: collection.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all collection items
router.get("/admin/collection/:product", async (req, res) => {
  try {
    const product = await db.query(
      "SELECT * FROM collection WHERE PRODUCT=$1",
      [req.params.product]
    );
    res.status(200).json({
      status: "success",
      results: product.rows.length,
      data: {
        product: product.rows,
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

module.exports = router;
