const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const adminCollectionRouter = require("./routes/admin/collection");
const adminCreateRouter = require("./routes/admin/create");
const adminUpdateRouter = require("./routes/admin/update");
const collectionRouter = require("./routes/collection");
const contactRouter = require("./routes/contact");
const usersRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/payment");
const shipmentRouter = require("./routes/shipment");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

app.listen(3000, function () {
  console.log("Server Running...");
});

//allows for different domains to communicate
app.use(cors());

app.use(express.urlencoded({ extended: false }));

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

//Middleware: Logging
app.use(morgan("dev"));

app.use(
  cookieSession({
    keys: [process.env.COOKIE_SESSION],
  })
);

app.use(adminCollectionRouter);
app.use(adminCreateRouter);
app.use(adminUpdateRouter);
app.use(collectionRouter);
app.use(contactRouter);
app.use(usersRouter);
app.use(cartRouter);
app.use(paymentRouter);
app.use(shipmentRouter);
