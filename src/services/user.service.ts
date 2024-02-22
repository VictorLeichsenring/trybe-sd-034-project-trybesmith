import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';

async function getAll(): Promise<ServiceResponse<UserSequelizeModel[]>> {
  const users = await UserModel.findAll();
  return { status: 'SUCCESSFUL', data: users };
}

export default {
  getAll,
};