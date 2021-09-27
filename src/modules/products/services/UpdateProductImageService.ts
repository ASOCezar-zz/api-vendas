import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProviderProductImage/DiskStorageProvider';
import upload from '@config/uploads/uploadProductsImage';
import S3StorageProvider from '@shared/providers/StorageProviderProductImage/S3StorageProvider';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../domain/repositories/IProductsRepository';
import IProduct from '../domain/model/IProduct';
import { IUpdateImage } from '../domain/model/IUpdateImage';

@injectable()
export default class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    product_id,
    imageFilename,
  }: IUpdateImage): Promise<IProduct> {
    const product = await this.productsRepository.findById(product_id);

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

    await this.productsRepository.save(product);

    return product;
  }
}
