const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const async = require('async');
const request  = require('request');

let params = {_id:1};
let page = {pageIndex:1,pageSize:10};
router.get('/list', function(req, res, next) {
    const Host = mongoose.model('Host');
    if(req.query.sortid){
        params = {_id:req.query.sortid}
    }else if(req.query.sorthost){
        params = {host:req.query.sorthost}
    }else if(req.query.sortip){
        params = {ip:req.query.sortip}
    }else if(req.query.sorttype){
        params = {type:req.query.sorttype}
    }else if(req.query.sortname){
        params = {name:req.query.sortname}
    }else if(req.query.sortlabel){
        params = {label:req.query.sortlabel}
    }else if(req.query.sorttype1){
        params = {type1:req.query.sorttype1}
    }else if(req.query.sorttype2){
        params = {type2:req.query.sorttype2}
    }else if(req.query.sortcreateTime){
        params = {reateTime:req.query.sortcreateTime}
    }
    let data = {};

    if(req.query.pageIndex){
        data.currPage = parseInt(req.query.pageIndex);
        page['pageIndex'] = (parseInt(req.query.pageIndex)-1)
    }

    if(req.query.pageSize){
        page['pageSize'] = parseInt(req.query.pageSize)
    }

    async.parallel({
        count: (done)=> {
            try {
                Host.count({}).where({status:1}).exec((err,comment)=>{
                    if(err){
                        return next(err)
                    }
                    done(err, comment);
                })
            }catch (e){
                data.code=-1;
                data.data='程序异常';
                res.send(data);

            }
        },
        records: (done)=> {
            try{
                Host.find({}).where({status:1}).sort(params).limit(page.pageSize).skip(page.pageSize*page.pageIndex).exec((err,comment)=>{
                    if(err){
                        return next(err)
                    }
                    done(err, comment);

                })
            }catch (e){
                data.code=-1;
                data.data='程序异常';
                res.send(data);

            }
        }
    },  (err, results)=> {
        if(err){
            return next(err)
        }
        data.code= 1;

        data.total= results.count;
        data.data= results.records;
        res.send(data);
    });





});
router.post('/delete', function(req, res, next) {
    const Host = mongoose.model('Host');
    let data = {};
    if (req.body.id&&(req.body.status===0||req.body.status)) {
        data.code=1;
        let conditions = {_id: req.body.id};
        let updates = {$set: {status: req.body.status,updateTime : new Date().getTime()}};

        Host.update(conditions,updates,function (err,comment) {
            if (err){
                data.code=-1;
                data.data=err;

            }else{
                console.log(comment);
                data.data=comment;
            }
            res.send(data);

        });

    }else{
        data.code=-1;
        data.data="参数错误";
        res.send(data);

    }

});

router.post('/collection', function(req, res, next) {

});

router.post('/save', function(req, res, next) {
    const Host = mongoose.model('Host');
    let data = {};
    if(req.body.id){
        let conditions = {_id: req.body.id};
        let updates = {$set: {
            "type":req.body.type,
            "name":req.body.name,
            "label":req.body.name,
            "host" : req.body.host,
            "type1" : req.body.type1,
            "type2" : req.body.type2,
            "ip" : req.body.ip,
            "updateTime" : new Date().getTime()}
        };
        console.log('http://10.99.4.59:21212/catch/get/save?type='+req.body.type+'&name='+req.body.name+'&label='+req.body.label+'&subclass='+req.body.type1+'&host='+req.body.host+'&cclass='+req.body.type2+'&user='+'admin');

        const url = 'http://10.99.4.59:21212/catch/get/save?type='+req.body.type+'&name='+req.body.name+'&label='+req.body.label+'&subclass='+req.body.type1+'&host='+req.body.host+'&cclass='+req.body.type2+'&user='+'admin';
        try {
            request({url:url,method: 'get',},function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    Host.update(conditions,updates,function (err,comment) {
                        if (err){
                            data.code=-1;
                            data.data=err;

                        }else{
                            data.code=1;
                            data.data=comment;


                        }
                        res.send(data);

                    });
                }
                if(error){
                    data.code=-1;
                    data.data='接口访问失败--'+url;
                    res.send(data);

                }
            })
        }catch (e){
            data.code=-1;
            data.data='接口访问失败--'+url;
            res.send(data);
        }

    }else{
        if(req.body.host&&req.body.type1&&req.body.type2&&req.body.ip){
            const url = 'http://10.99.4.59:21212/catch/get/save?type='+req.body.type+'&name='+req.body.name+'&label='+req.body.label+'&subclass='+req.body.type1+'&host='+req.body.host+'&cclass='+req.body.type2+'&user='+'admin';
            try {
                request({url:url,method: 'get',},function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        try{
                            new Host({
                                "type" : req.body.type,
                                "name" : req.body.name,
                                "label" : req.body.label,
                                "user" : req.body.user,
                                "host" : req.body.host,
                                "type1" : req.body.type1,
                                "type2" : req.body.type2,
                                "ip" : req.body.ip,
                                "createTime" : new Date().getTime(),
                                "updateTime" : new Date().getTime(),
                                "status" : 1
                            }).save((reslast,comment)=>{
                                data.code=1;
                                data.data=comment;

                                res.send(data);

                            });
                        }catch (e){
                            data.code=-1;
                            data.data='参数错误';
                            res.send(data);

                        }
                    }
                    if(error){
                        data.code=-1;
                        data.data='接口访问失败--'+url;
                        res.send(data);

                    }
                })
            }catch (e){
                data.code=-1;
                data.data='接口访问失败--'+url;
                res.send(data);
            }



        }else{
            data.code=-1;
            data.data='参数错误';
            res.send(data);
        }

    }


});


module.exports = router;

