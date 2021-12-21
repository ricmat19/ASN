const express = require("express");
const router = express.Router();
const db = require("../db");

//Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await db.query(
      "SELECT * FROM events ORDER BY event_date DESC"
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

//Get a specific event
router.get("/events/:id", async (req, res) => {
  try {
    const event = await db.query(`SELECT * FROM events WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
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
