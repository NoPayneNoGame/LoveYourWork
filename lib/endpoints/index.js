
module.exports = function(app) {

  app.post('/webhooks', function (req, res) {
    var data = req.body;

    console.log(data);
  });

  app.post('/oauth', function (req, res) {
    var data = req.body;
    console.log(data);
  })

  app.get('/oauth', function (req, res) {
    var data = req.body;
    var params = req.params;
    console.log(data);
    console.log(params);
  })

}