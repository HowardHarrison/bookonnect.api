import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuid } from 'uuid';

export const imageUploadOptions = {
  storage: diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, join(process.cwd(), 'public', 'assets'));
    },
    filename: (_req, file, callback) => {
      callback(null, `${uuid()}${extname(file.originalname) || ''}`);
    },
  }),
};
