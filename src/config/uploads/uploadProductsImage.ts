import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  directory: string;
  tmpFolder: string;
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const storageFolder = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'uploads',
  'products',
);

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVE,
  directory: storageFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'apivendas-products',
    },
  },
} as IUploadConfig;
