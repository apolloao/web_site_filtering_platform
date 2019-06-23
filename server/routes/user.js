const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');


router.all('/create', function(req, res, next) {
    const User = mongoose.model('User');
    let data = {};
    if(req.body.account&&req.body.password){
        try{
            User.find({account:req.body.account},function (err,comment) {
                let data = {};
                if(err){
                    data.code=-1;
                    data.data=err;
                    res.send(data);

                }else{
                    if(comment.length){
                        data.code=-1;
                        data.data='用户名已存在';
                        res.send(data);

                    }else {
                        try{
                            new User({
                                "account" : req.body.account,
                                "password" : req.body.password
                            }).save((reslast,comment)=>{
                                if(comment){
                                    data.code=1;
                                    data.data=comment;
                                    res.send(data)
                                }else{
                                    data.code=-1;
                                    data.data='程序异常';
                                    res.send(data)
                                }

                            });
                        }catch (e){
                            data.code=-1;
                            data.data='参数错误';
                            res.send(data);

                        }

                    }
                }

            });
        }catch (e){
            data.code=-1;
            data.data='参数错误';
            res.send(data);

        }

    }else{
        data.code=-1;
        data.data='参数错误';
        res.send(data);
    }

});
router.post('/getinfo', function(req, res, next) {
    const User = mongoose.model('User');
    let data = {};
    if(req.body.account&&req.body.password){
        try{
            User.find({account:req.body.account,password:req.body.password},function (err,comment) {
                console.log(comment)
                let data = {};
                if(err){
                    data.code=-1;
                    data.data=err;

                }else{
                    if(comment&&comment.length){
                        data.code=1;
                        data.data=comment;
                    }else{
                        data.code=-1;
                        data.data='用户名或者密码错误';
                    }

                }
                res.send(data);

            });
        }catch (e){
            data.code=-1;
            data.data='参数错误';
            res.send(data);

        }


    }else{
        data.code=-1;
        data.data='参数错误';
        res.send(data);
    }

});


module.exports = router;

