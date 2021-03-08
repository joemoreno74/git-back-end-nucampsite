const express = require("express");
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all campsites to you.");
  })
  .post((req, res) => {
    res.end(
      `Will add the campsites: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites`);
  })
  .delete((req, res) => {
    res.end("Deleting All Campsites");
  });

campsiteRouter
  .route("/:campsiteId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send you /campsites/${req.params.campsiteId}`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}`
    );
  })
  .put((req, res) => {
    res.statusCode = 200;
    res.end(
      `Updating: /campsites/${req.params.campsiteId}, with Name: ${req.body.name} and Description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting /campsites/${req.params.campsiteId}`);
  });

module.exports = campsiteRouter;
