"use strict"

import express from "express"
import path from "path"
import bodyParser from "body-parser"
import epilogue from "epilogue"
import db from "./models/index"

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.compress())
// app.use("/html", express.static(path.resolve(__dirname, "..", "..", "dist")))
// app.set("view engine", "html")
// app.set("views", "html")

import Login from "./login" // Passport, Sessions, Cookies,
const login = Login(app, db.User)

const server = app.listen(3000, function() {
  const host = server.address().address
  const port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

// CRUD API Endpoints 
epilogue.initialize({
  app: app,
  sequelize: db.sequelize,
  base: '/api/v1',
})

const userResource = epilogue.resource({
  model: db.User,
  endpoints: ["/users", "/users/:id"],
})
userResource.use(login.epilogue())

const imageResource = epilogue.resource({
  model: db.Image,
  endpoints: ["/images", "/images/:id"],
})
imageResource.use(login.epilogue())

const galleryResource = epilogue.resource({
  model: db.Gallery,
  endpoints: [+"/gallery", "/gallery/:id"],
})
galleryResource.use(login.epilogue())

const galleryImagesResource = epilogue.resource({
  model: db.GalleryImage,
  endpoints: ["/gallery_images", "/gallery_images/:id"],
})
galleryImagesResource.use(login.epilogue())

// ROUTES
app.get("/", function(req, res) {
  // res.render("index")
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"))
  // res.send("Hello World!")
})

// Gallery Menu - Only Visible & Ordered
app.get("/galleries", function(req, res) {
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
app.get("/gallery/:id", function(req, res) {
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

// Admin Routes
app.get("/login", function(req, res) {
  res.send("login page!")
  // if (!req.user) {
  //   throw new Error("user null")
  // }
  // res.redirect("/admin")
})

app.post("/login", 
  login.authenticate("local", { successRedirect: "/admin", failureRedirect: "/" }),
  function(req, res) {
    console.log("authenticate")
    if (!req.user)
      throw new Error("user null")
    res.redirect("/admin")
  }
)

app.get("/logout", login.logout)

app.get("/admin", login.isAuthenticated, function(req, res) {
  res.render("admin", {
    admin: req.user,
  })
})

// Handle 404
app.use(function(req, res) {
  res.status(404) // .send("404: Page not Found")
  console.log("Test")
  res.sendFile(path.resolve(__dirname, "html", "index.html"))
})

// Handle 500
app.use(function(error, req, res, next) {
  console.log(error, next)
  // res.status(500)
  // res.render("500.html", {title:"500: Internal Server Error", error: error})
  res.status(500).send("500: Internal Server Error")
})
// curl --data "name=file.jpg&file=file.jpg" http://localhost:3000/images
// curl --data "name=Testing" http://localhost:3000/gallery/
// curl --data "galleryId=1&imageId=1&text=hhhhhh" http://localhost:3000/gallery_images/