const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');

//Configure passport
passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        console.log('used local strat')
        if (err) return done(err);
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            //passwords match, log user in.
            return done(null, user);
          }
          else {
            //passwords do not match.
            return done(null, false, { msg: "Incorrect password" });
          }
        });
      })
    })
  );

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;