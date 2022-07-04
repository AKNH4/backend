import { diskStorage, DiskStorageOptions } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpeg', 'jpg'];
const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

export const ProfileImageStorage = {
  storage: diskStorage({
    destination: 'uploads/profileimages',
    filename: (req, file, cb) => {
      const fileExtension: string = extname(file.originalname);
      const filename: string = v4() + fileExtension;

      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};
