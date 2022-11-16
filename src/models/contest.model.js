const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const contestSchema = mongoose.Schema(
  {
    name: String,
    start_date: {
      type: String,
      default: Date.now,
    },
    end_date: String,
    main_prize_id: String,
    code_list: String,
    other_prize_ids: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      enum: ["finished", "runing", "wating"],
      default: "wating",
    },
    winer_id: {
      type: String,
      default: "null",
    },
  },
  {
    timestamps: true,
  }
);

contestSchema.plugin(toJSON);
contestSchema.plugin(paginate);

const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;
