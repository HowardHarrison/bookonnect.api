import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "assets"));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
export default upload;