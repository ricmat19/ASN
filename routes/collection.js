const express = require("express");
const router = express.Router();
const db = require("../db");

//Get collection
router.get("/collection", async (req, res) => {
  try {
    const collection = await db.query(
      "SELECT * FROM collection"
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

//Add to Collection
router.post("/collection", async (req, ) => {
try {
    await db.query(
    "INSERT INTO collection (user, item) values ($1, $2) RETURNING *",
    [
        req.body.user,
        req.body.item,
    ]
    );
} catch (err) {
    console.log(err);
}
});

//Remove from collection
router.delete("/collection/delete/:id", async (req, res) => {
try {
    await db.query("DELETE FROM collection WHERE user = $1", [
    req.params.user,
    ]);
    res.status(204).json({
    status: "success",
    });
} catch (err) {
    console.log(err);
}
});

module.exports = router;
