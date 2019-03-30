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

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .where({ id: req.params.id })
      .then(results => {
        res.json(results);
      });
  });

  router.get("/:id/pinpoints", (req, res) => {
    const myID = parseInt(req.params.id);
    knex
      .select("*")
      .from("pinpoints")
      .where({ list_id: myID })
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
      .then(results => {
        res.redirect("/");
      });
  });

  router.post("/:id/modify/", (req, res) => {
    knex("lists")
      .where({ id: req.params.id })
      .update({ title: req.body.title, description: req.body.description })
      .then(results => {
        res.redirect("/");
      });
  });

  router.post("/:id/delete", (req, res) => {
    knex("lists")
      .where({ id: req.params.id })
      .del()
      .then(results => {
        res.redirect("/");
      });
  });

  return router;
};
