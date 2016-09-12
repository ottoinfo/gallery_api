"use strict"

import passport from "passport"
import passport_local from "passport-local"
import cookie from "cookie-parser"
import session from "express-session"

module.exports = function(app, User) {
  app.use(cookie())
  app.use(session({ 
    cookie: { httpOnly: true }, // Add Cookies for React Validation
    maxAge: 1000 * 60 * 24, // 1 Day
    name: "gallery.admin",
    resave: false,
    secret: "testing",
    saveUninitialized: false,
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use([function(err, req, res, next) {
    console.log("err", err)
    const statusCode = err.status || 500
    res.status(statusCode).json({
      error: {
        name: err.name,
        message: err.message,
        text: err.toString(),
      },
    })
  }])

  passport.use("user_connection", new passport_local.Strategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, username, password, done) {
    User.findOne({ where: { userName: username } })
    .then(function(user) {
      if (!user) return done(null, false,  passport.loginFailure())
      if (!user.checkPassword(password)) return done(null, false, passport.loginFailure())
      return done(null, { 
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      }, passport.loginSuccess(req))
    }).catch(function(err) {
      console.log("Error Signin:", err)
      return done(err)
    })
  }))

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  passport.isAuthenticated = function(req, res, next) {
    console.log("isAuthenticated", req.isAuthenticated())
    if (!req.isAuthenticated()) {
      return res.redirect("/")
    }
    next()
  }

  passport.loginSuccess = function(req) {
    return { 
      success: true,
      user: req.sessionID,
    }
  }

  passport.loginFailure = function() {
    return { 
      success:false,
      message: "Invalid username or password.",
    }
  }

  passport.logout = function(req, res) {
    req.logout()
    req.session.destroy()
    res.redirect("/")
  }

  passport.epilogue = function() {
    const beforeFilter = function(req, res, context) {
      console.log("ENV", process.env.NODE_ENV)
      if (!req.isAuthenticated()) {
        return res.status(500).send({ 
          message: "You do not have admin access",
        })
      }
      return context.continue
    }
    return {
      create: {
        write: {
          before: beforeFilter,
        },
      },
      list: {
        write: {
          before: beforeFilter,
        },
      },
      read: {
        write: {
          before: beforeFilter,
        },
      },
      update: {
        write: {
          before: beforeFilter,
        },
      },
      delete: {
        write: {
          before: beforeFilter,
        },
      },
    }
  }

  return passport
}