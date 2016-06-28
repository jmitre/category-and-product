var express = require('express');
var router = express.Router();

var db = require('../config/database');
var productsCollection = db.get('products');

/* GET users listing. */
router.get('/', function(req, res, next) {
  productsCollection.find({}, function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

router.post('/', function(req, res, next){
  productsCollection.insert(req.body, function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

router.put('/:id', function(req, res, next){
  productsCollection.update({_id: (req.params.id - 0)}, req.body, function(err, data) {
    if(err) throw err;
    res.json(data)
  });
})

module.exports = router;
