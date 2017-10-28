
import local from '../../config/local.js'

function header() {
  return {
    header: {
      'Authorization': 'bearer ' + local.code,   
    }
  }
}

export default {

  oauthTanda(context, callback) {
    var h = header();
    h.header['Cache-Control'] = 'no-cache';
    console.log(h)
    var data = {
      'client_id': local.tanda_id,
      'client_secret': local.tanda_secret,
      'code': local.tanda_code,
      'redirect_uri':`http://${local.host}:8080/oauth`,
      'grant_type':'authorization_code'
    }

    context.$http.post('https://my.tanda.co/api/oauth/token', data, h).then((res) => {
      callback({'action': 'success', 'data': res.body});
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': 'Unable to oauth',
        'data': res
      });
    })
  },

  clockin(context, userId, callback) {
    const data = {
      'user_id': userId,
      'type': 'clockin',
      'time': Date.now(),
    }

    console.log(data, header());
    context.$http.post('https://my.tanda.co/api/v2/clockins', data, header()).then((res) => {
      console.log(res);
      callback({'action': 'success', 'data': res.body});
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': 'Unable to clock in',
        'data': res
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
      callback({'action': 'success', 'data': res.body});
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': 'Unable to clock out',
        'data': res
      });
    });
  },

  getme(context, callback) {
    context.$http.get('https://my.tanda.co/api/v2/users/me', header()).then((res) => {
      callback({'action': 'success', 'data': res.body});
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': 'Unable to get me',
        'data': res
      });
    });
  },

  getStaffInfo(userId, callback){
    context.$http.get('https://my.tanda.co/api/v2/users?show_wages=true', header()).then((res) => {
      callback({'action': 'success', 'data': res.body});      
    }).catch((res) => {
      callback({
        'action': 'fail',
        'msg': 'Unable to get me',
        'data': res
      });
    });
  },

}