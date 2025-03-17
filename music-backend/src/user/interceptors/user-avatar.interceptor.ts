import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Injectable()
export class UserProfilePictureInterceptor extends FileInterceptor(
  'profilePicture',
  {
    storage: diskStorage({
      destination: './uploads/profile-pictures',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); 
        cb(null, `user-${uniqueSuffix}${ext}`); 
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
        return cb(null, false); 
      }
      cb(null, true);
    },
  },
) {}
