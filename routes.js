var router = require('express').Router();
var BreweryDB = require('brewerydb-node');
var Config  = require('./config');
var cache = require('./cache/cache.js');

var brewerydb = new BreweryDB(Config.brewerydb_api_key);

router.get('/styles', function(req, res, next) {
    var styles = cache.getStyles();
    if (styles) {
        return res.json(styles);
    }
    brewerydb.style.all(function(err, data, requestObject) {
        if (err) {
            return next(err);
        }
        cache.storeStyles(requestObject);
        res.json(requestObject);
    });
});

router.get('/style/:styleId', function(req, res, next) {
    var beers = cache.getBeers(req.params.styleId, 1);
    if (beers) {
        return res.json(beers);
    }
    brewerydb.beer.find({
        'p': 1,
        'styleId': req.params.styleId,
        'withBreweries': 'Y'
    }, function(err, data, requestObject) {
        if (err) {
            return next(err);
        }
        cache.storeBeers(req.params.styleId, 1, requestObject);
        res.json(requestObject);
    });
});

router.get('/style/:styleId/page/:page', function(req, res, next) {
    var beers = cache.getBeers(req.params.styleId, req.params.page);
    if (beers) {
        return res.json(beers);
    }
    brewerydb.beer.find({
        'p': req.params.page,
        'styleId': req.params.styleId,
        'withBreweries': 'Y'
    }, function(err, data, requestObject) {
        if (err) {
            return next(err);
        }
        cache.storeBeers(req.params.styleId, req.params.page, requestObject);
        res.json(requestObject);
    });
});

module.exports = router;
