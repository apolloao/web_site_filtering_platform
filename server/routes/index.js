var express = require('express');
var router = express.Router();
var path = require('path');
var glob =require('glob');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const files = glob.sync('dist/*.html');
files.forEach(function(filepath) {
    const split = filepath.split('dist/');
    const name = split[1].replace('.html','');

    router.get('/'+ name, function(req, res, next) {
        res.sendStatus(200)
    });
});

module.exports = router;
