var express = require('express');
var router = express.Router();
var signature = require('../weixin/signature');

router.get('/getjssdk', function(req, res, next) {
    var url = req.protocol + '://' + req.host + req.originalUrl;
    signature.sign(url,function (ress) {
        var data = {};
        data.code=1;
        data.data = ress;
        res.send(data)
    })
});
module.exports = router;
