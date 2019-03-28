"use strict";

const express = require("express");
const router = express.Router();
const list_id = 2;

module.exports = knex => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("pinpoints")
      .where({ list_id })
      .then(results => {
        res.json(results);
      });
  });

  return router;
};
