const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
    },
    size: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Media", mediaSchema);
