// creating middleware for routes
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
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
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
    const filename = file.fieldname + "-" + uniqueSuffix + "." + fileExtension;
    req.fileName = filename;
  },
});
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
