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

  router.post("/", (req, res) => {
    knex("pinpoints")
      .insert({
        list_id: 2,
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

  router.post("/delete", (req, res) => {
    knex("pinpoints")
      .where({ id: id })
      .del();
    res.redirect("/");
  });

  router.post("/modify", (req, res) => {
    knex("pinpoints")
      .where({ id: id })
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
