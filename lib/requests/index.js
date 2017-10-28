var http = require('https')


function Requests() {
    'use strict';
}

Requests.prototype.get = function (options, headers, callback) {
  var _options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer f8c9ee7517d671282e1e6ed2ba230cb5de93f0e747c3f50c3187ec6780cfe99f' ,         
    }
  }

  options = Object.assign(_options, options);

  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var data = chunk;
      try {
        data = JSON.parse(data);
      } catch (e) {}
      
      callback({
        'action': 'success',
        'msg': 'Successfully GETed',
        'data': data
      })

    })
  });

  req.on('error', (e) => {
    callback({
      'action': 'fail',
      'msg': `problem with request: ${e.message}`,
    });
    return
  });

  req.end();
}

module.exports = Requests;