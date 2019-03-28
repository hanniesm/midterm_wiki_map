"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("favorites")
      .then(results => {
        res.json(results);
      });
  });

  router.post("/", (req, res) => {
    knex("favorites")
      .insert({
        list_id: "1"
        user_id: "3"
      })
      .then(result => {
        console.log(result);
      });
    res.redirect("/");
  });
  return router;
};
