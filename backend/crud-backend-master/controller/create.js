import { List } from "../model/List.js";

export const create = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title && !description) {
      return res
        .status(500)
        .json({ success: false, message: "Please provide all the fields " });
    }

    const filePath = req.fileName;
    console.log(filePath);
    const data = new List({ title, description, filePath });
    await data.save();
    res.status(201).json({ success: true, message: "List added", data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong " });
  }
};
