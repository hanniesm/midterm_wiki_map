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

  router.post("/new", (req, res) => {
    knex.insert({
      title: req.body.title,
      description: req.body.description,
      created_by_id: req.body.id
    });
    res.redirect("/");
  });
  return router;
};
