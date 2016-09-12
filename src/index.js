"use strict"

import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import db from "./models/index"
import httpProxy from "http-proxy"
import Login from "./helpers/Login"
import Crud from "./helpers/Crud"
import Sockets from "./helpers/Sockets"
import Uploads from "./helpers/Uploads"

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.use("/uploads", express.static("uploads"))
app.listen(3000, function() {
  const host = this.address().address
  const port = this.address().port
  console.log("ADMIN_API Server listening on http://%s:%s", host, port)
})

const socket = Sockets(app)

const proxy = httpProxy.createProxyServer()

// Passport, Sessions, Cookies,
const login = Login(app, db.User)

// CRUD API Endpoints
Crud(app, db)

// Gallery Menu - Only Visible & Ordered
app.get("/api/gallery/menu", function(req, res) {
  db.Gallery.scope("visible", "order").findAll({
    attributes: ["name"],
  })
  .then(function(data) {
    if (!data) 
      data = { error: "No Gallery Menu" }
    res.status(200).json(data)
  })
  .catch(function(error) {
    console.log(error)
    res.status(500).send({ error: "Something catched!" })
  })
})

// Gallery Info & Images - Only Visible & Ordered
app.get("/api/gallery/:id", function(req, res) {
  db.Gallery.getImages(req.params.id, db).then(function(data) {
    if (!data) 
      data = { error: "No Gallery Found" } 
    res.status(200).json(data)
  })
  .catch(function(error) {
    console.log(error)
    res.status(500).send({ error: "Something failed!" })
  })
})

// Uploads & API - Images
Uploads(app, db, socket)

// Admin Routes
app.post("/api/account/login", 
  login.authenticate("user_connection", { failWithError: true }), // { successRedirect: "/",  failureRedirect: "/in",  failureMessage: "Invalid username or password" }
  function(req, res, next) {
    return res.json(req.authInfo) // handle success
  },
  function(err, req, res, next) {
    return res.json({ success: false, message: "Incorrect username or password" }) // handle error
  }
)

app.get("/api/account/logout", login.logout)

app.get(/\/admin.*/, function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login")
  }
  next()
})

app.get(/login/, function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin")
  }
  next()
})

// ROUTES - Catch All
app.get("/*", function(req, res, next) {
  if (!proxy) {
    next()
  }
  return proxy.web(req, res, {
    target: "http://localhost:8080/",
  })
  
})

// Proxy Errors
proxy.on("error", function(ev) {
  console.log("Could not connect to proxy, please try again...")
})