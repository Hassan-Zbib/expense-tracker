const _ = require("lodash")
const asyncHandler = require("express-async-handler")
const LogSchema = require("../models/logModel")
const { getJsonDiff } = require("../helpers/common")
const User = require("../models/userModel")
const Document = require("../models/documentModel")
const Income = require("../models/incomeModel")
const Expense = require("../models/expenseModel")

const loggingPlugin = function (schema) {
  schema.post("init", (doc) => {
    doc._original = doc.toObject({ transform: false })
  })
  schema.pre("save", function (next) {
    if (this.isNew) {
      next()
    } else {
      this._diff = getJsonDiff(this, this._original)
      next()
    }
  })

  schema.methods.logging = function (data) {
    data.diff = {
      before: this._original,
      after: this._diff,
    }
    return LogSchema.create(data)
  }
}

const log = async (req, res, model) => {
  console.log(req.method, req.originalUrl, res.statusCode, req.user.id, model)

  // const data = {
  //   action: "update-user",
  //   category: "users",
  //   createdBy: req.user.id,
  //   message: "Updated user name",
  // }

  // model.logging(data)
}

module.exports = { loggingPlugin, log }
