import { List } from "../model/List.js";

export const create = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.file);
  try {
    if (!title && !description) {
      return res
        .status(500)
        .json({ success: false, message: "Please provide all the fields " });
    }

    //checking file size
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(500).json({
        success: false,
        message: "You can not upload file greater than 5 mb",
      });
    }

    //checking file extension

    if (
      req.file.mimetype.split("/")[1] !== "png" &&
      req.file.mimetype.split("/")[1] !== "jpg"
    ) {
      return res.status(500).json({
        success: false,
        message: "Only jpg or png files are allowed",
      });
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
