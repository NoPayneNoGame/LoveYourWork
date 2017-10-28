
import local from '../../config/local.js'

function header() {
  return {
    header: {
      'Content-Type': 'application/json'   
    }
  }
}

export default {

  oauthTanda(context, callback) {
    var header = header().header['Cache-Control'] = 'no-cache';
    var body = {
      'client_id': local.tanda_id,
      'client_secret': local.tanda_secret,
      'code': local.tanda_code,
      'redirect_uri':`http://${local.host}:8080/oauth`,
      'grant_type':'authorization_code'
    }

    context.$http.post('https://my.tanda.co/api/oauth/token', data, header).then((res) => {
      callback(res.body);
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': res.body.msg
      });
    })
  },

  clockin(context, userId, callback) {
    const data = {
      'user_id': userId,
      'type': 'clockin',
      'time': Date.now(),
    }

    context.$http.post('https://my.tanda.co/api/v2/clockins', data, header()).then((res) => {
      console.log(res);
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

  getStaffInfo(userId, callback){
    context.$http.get('https://my.tanda.co/api/v2/users?show_wages=true', header()).then((res) => {
      callback(res.body);
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': res.body.msg
      });
    });
  },

}