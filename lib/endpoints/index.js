
module.exports = function(app) {

  app.post('/webhooks', function (req, res) {
    var data = req.body;

    console.log(data);
  });

}