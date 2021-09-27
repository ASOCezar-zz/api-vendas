import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProductImageService from '../../../services/UpdateProductImageService';

export default class ProductsImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProductImage = container.resolve(UpdateProductImageService);

    if (request.file === undefined) {
      throw new AppError('Invalid avatar file');
    }

    const { id } = request.params;

    const product = await updateProductImage.execute({
      product_id: id,
      imageFilename: request.file.filename,
    });

    return response.json(classToClass(product));
  }
}
