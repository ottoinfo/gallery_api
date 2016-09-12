"use strict"

import multer from "multer"
import fs from "fs"
import gm from "gm"
import configFiles from "../config/files.json"

module.exports = function(app, db, socket) {
  const path = "uploads/images/originals/" // Default upload Path

  const createFolder = function(tmp) {
    const folders = tmp.split(/\//)
    folders.map((path, index, array) => {
      try {
        fs.mkdirSync(Array.join(array.slice(0, index + 1), "/"))
      }
      catch (err) {
        if (err.code != "EEXIST") {
          throw err
        }
      }
    })
  }

  // Setup Folders for Images
  createFolder(path)
  Object.keys(configFiles).map(key => {
    const item = configFiles[key]
    createFolder(item.path + item.folder || "")
  })

  const imageManipulation = function(file={}) {
    console.log("imageManipulation", file)
    Object.keys(configFiles).map(key => {
      const item = configFiles[key]
      gm(file.path)
      .resize(item.width, item.height)
      .autoOrient()
      .write(`${item.path}${item.folder}/${file.filename}`, function(err) {
        if (!err) {
          console.log("file created")
        }
        else {
          console.log("Error", err)
        }
      })
    })
  }

  const createModels = function(files=[]) {
    db.Image.bulkCreate(files.map(file => {
      return { // Return Model Objects
        name: file.originalname,
        fileName: file.filename,
        originalName: file.originalname,
        destination: file.destination,
      }
    }), {
      returning: true,
      validate: true,
    })
    .then(function(rows) {
      files.map(file => {
        imageManipulation(file)
      })
      socket.emit("user_channel", {
        data: rows,
        name: "ImageStore",
        type: "store",
      })
    })
    // files.map(file => {
    //   db.Image.create({
    //     name: file.originalname,
    //     fileName: file.filename,
    //     originalName: file.originalname,
    //     destination: file.destination,
    //   }).then(function() {
    //     imageManipulation(file)
    //     socket.emit("user_channel", {
    //       data: files,
    //       name: "ImageStore",
    //       type: "store",
    //     })
    //   })
    // })
  }

  // Multer Settings - Middleware for FILES
  app.use(multer({ 
    dest: path, 
    fileFilter: function(req, file, callback) {
      // Validation for Images Only
      if (!req.isAuthenticated() || file.mimetype.search(/image/) == -1) {
        callback(null, false)
      }
      else {
        callback(null, file.originalname)
      }
    },
  }).array("files", 10)) // Max of 10 Files Uploaded at a time

  app.post("/api/upload/image", function(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(500).send({ message: "You do not have admin access" })
    }
    if (!req.files || !req.files.length) {
      return res.status(500).send({ message: "You did not upload anything" })
    }
    createModels(req.files)
    return res.status(204).send({
      success: true,
      message: "Images are being uploaded and processed...",
    })
  })

}

// fieldname: 'files',
// originalname: 'IMG_5115.JPG',
// encoding: '7bit',
// mimetype: 'image/jpeg',
// destination: 'uploads/images/',
// filename: '8483e2ac6573f8dffecf240837ea19e0',
// path: 'uploads/images/8483e2ac6573f8dffecf240837ea19e0',
// size: 2283408 }