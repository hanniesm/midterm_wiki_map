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
        list_id: req.body.list_id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
      .then(result => {
        res.redirect("/");
      });
  });

  router.post("/:id/delete", (req, res) => {
    knex("pinpoints")
      .where({ id: req.params.id })
      .del()
      .then(results => {
        res.redirect("/");
      });
  });

  router.post("/listdelete/:list_id", (req, res) => {
    knex("pinpoints")
      .where({ list_id: req.params.list_id })
      .del()
      .then(results => {
        res.redirect("/");
      });
  });

  return router;
};
