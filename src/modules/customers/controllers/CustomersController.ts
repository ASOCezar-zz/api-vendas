import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();

    const customer = await listCustomers.execute();

    return response.json(customer);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const create = new CreateCustomerService();

    const customer = await create.execute({ name, email });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({ name, email, id });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.status(204).json();
  }
}
