"use strict"

import epilogue from "epilogue"
import Helper from "./Sequelize"

module.exports = function(app, db) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize,
    base: "/api",
  })

  const userResource = epilogue.resource({
    model: db.User,
    endpoints: ["/users", "/users/:id"],
    excludeAttributes: ["password", "createdAt", "updatedAt"],
  })
  userResource.use(Helper.isAdmin())

  const imageResource = epilogue.resource({
    model: db.Image,
    endpoints: ["/images", "/images/:id"],
  })
  imageResource.use(Helper.isAdmin())

  const galleryResource = epilogue.resource({
    model: db.Gallery,
    endpoints: ["/galleries", "/galleries/:id"],
  })
  galleryResource.use(Helper.isAdmin())

  const galleryImagesResource = epilogue.resource({
    model: db.GalleryImage,
    endpoints: ["/gallery_images", "/gallery_images/:id"],
  })
  galleryImagesResource.use(Helper.isAdmin())

  const tagResource = epilogue.resource({
    model: db.Tag,
    endpoints: ["/tags", "/tags/:id"],
  })
  tagResource.use(Helper.isAdmin())
}