import Joi from 'joi';
import ProductModel, { 
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const productSchema = Joi.object({
  name: Joi.string().required().min(3),
  userId: Joi.number().required(),
  price: Joi.string().required().min(3),
}); 

async function create(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  const { error } = productSchema.validate(product);
  if (error) {
    const errorMessage = error.details[0].message;
    return { status: 'INVALID_DATA', data: { message: errorMessage } };
  }
  const newProduct = await ProductModel.create(product);
  const responseService: ServiceResponse<Product> = { 
    status: 'CREATED', data: newProduct.dataValues };
  return responseService;
}

async function getAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
}

export default {
  create,
  getAll,
};