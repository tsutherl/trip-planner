var express = require('express');
var router = express.Router();
var models = require('../models');
var Promise = require('bluebird'); //need this for .spread!

var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

module.exports = router;

router.get('/', function (req, res, next) {
    var promHot = Hotel.findAll({});
    var promRest = Restaurant.findAll({});
    var promAct = Activity.findAll({});
    Promise.all([promHot, promRest, promAct])
    .spread(function(hotels, restaurants, activities){
        res.render('index', {hotels: hotels, restaurants: restaurants, activities: activities});
    });
})

