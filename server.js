const express = require('express');
const app = express();
const port = process.env.PORT || 4787;
const bodyParser = require("body-parser");
const keys = require('./keys');

//Database related imports---------------------------------------------------

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//---------------------------------------------------------------------------

let mongoLogin = require('./config'); //Credentials for database access
let models = require('./db/index'); //importing database models



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.listen(port, () => console.log(`Listening on port ${port}`)); //Setting up app to listen Port

//connects to Mlab using credentials from config.js
mongoose.connect(mongoLogin.dbRoot(), {useNewUrlParser: true}, (err) => {

  if (err) {
    console.log(err);
  } else {
    console.log(
      `dbRoot: ${mongoLogin.dbRoot()}`
    );
    console.log('Connected');
  }

});



//Rendering production build-------------------------------------------------

const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.use(['/profile', '/users', '/login', '/signin, /signup'], (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html')), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  }
});

//---------------------------------------------------------------------------

//returns VK app ID
app.get('/api/VK_apiId', (req, res) => {
  res.send({express: keys.VK_apiId});
});


//API, functions provide "Signup, Login, Get All Users, Delete User" functionality

//Returns users list if correct user token exists in header, else returns fault alert
app.get('/api/users', function (req, res) {
  let token = req.body.token || req.query['token'] || req.headers['x-access-token'];
  //console.log(token);

  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      return res.json({success: false, message: 'Выполните вход в учетную запись!'});
    } else {
      // if everything is good, save to request for use in other routes
      models.user.find({}, (err, users) => {
        if (err)
          return done(err);
        if (users) {
          //console.log("Users count : " + users.length);
          res.json(users);
        }
      })
    }
  });
});


//Creates and saves new user in database, if correct token is provided, else return fault alert message
app.post('/api/signup', function (req, res) {

  //console.log(req.body)
  //verifying token provided in request data
  bcrypt.hash(req.body.password, 10, function (err, hash) {

    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    else {

      models.user.findOne({email: req.body.email}, (err, user) => {

        if (user) {
          //console.log("Users count : " + users.length);
          res.status(200).json({
            success: false, message: 'Такой пользователь уже зарегистрирован!'
          });

        } else {

          //creating new user, not a root user
          const user = new models.user({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            password: hash,
            superuser: false,
          });

          //save new object in collection
          user.save().then(function (result) {
            console.log(result);
            res.status(200).json({
              success: true, message: 'Пользователь добавлен, можете войти на сайт с вашими учетными данными'
            });
          }).catch(error => {
            res.status(500).json({
              error: err
            });
          });

        }
      });


    }
  });
});

//Finds and removes user from users database, if valid token is provided in request data
app.delete('/api/deleteUser', function (req, res) {
  let token = req.body.token || req.query['token'] || req.headers['x-access-token'];
  //console.log(token);

  //verifying token provided in request data
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      return res.json({success: false, message: 'Выполните вход в учетную запись!'});
    } else {
      // if everything is good, save to request for use in other routes
      models.user.findByIdAndRemove(req.body._id, (err, user) => {

        if (err) {
          res.status(500).json({
            error: err
          });
        }
        else {
          res.status(200).json({
            success: true, message: 'Изменения сохранены!'
          })
        }
      })
    }
  });
});


//after VK login request tries to find usr dy VK id in database, if
//user exists returns complete user object, if not creates new user

app.post('/api/vk_signin', function (req, res) {
  models.user.findOne({vk_id: req.body.vk_id})
    .exec()
    .then(function (user) {
      if (user) {
        const JWTToken = jwt.sign({
            email: user.email,
            _id: user._id
          },
          'secret',
          {
            expiresIn: 86400 //'24h'
          });

        return res.status(200).json({
          success: 'Welcome to the JWT Auth',
          token: JWTToken,
          superuser: user.superuser,
          name: user.name,
          email: user.email,
          vk_id: user.vk_id
        });
      }

      else {
        //creating new user, not a root user
        const new_user = new models.user({
          _id: new mongoose.Types.ObjectId(),
          email: '',
          name: req.body.name,
          vk_id: req.body.vk_id,
          password: '',
          superuser: false,
        });

        //save new object in collection
        new_user.save().then(function () {

          const JWTToken = jwt.sign({
              email: new_user.email,
              _id: new_user._id
            },
            'secret',
            {
              expiresIn: 86400 //'24h'
            });
          res.status(200).json({
            success: 'Welcome to the JWT Auth',
            token: JWTToken,
            superuser: new_user.superuser,
            name: new_user.name,
            email: new_user.email,
            vk_id: new_user.vk_id
          });
        })
      }

    })


});

//function finds user in database, if user exists creates JWT token for authorisation
app.post('/api/signin', function (req, res) {
  models.user.findOne({email: req.body.email})
    .exec()
    .then(function (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }

        if (result) {
          // create a token
          const JWTToken = jwt.sign({
              email: user.email,
              _id: user._id
            },
            'secret',
            {
              expiresIn: 86400 //'24h'
            });

          return res.status(200).json({
            success: 'Welcome to the JWT Auth',
            token: JWTToken,
            superuser: user.superuser,
            name: user.name,
            email: user.email
          });
        }
        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});







