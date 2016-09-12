"use strict"
// Custom Validation and Hooks
module.exports = {

  createSlug: function(val) {
    const from = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź"
    const to = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz"
    const regex = new RegExp("[" + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "]", "g")
   
    if (!val) return ""
   
    val = String(val).toLowerCase().replace(regex, function(c) {
      return to.charAt(from.indexOf(c)) || "-"
    })
   
    return val.replace(/[^\w\s-]/g, "").replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
  },

  isAdmin: function() {
    const ForbiddenError = require("epilogue").Errors.ForbiddenError
    const adminFilter = function(req, res, context) {
      console.log("check auth", req.isAuthenticated())
      if (!req.isAuthenticated()) {
        throw new ForbiddenError(null,"You do not have admin access")
      }
      return context.continue
    }
    return {
      create: {
        auth: adminFilter,
      },
      list: {
        auth: adminFilter,
      },
      read: {
        auth: adminFilter,
      },
      update: {
        auth: adminFilter,
      },
      delete: {
        auth: adminFilter,
        complete: function(req, res, context) {
          console.log("Res", res)
          res.delete = true
        },
      },
    }
  },
}