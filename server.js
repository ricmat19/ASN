const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const adminCoursesR = require("./routes/admin/products");
const adminEventsR = require("./routes/admin/events");
const adminMediasR = require("./routes/admin/medias");
const adminProductsR = require("./routes/admin/products");
const adminProjectsR = require("./routes/admin/projects");
const cartR = require("./routes/cart");
const communityR = require("./routes/community");
const coursesR = require("./routes/courses");
const eventsR = require("./routes/events");
const mediasR = require("./routes/medias");
const productsR = require("./routes/products");
const projectsR = require("./routes/projects");
const usersR = require("./routes/users");

const contactR = require("./routes/contact");

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

app.use(adminCoursesR);
app.use(adminEventsR);
app.use(adminMediasR);
app.use(adminProductsR);
app.use(adminProjectsR);
app.use(cartR);
app.use(communityR);
app.use(coursesR);
app.use(eventsR);
app.use(mediasR);
app.use(productsR);
app.use(projectsR);
app.use(usersR);

app.use(contactR);
