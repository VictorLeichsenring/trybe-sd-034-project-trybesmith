import { Request, Response } from 'express';
import userService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getAll(req: Request, res: Response) {
  const { status, data } = await userService.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
}

export default {
  getAll,
};