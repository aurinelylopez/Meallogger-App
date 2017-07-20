let pgp = require('pg-promise')();
let connString = process.env.DATABASE_URL;
let db = pgp(connString);

function getAllMeals(req, res, next) {
  db.any('select * from meals')

//to give back any number all queries and lets you put in select all from tasks
    .then(function(data) {
      console.log('DATA:', data);
      res.status(200)
//gives ok status
        .json({
//gives us json data
          status: 'success',
          data: data,
          message: 'All meals Retrieved '
        });
    })
    .catch(function(err) {
      return next(err);
    });
}


function getOneMeals(req, res, next) {
  let mealID = parseInt(req.params.id);
  db.one('select * from meals where id = $1', mealsID)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'One meal Was Retrieved'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}


function createMeals(req, res, next) {
  req.body.age = parseInt(req.body.age);
  console.log('req.body ===>', req.body)
  db.none('insert into meals(item, note, rating)' +
      'values(${item}, ${note})',
      req.body)
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'One meal Inserted'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateMeals(req, res, next) {
  db.none('update meals set rating=$4 item=$1, notes=$2 where id=$3 ', [req.body.item, parseInt(req.body.minutes), parseInt(req.params.id)
    ])
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'meals Updated'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}


function deleteMeals(req, res, next) {
  let taskID = parseInt(req.params.id);
  db.result('delete from meals where id = $1', taskID)
    .then(function(result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} meals`
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

//CRUD
module.exports = {
  createMeals: createMeals, //CREATE
  getAllMeals: getAllMeals, //READ
  getOneMeals: getOneMeals,   //READ
  updateMeals: updateMeals,   //UPDATE
  deleteMeals: deleteMeals    //DELETE
};