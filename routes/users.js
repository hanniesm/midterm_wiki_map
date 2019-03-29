"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then(results => {
        res.json(results);
      });
  });

  router.get("/:id/lists", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .where({ created_by_id: req.params.id })
      .then(results => {
        res.json(results);
      });
  });

  return router;
};
