import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function validateParams({
  name,
  price,
  userId,
}: ProductInputtableTypes): string | null {
  if (!name) return 'Name is required';
  if (!price) return 'Price is required';
  if (!userId) return 'userId is required';

  return null;
}

async function create(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const error = validateParams(product);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }
  const newProduct = await ProductModel.create(product);
  responseService = { status: 'CREATED', data: newProduct.dataValues };
  return responseService;
}

export default {
  create,
};