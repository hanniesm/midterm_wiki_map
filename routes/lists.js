"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .then(results => {
        res.json(results);
      });
  });

  router.post("/", (req, res) => {
    knex("lists")
      .insert({
        title: req.body.title,
        description: req.body.description,
        created_by_id: "3"
      })
      .then(result => {
        console.log(result);
      });
    res.redirect("/");
  });
  return router;
};
