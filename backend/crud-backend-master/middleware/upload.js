// creating middleware for routes
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../upload"); // Change "uploads" to your desired directory name
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.mimetype.split("/")[1];
    cb(null, file.originalname + "-" + uniqueSuffix + "." + fileExtension);

    const filename =
      file.originalname + "-" + uniqueSuffix + "." + fileExtension;
    req.fileName = filename;
  },
});
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// export async function uploadImage(req, res, next) {
//   try {
//     console.log("here we came");

//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//     console.error(error);
//   }
// }

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle specific multer errors, such as file size limit exceeded
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the limit of 5MB",
      });
    }
    // Handle other multer errors as needed
    return res
      .status(400)
      .json({ success: false, message: "Multer error: " + err.message });
  }
  // Pass other errors to the default error handler
  next(err);
};
