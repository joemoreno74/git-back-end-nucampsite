const express = require("express");
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();


promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
   Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
   Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

promotionRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})
.put((req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});



// promotionsRouter
//   .route("/")
//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-type", "text/plain");
//     next();
//   })
//   .get((req, res) => {
//     res.end("Will send all promotions to you.");
//   })
//   .post((req, res) => {
//     res.end(
//       `Will add the promotions: ${req.body.name} with description: ${req.body.description}`
//     );
//   })
//   .put((req, res) => {
//     res.statusCode = 403;
//     res.end(`PUT operation not supported on /promotions`);
//   })
//   .delete((req, res) => {
//     res.end("Deleting All Promotions");
//   });

// promotionsRouter
//   .route("/:promotionsId")
//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-type", "text/plain");
//     next();
//   })
//   .get((req, res) => {
//     res.end(`Will send you /promotions/${req.params.promotionsId}`);
//   })
//   .post((req, res) => {
//     res.statusCode = 403;
//     res.end(
//       `POST operation not supported on /promotions/${req.params.promotionsId}`
//     );
//   })
//   .put((req, res) => {
//     res.statusCode = 200;
//     res.end(
//       `Updating: /promotions/${req.params.promotionsId}, with Name: ${req.body.name} and Description: ${req.body.description}`
//     );
//   })
//   .delete((req, res) => {
//     res.end(`Deleting /promotions/${req.params.promotionsId}`);
//   });

module.exports = promotionRouter;
