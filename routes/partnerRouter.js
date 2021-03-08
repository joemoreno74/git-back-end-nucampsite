const express = require("express");
const partnerRouter = express.Router();

partnerRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all partners to you.");
  })
  .post((req, res) => {
    res.end(
      `Will add the partners: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /partners`);
  })
  .delete((req, res) => {
    res.end("Deleting All partners");
  });

partnerRouter
  .route("/:partnersId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send you /partners/${req.params.partnersId}`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnersId}`
    );
  })
  .put((req, res) => {
    res.statusCode = 200;
    res.end(
      `Updating: /partners/${req.params.partnersId}, with Name: ${req.body.name} and Description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting /partners/${req.params.partnersId}`);
  });

module.exports = partnerRouter;
