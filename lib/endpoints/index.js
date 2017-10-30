const Requests = require('../requests')
const request = new Requests()

module.exports = function (app) {


  app.post('/api/webhooks', function (req, res) {
    var data = req.body;

    //On clockin
    /*
        if(data.payload.body.type === 'clockin') {

          console.log('user_id', data.payload.body.user_id);

          //Get user
          var options = { 'path': '/api/v2/users/' + data.payload.body.user_id }
          request.get(options, function(userResult) {

            
            //Get clocked in user's departments      
            for (var i = 0; i < userResult.data.department_ids.length; i++) {
              var dep_id = userResult.data.department_ids[i];
              // console.log('dep_id', dep_id);
          
              var options = {
                'path': '/api/v2/departments/' + dep_id,
              } 
              request.get(options, function(depResult) {

                //Get coworkers in team
                for (var j = 0; j < depResult.data.staff.length; j++) {
                  var staff_id = depResult.data.staff[j];
                  
                  // console.log('staff_id', staff_id);

                  var options = {
                    'path': '/api/v2/users/' + staff_id
                  }

                  request.get(options, function (coworkersResult) {
                    console.log(`You work with ${coworkersResult.data.name} in ${depResult.data.name}`)
                  })
                  
                }
              });

            }

          })
          
        }
    */
    //console.log(data);
  });

  app.post('/api/webhooks/new_user', function (req, res) {
    var data = req.body;

    var options = {
      'path': '/api/v2/users/' + data.payload.body.id
    }

    request.get(options, function (newUserResult) {
      var newUser = newUserResult.data;

      console.log(newUser)
      
      var newName = newUser.name;
      var startDate = newUser.employment_start_date;
      var department_ids = newUser.department_ids;

      console.log(newName, department_ids, startDate);

      if (department_ids && department_ids.length > 0) {

        for (var i = 0; i < department_ids.length; i++) {
          var dep_id = department_ids[i];
          var options = {
            'path': '/api/v2/departments/' + dep_id,
          }

          request.get(options, function (depResult) {

            //Get coworkers in team
            for (var j = 0; j < depResult.data.staff.length; j++) {
              var staff_id = depResult.data.staff[j];

              var options = {
                'path': '/api/v2/users/' + staff_id
              }

              request.get(options, function (coworkersResult) {

                var cw = coworkersResult.data;
                
                phone_number = cw.normalised_phone;
                picture = cw.photo;
                // console.log(picture);
                picture = 'https://goo.gl/EZ1GgX'

                if (phone_number) {
                  var msg = `-\n\nHi ${cw.name}! You have a new member of your team: ${depResult.data.name}!\n\n` +  
                 `${newName} will be starting ${startDate}\n\n` +
                 `Here's a picture to get you acquainted: ${picture}`;
                  

                  messagingTwilio(phone_number, msg);
                }

                // console.log(`You work with ${coworkersResult.data.name} in ${depResult.data.name}`)

              })

            }
          });

        }
      }
    })
  })

  var accountSid = 'ACe1337682df29859b94674d089ce32839'; // Your Account SID from www.twilio.com/console
  var authToken = 'f9f5585d1086f36b73a9aae12e0fd17e'; // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);

  function messagingTwilio(recipient, message) {
    console.log(`Sending ${message} to ${recipient}`);
    client.messages.create({
        body: message,
        to: recipient, // Text this number
        from: '+61429723943' // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
  }

}
