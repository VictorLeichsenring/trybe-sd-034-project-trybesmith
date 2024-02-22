import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const { name, price, userId } = req.body;
  const { status, data } = await productService.create({ name, price, userId });
  return res.status(mapStatusHTTP(status)).json(data);
}

export default {
  create,
};