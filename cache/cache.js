var fs = require('fs');
var path = require('path');

var cacheDir = __dirname;

function getStyles() {
    var file = path.join(cacheDir, 'styles.json');
    try {
        return require(file);
    } catch (e) {
    }
    return null;
}

function getBeers(styleId, page) {
    var file = path.join(cacheDir, createBeerFileName(styleId, page));
    try {
        return require(file);
    } catch (e) {
    }
    return null;
}

function storeStyles(obj) {
    var file = path.join(cacheDir, 'styles.json');
    var styles = {
        data: obj.data
    };
    fs.writeFileSync(file, JSON.stringify(styles), 'utf8');
}

function storeBeers(styleId, page, obj) {
    var file = path.join(cacheDir, createBeerFileName(styleId, page));
    var beers = {
        page: obj.page,
        numPages: obj.numPages,
        data: obj.data
    };
    fs.writeFileSync(file, JSON.stringify(beers), 'utf8');
}

function createBeerFileName(styleId, page) {
    return 'style' + styleId + '_page' + page + '.json';
}

module.exports = {
    getStyles: getStyles,
    getBeers: getBeers,
    storeStyles: storeStyles,
    storeBeers: storeBeers
};
