import { List } from "../model/List.js";

export const udpate = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    //checking file size
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(500).json({
        success: false,
        message: "You can not upload file greater than 5 mb",
      });
    }

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
    const data = await List.findByIdAndUpdate(
      id,
      {
        title,
        description,
        filePath,
      },
      { new: true }
    );
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
