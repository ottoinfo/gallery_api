"use strict"

module.exports = function(app, User) {
  const passport = require("passport")

  app.use(require("cookie-parser")())
  app.use(require("express-session")({ 
    secret: "testing", 
    resave: false, 
    saveUninitialized: false ,
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  const Strategy = require("passport-local").Strategy
  const strategy = new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    }, function(email, password, done) {
      console.log("login", email, password)
      User.find({ where: { email: email } })
      .then(function(user) {
        console.log(user)
        if (!user)
          return done(null, false, { message: "Nobody here by that name" })
        console.log("first")
        if (user.first_name !== password)
          return done(null, false, { message: "Wrong password" })
        console.log("don")
        return done(null, { username: user.username })
      })
    }
  )

  passport.use(strategy)

  passport.validPassword = function(password) {
    return this.password === password
  }

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

  passport.loginSuccess = function(req, res) {
    res.json({
      success: true,
      user: req.session.passport.user,
    })
  },

  passport.loginFailure = function(req, res) {
    res.json({
      success:false,
      message: "Invalid username or password.",
    })
  },

  passport.logout = function(req, res) {
    console.log("logout")
    req.logout()
    res.redirect("/")
  }

  passport.epilogue = function() {
    const ForbiddenError = require("epilogue").Errors.ForbiddenError
    const beforeFilter = function(req, res, context) {
      console.log(process.env.NODE_ENV)
      if (!req.isAuthenticated() && process.env.NODE_ENV == 'development') 
        throw new ForbiddenError(null,"You do not have admin access")
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

// module.exports = passport

// const auth = {}
//   auth.localStrategy = new Strategy({
//     username: "username",
//     password: "password"
//   }, function(username, password, done) {
//     User.find({username: username}).success(function(user) {
//       if (!user) {
//         return done(null, false, { message: "Nobody here by that name"} )
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: "Wrong password"} )
//       }
//       return done(null, { username: user.username })
//     })
//   })

//   auth.validPassword = function(password) {
//     return this.password === password
//   }

//   auth.serializeUser = function(user, done) {
//     done(null, user)
//   }

//   auth.deserializeUser = function(obj, done) {
//     done(null, obj)
//   }

// const AuthController = {

//   login: passport.authenticate("local", {
//     successRedirect: "/auth/login/success",
//     failureRedirect: "/auth/login/failure"
//   }),

//   loginSuccess: function(req, res) {
//     res.json({
//       success: true,
//       user: req.session.passport.user
//     })
//   },

//   loginFailure: function(req, res) {
//     res.json({
//       success:false,
//       message: "Invalid username or password."
//     })
//   },

//   logout: function(req, res) {
//     req.logout()
//     res.end()
//   },
// }