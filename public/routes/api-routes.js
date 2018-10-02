// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const database = require('../data/todo.js');



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    res.json(database);
  });
  
  app.post('/add/todo', function(req, res) {

  database.create(req.body)
  .then(
    function(data) {
     
      let response = [data];
      res.json(response);

    }
  )
  .catch(function(err){
    console.log(err);
  })

 
});
  
  app.delete('/delete/todo', function(req, res) {

    database.splice(req.params.index, 1, req.body);
    res.json({ success: true });
  });}
