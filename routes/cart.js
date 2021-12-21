const express = require("express");
const router = express.Router();
const db = require("../db");

//Add an item to the cart
router.post("/cart", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT cart FROM users WHERE email='ric19mat@gmail.com'"
    );

    let currentCart = cart.rows[0].cart;
    let newItem = req.body.id;

    //Check that new item does not exist in the cart

    let uniqueItem = true;
    if (currentCart !== null) {
      for (let i = 0; i < currentCart.length; i++) {
        console.log("Current Cart " + i + ":" + currentCart[i]);
        console.log("Req.body.id:" + req.body.id);
        if (currentCart[i] === req.body.id) {
          uniqueItem = false;
        }
      }

      console.log("Unique Item: " + uniqueItem);

      if (uniqueItem === true) {
        currentCart.push(newItem);
      }
    } else {
      currentCart = [req.body.id];
    }

    let newCart = await db.query(
      "UPDATE users SET cart=$1 WHERE email='ric19mat@gmail.com'",
      [currentCart]
    );
    // let newCart = await db.query("UPDATE users SET cart=$1 WHERE email=$2", [currentCart, req.session.email]);
    console.log(req.session.email);

    res.status(201).json({
      status: "success",
      results: newCart.rows,
      data: {
        cart: newCart.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all items in a selected cart
router.get("/cart", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT * FROM users WHERE email='ric19mat@gmail.com'"
    );

    const usersCart = [];
    console.log(cart.rows[0].cart);

    if (cart.rows[0].cart !== null) {
      for (let i = 0; i < cart.rows[0].cart.length; i++) {
        const cartCollection = await db.query(
          "SELECT * FROM products WHERE id=$1",
          [cart.rows[0].cart[i]]
        );
        usersCart.push(cartCollection.rows[0]);
      }
    }

    const qty = await db.query(
      "SELECT qty FROM users WHERE email='ric19mat@gmail.com'"
    );
    const cartQty = qty.rows[0].qty;

    res.status(200).json({
      status: "success",
      results: usersCart.length,
      data: {
        cart: usersCart,
        qty: cartQty,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//?
router.put("/cart/quantity", async (req, res) => {
  try {
    await db.query(
      "UPDATE users SET qty=$1 WHERE email='ric19mat@gmail.com' RETURNING *",
      [req.body.cartQty]
    );

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Remove an item from the cart
router.put("/cart/delete", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT cart FROM users WHERE email='ric19mat@gmail.com'"
    );

    const newCart = [];
    for (let i = 0; i < cart.rows[0].cart.length; i++) {
      if (req.body.id !== cart.rows[0].cart[i]) {
        newCart.push(cart.rows[0].cart[i]);
      }
    }

    let qty = [];
    for (let i = 0; i < newCart.length; i++) {
      qty.push(1);
    }

    if (JSON.stringify(newCart) !== JSON.stringify([])) {
      console.log("items");
      await db.query(
        "UPDATE users SET cart=$1, qty=$2 WHERE email='ric19mat@gmail.com' RETURNING *",
        [newCart, qty]
      );
    } else {
      console.log("no items");
      await db.query(
        "UPDATE users SET cart=(NULL), qty=(NULL) WHERE email='ric19mat@gmail.com' RETURNING *"
      );
    }

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a shipment
router.post("/shipment", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT cart FROM users WHERE email='ric19mat@gmail.com'"
    );
    let currentCart = cart.rows[0].cart;
    console.log(currentCart);

    // let newCart = await db.query("UPDATE users SET cart=$1 WHERE email='ric19mat@gmail.com'", [currentCart]);

    const newShipment = await db.query(
      "INSERT INTO shipment (email, firstname, lastname, shipment, address, suite, city, state, zipcode, phone) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        currentCart,
        req.body.address,
        req.body.suite,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.phone,
      ]
    );
    res.status(201).json({
      status: "success",
      results: newShipment.rows.length,
      data: {
        shipment: newShipment.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a shipment ?
router.get("/shipment", async (req, res) => {
  try {
    const shipment = await db.query("SELECT * FROM shipment WHERE id=9");

    // console.log(shipment)

    res.status(200).json({
      status: "success",
      results: shipment.length,
      data: {
        shipment: shipment,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const stripe = require("stripe")(process.env.STRIPESECRET);

//Create a payment
router.post("/payment", async (req, res) => {
  let { amount, id } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "???",
      payment_method: id,
      confirm: true,
    });

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
