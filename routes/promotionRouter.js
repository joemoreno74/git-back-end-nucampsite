const express = require("express");
const promotionsRouter = express.Router();

promotionsRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all promotions to you.");
  })
  .post((req, res) => {
    res.end(
      `Will add the promotions: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotions`);
  })
  .delete((req, res) => {
    res.end("Deleting All Promotions");
  });

promotionsRouter
  .route("/:promotionsId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send you /promotions/${req.params.promotionsId}`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionsId}`
    );
  })
  .put((req, res) => {
    res.statusCode = 200;
    res.end(
      `Updating: /promotions/${req.params.promotionsId}, with Name: ${req.body.name} and Description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting /promotions/${req.params.promotionsId}`);
  });

module.exports = promotionsRouter;
