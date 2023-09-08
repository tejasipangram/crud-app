import mongoose from "mongoose";
const ListSchema = new mongoose.Schema({
  title: String,
  description: String,
  filePath: String,
  UserId: String,
  email: String,
});

export const List = mongoose.model("List", ListSchema);
