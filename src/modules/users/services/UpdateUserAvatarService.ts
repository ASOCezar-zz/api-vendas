import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/providers/StorageProviderAvatar/DiskStorageProvider';
import upload from '@config/uploads/uploadUserAvatar';
import S3StorageProvider from '@shared/providers/StorageProviderAvatar/S3StorageProvider';

type UpdateUserAvatarType = {
  user_id: string;
  avatarFilename: string;
};

export default class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: UpdateUserAvatarType): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User Not Found', 404);
    }

    if (upload.driver === 's3') {
      const s3Provider = new S3StorageProvider();

      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const filename = await s3Provider.saveFile(avatarFilename);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();

      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const filename = await diskProvider.saveFile(avatarFilename);
      user.avatar = filename;
    }

    await usersRepository.save(user);

    return user;
  }
}
