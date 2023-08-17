import { List } from "../model/List.js";

export const read = async (req, res) => {
  //get all lists
  try {
    const data = await List.find({});
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong " });
  }
};
