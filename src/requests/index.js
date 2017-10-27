
function header() {
  return {
    header: {
      'Content-Type': 'application/json'   
    }
  }
}

export default {

  clockin(context, userId, callback) {
    const data = {
      'user_id': userId,
      'type': 'clockin',
      'time': Date.now(),
    }

    context.$http.post('https://my.tanda.co/api/v2/clockins', data, header()).then((res) => {
      callback(res.body);
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': res.body.msg
      });
    });
  },

  clockout(context, userId, callback) {
    const data = {
      'user_id': userId,
      'type': 'clockout',
      'time': Date.now(),
    }

    context.$http.post('https://my.tanda.co/api/v2/clockins', data, header()).then((res) => {
      callback(res.body);
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': res.body.msg
      });
    });
  },

}