const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const joinSchema = mongoose.Schema(
  {
    user_id: String,
    ticket_id: String,
    code: String,
    contest_id: String,
    site_user_id: String,
    status: {
      type: String,
      enum: ["pending", "approved", "delivared"],
      default: "pending",
    },
    prize_id: {
      type: String,
      default: "null",
    },
  },
  {
    timestamps: true,
  }
);

joinSchema.plugin(toJSON);
joinSchema.plugin(paginate);

const Join = mongoose.model("Join", joinSchema);

module.exports = Join;
