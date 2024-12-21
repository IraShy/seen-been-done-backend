const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  // parentCategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  //   default: null,
  // },
  // color: { type: String },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
