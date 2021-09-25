import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import DiskStorageProvider from '@shared/providers/StorageProviderProductImage/DiskStorageProvider';
import upload from '@config/uploads/uploadProductsImage';
import S3StorageProvider from '@shared/providers/StorageProviderProductImage/S3StorageProvider';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';

type UpdateUserAvatarType = {
  product_id: string;
  imageFilename: string;
};

export default class UpdateProductImageService {
  public async execute({
    product_id,
    imageFilename,
  }: UpdateUserAvatarType): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product Not Found', 404);
    }

    if (upload.driver === 's3') {
      const s3Provider = new S3StorageProvider();

      if (product.image) {
        await s3Provider.deleteFile(product.image);
      }

      const filename = await s3Provider.saveFile(imageFilename);
      product.image = filename;
    } else {
      const diskProvider = new DiskStorageProvider();

      if (product.image) {
        await diskProvider.deleteFile(product.image);
      }

      const filename = await diskProvider.saveFile(imageFilename);
      product.image = filename;
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}
