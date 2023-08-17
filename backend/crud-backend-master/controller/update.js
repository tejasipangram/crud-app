import { List } from "../model/List.js";

export const udpate = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const data = await List.findByIdAndUpdate(id, { title, description });
    await data.save();

    return res
      .status(200)
      .json({ success: true, message: "List updated successfully", data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong " });
  }
};
