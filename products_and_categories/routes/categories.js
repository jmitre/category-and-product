var express = require('express');
var router = express.Router();
var db = require('../config/database');

var categoriesCollection = db.get('categories');

/* GET home page. */
router.get('/', function(req, res, next) {
  categoriesCollection.find({}, function(err, data){
    if(err) throw error
    res.json(data);
  });
});

router.post('/', function(req,res,next){
  categoriesCollection.insert(req.body, function(err, data){
    if(err) throw err;
    res.json(data)
  })
});

module.exports = router;
