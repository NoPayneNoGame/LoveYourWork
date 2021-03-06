'use strict'
require('./check-versions')()
const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const local = require('../config/local.js')

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = `http://${local.host}:${port}`

var bodyParser = require('body-parser');
app.use(bodyParser.json())

const api = express.Router()

app.use('/api', api);
require('../lib/endpoints/index.js')(app)


var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = `http://${local.host}:${port}`
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()

      //testing area
      //messagingTwilio(err, phone_num)

      var Requests = require('../lib/requests/index.js')
      
      var requests = new Requests();

      var options = {
        'path': '/api/v2/users',
      }
      
      requests.get(options, function (result) {
        for (var i = 0; i < result.data.length; i ++){
          var user = result.data[i];
          birthdayChecking(user.date_of_birth, function (result){
            if(result) {
              console.log(`It's ${user.name}'s birthday! (${user.id})` )
            }
          });
        }
      });


      options = { 'path': '/api/v2/clockins'}
      var data = {
        'user_id': '450482',
        'type': 'clockin',
        'time': Date.now()/1000,
      }


      /*var organisation;          
      
      var organisatio_name = {
        'path': '/api/v2/organisations',
      }

      requests.get(organisatio_name, function (res){
          organisation = res.data.name;
          console.log(organisation);
      })*/


      var temp = phone_num;
      var temp_message = 'Happy Birthday from the team at ' + 'Hong & Steven Good Times Bar' + '. Here’s a little something to brighten your day.\n\
      \n\n\nWhat did the fish say when it swam into a wall? Dam.';
      //messagingTwilio(temp, temp_message);
      
      //messagingTwilioRod();

      requests.get(options, function (result){
        for (var i = 0; i < result.data.length; i ++){
          //var temp = result.data[i].normalised_phone;
          var temp = phone_num;
          /*var temp_message = 'Happy Birthday from the team at ' + organisation + '. Here’s a little something to brighten your day.\n\
          \n\n\nWhat did the fish say when it swam into a wall? Dam.';*/
          var temp_message = 'By all means marry: If you get a good wife, you\'ll become happy; if you get a bad one, you\'ll become a philosopher. -- Socrates';

          birthdayChecking(result.data[i].date_of_birth, function (result){
            console.log(result)
            //messagingTwilio(temp, temp_message);
          });
        }
      })
  })
})


var accountSid = 'ACe1337682df29859b94674d089ce32839'; // Your Account SID from www.twilio.com/console
var authToken = 'f9f5585d1086f36b73a9aae12e0fd17e';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

function messagingTwilio(recipient, message){
  client.messages.create({
      body: message,
      to: recipient,  // Text this number
      from: '+61429723943' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
}

var accountSid = 'AC6351c0d9475df1dc4ae316375210eba3'; // Your Account SID from www.twilio.com/console
var authToken = '9727a734ab25baba2f6cc8e13a7d116a';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

function messagingTwilioRod(){
  client.messages.create({
      body: 'Hey today is Steven\'s Birthday, let\'s go and say Happy Birthday',
      to: '+61402867004',  // Text this number
      from: '+61437872924' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
}

var userID;
var userBirthday;
var userNumber;

function initialVariable(err){
  if (err){
    null;
  }
  userID = null;
}

function recipientBirthday(){
    console.log('Happy Birthday, ' + userName);
    //messagigTwilio(err, '+61422544952')
}

var present = new Date();


function birthdayChecking(userBirthday, callback){
  var userBirthdayFormat = new Date(userBirthday);

  callback((userBirthdayFormat.getDate() + '/' + (userBirthdayFormat.getMonth() + 1) == (present.getDate() + '/' + (present.getMonth() + 1))))
  //{
    // callback();
    // console.log(userBirthdayFormat.getDate() + '/' + (userBirthdayFormat.getMonth() + 1));
    // console.log(present.getDate() + '/' + (present.getMonth() + 1));
  // }
}

function workAnniversary (userWorkDate, callback){
  var userWorkDateFormat = new Date(userWorkDate);

  userWorkDateFormat.getDate();

  if ((userWorkDateFormat.getDate() + '/' + (userWorkDateFormat.getMonth() + 1) == (present.getDate() + '/' + (present.getMonth() + 1)))){
    //callback();
  }
}

module.exports = app;
