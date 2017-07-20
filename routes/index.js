var express = require('express');
var router = express.Router();

var db = require('../db/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Some foods and stuffs ...' });
});

router.get('/api/meals', db.getAllMeals);
router.get('/api/meals/:id', db.getOneMeals);
router.post('/api/meals', db.createMeals);
router.put('/api/meals/:id', db.updateMeals);
router.delete('/api/meals/:id', db.deleteMeals);

module.exports = router;

// "dev":"NODE_ENV=dev nodemon ./bin/www"