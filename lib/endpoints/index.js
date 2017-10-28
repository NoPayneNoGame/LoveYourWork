
module.exports = function(app) {

  app.post('/api/webhooks', function (req, res) {
    var data = req.body;

    console.log(data);
  });

  app.post('/api/oauth', function (req, res) {
    var data = req.body;
    console.log(data);
  })

  app.get('/api/oauth', function (req, res) {
    var data = req.body;
    var params = req.params;
    console.log("Thinking")
    console.log(data);
    console.log(params);
  })

}