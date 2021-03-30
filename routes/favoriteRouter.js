var express = require('express');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find( { user: req.user._id } )
    .populate('user').populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(favorite) {
        req.body.forEach(campsite => {
          if (!favorite.campsites.includes(campsite._id))  {
            favorite.campsites.push(campsite._id);
        }
        });
        favorite.save()
        .then (favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        })       
        .catch(err => next(err));
        } else{
            Favorite.create({ user: req.user._id, campsites: req.body})
            .then (favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }) 
            .catch(err => next(err));          
        }
})  .catch(err => next(err));  
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if  (favorite) {
            favorite.remove()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);

            })
            .catch(err => next(err));
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);           
        } 
        } )   
    .catch(err => next(err));
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`Get operation not supported on /favorites/${req.params.campsiteId}`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(favorite) {
        req.body.forEach(campsite => {
          if (!favorite.campsites.includes(campsite._id))  {
            favorite.campsites.push(campsite._id);
        } else {
            res.statusCode = 403;
            res.end('That campsite is already in the list of favorites!');           
            }
        });
        favorite.save()
        .then (favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        })       
        .catch(err => next(err));
        } else{
            Favorite.create({ user: req.user._id, campsites: req.body})
            .then (favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }) 
            .catch(err => next(err));          
        }
})  .catch(err => next(err));  
})
   
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`Put operation not supported on /favorites/${req.params.campsiteId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            const index = favorite.campsites.indexOf(req.params.campsiteId)
            if (index>=0) {
                favorite.campsites.splice(index,1)
            }
            favorite.save()
            .then(favorite => {
                Favorite.findById(favorite._id)
                .then(favorite => {
                    console.log('Favorite Campsite Deleted', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })   
        }) .catch(err => next(err));
      }  else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
         } 
    })
    .catch(err => next(err));
})


module.exports = favoriteRouter