"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("pinpoints")
      .then(results => {
        res.json(results);
      });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("pinpoints")
      .where({ id: req.params.id })
      .then(results => {
        res.json(results);
      });
  });

  router.post("/", (req, res) => {
    knex("pinpoints")
      .insert({
        list_id: 2, /// THIS IS HARDCODED!
        title: req.body.title,
        description: req.body.title,
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
      .then(result => {
        console.log(result);
      });
    res.redirect("/");
  });

  router.post("/:id/delete", (req, res) => {
    knex("pinpoints")
      .where({ id: req.params.id })
      .del();
    res.redirect("/");
  });

  router.post("/:id/modify", (req, res) => {
    knex("pinpoints")
      .where({ id: req.params.id })
      .update({
        title: req.body.title,
        description: req.body.title,
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        latitude: req.body.latitude,
        longitude: req.body.longitude
      });
  });

  return router;
};
