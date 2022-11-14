const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const prizeSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

prizeSchema.plugin(toJSON);
prizeSchema.plugin(paginate);

const Prize = mongoose.model("Prize", prizeSchema);

module.exports = Prize;
