const express = require("express");
const router = express.Router();
const db = require("../../db");
const multer = require("multer");
const { uploadFile } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: "images/" });

//Get all events
router.get("/admin/events", async (req, res) => {
  try {
    const events = await db.query(
      "SELECT * FROM events"
    );

    res.status(200).json({
      status: "success",
      results: events.rows.length,
      data: {
        events: events.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create an event
router.post("/admin/event/create", upload.single("images"), async (req, res) => {
  try {
    // const result = ""
    const file = req.file;
    const result = await uploadFile(file);
    res.send({ imagePath: `/images/${result.key}` });
    await unlinkFile(file.path);
    const events = await db.query(
      "INSERT INTO events (title, product, imagekey, qty, price, info) values ($1, $2, $3, $4, $5, $6) RETURNING *",
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
      results: events.rows.length,
      data: {
        events: events.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete an event
router.delete("/admin/events/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM events WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a specific event to update
router.get("/admin/events/update/:id", async (req, res) => {
  try {
    const events = await db.query(`SELECT * FROM events WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: events.rows.length,
      data: {
        events: events.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Update an event
router.put("/admin/events/update/:id", async (req, res) => {
  try {
    if (req.body.primaryImage === "on") {
      await db.query(
        "UPDATE events SET primaryimage=false WHERE event=$1",
        [req.body.id]
      );
    }

    const event = await db.query(
      "UPDATE events SET title=$1, product=$2, qty=$3, price=$4, info=$5, primaryimage=$6 WHERE id=$7",
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
      results: event.rows.length,
      data: {
        event: event.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;