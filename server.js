"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const listsRoutes = require("./routes/lists");
const pinpointsRoutes = require("./routes/pinpoints");
const favoritesRoutes = require("./routes/favorites");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/lists", listsRoutes(knex));
app.use("/api/pinpoints", pinpointsRoutes(knex));
app.use("/api/favorites", favoritesRoutes(knex));

const user = {
  id: 3,
  name: "Terry",
  email: "terry@example.com",
  password: "testlogin"
};

// Home page
app.get("/", (req, res) => {
  const templateVars = { username: req.cookies["username"] };
  res.render("index", { templateVars });
});

app.get("/login", (req, res) => {
  res.redirect("/");
});

app.post("/login", (req, res) => {
  const inputMail = req.body.email;
  const username = user.name;

  if (inputMail === user.email) {
    if (req.body.password === user.password) {
      res.cookie("username", username);
      res.redirect("/");
    }
    res.send("User doesn't exist");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
