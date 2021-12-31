const express = require("express");
const router = express.Router();
const db = require("../db");

//Get all notifications
router.get("/notifications", async (req, res) => {
  try {
    const notifications = await db.query(`SELECT * FROM notifications`);

    res.status(200).json({
      status: "success",
      results: notifications.rows.length,
      data: {
        notifications: notifications.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all of a notification type
router.get("/notifications/:type", async (req, res) => {
  try {
    const notifications = await db.query(
      `SELECT * FROM notifications WHERE=$1`,
      [req.params.type]
    );

    res.status(200).json({
      status: "success",
      results: notifications.rows.length,
      data: {
        notifications: notifications.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
