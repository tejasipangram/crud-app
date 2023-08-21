import { promises as fsPromises } from "fs";
import path from "path";

export async function createUploadDirectory() {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const directoryPath = path.join(__dirname, "../upload");

  try {
    // Check if the directory exists
    await fsPromises.access(directoryPath, fsPromises.constants.F_OK);
  } catch (err) {
    // Directory doesn't exist, create it
    try {
      await fsPromises.mkdir(directoryPath);
      console.log('Directory "upload" created.');
    } catch (mkdirErr) {
      console.error("Error creating directory:", mkdirErr);
    }
  }
}
