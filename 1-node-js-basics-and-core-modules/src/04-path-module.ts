import path from "node:path";
import process from "node:process";

const userId = 34;
const originalName = "profile.photo.png";
const projectRoot = process.cwd();

const uploadFilePath = path.join(projectRoot, "uploads", "users", `${userId}_${originalName}`);
console.log('uploadFilePath :', uploadFilePath);

const basename = path.basename(uploadFilePath);
console.log('basename :', basename);

const fileExt = path.extname(uploadFilePath);
console.log('fileExt :', fileExt);

const parentFolder = path.dirname(uploadFilePath);
console.log('parentFolder :', parentFolder);