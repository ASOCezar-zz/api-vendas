import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductService from '../../../services/ListProductService';
import QueryProductService from '../../../services/QueryProductService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute();

    return response.json(products);
  }

  public async query(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const queryProduct = container.resolve(QueryProductService);
    const product = await queryProduct.execute({ id });

    return response.json(classToClass(product));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);
    const result = await deleteProduct.execute({ id });

    return response.json(classToClass(result));
  }
}
