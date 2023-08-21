import { List } from "../model/List.js";

export const create = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.file, "this is req.file");
  try {
    if (!title || !description || !req.file) {
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
    let fileType = req.file.originalname.split(".");
    fileType = fileType[fileType.length - 1];
    console.log(fileType);
    if (fileType !== "png" && fileType !== "jpg") {
      console.log(req.file.mimetype.split("/")[1]);
      return res.status(500).json({
        success: false,
        message: "Only jpg or png files are allowed",
      });
    }

    const filePath = req.fileName;

    const data = new List({ title, description, filePath });
    await data.save();
    res.status(201).json({ success: true, message: "List added", data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong " });
  }
};
