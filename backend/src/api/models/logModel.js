const mongoose = require("mongoose")

const LogSchema = mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    diff: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
)

LogSchema.index({ action: 1, category: 1 })

module.exports = mongoose.model("Log", LogSchema)
