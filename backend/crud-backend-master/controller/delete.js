import { List } from "../model/List.js";

export const deleteList = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    await List.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ succes: true, message: "List delete successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong " });
  }
};
