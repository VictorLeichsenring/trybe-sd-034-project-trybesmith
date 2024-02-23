import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt.util';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { Token } from '../types/Token';
import { Login } from '../types/Login';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }
  const foundUser: UserSequelizeModel |
  null = await UserModel.findOne({ where: { username: login.username } });

  if (!foundUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const password: string = foundUser.get('password') as string;
  const isPasswordValid = await bcrypt.compare(login.password, password);

  if (!isPasswordValid) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = foundUser.dataValues;
  const token = jwtUtil.sign({ id, username });
  return { status: 'SUCCESSFUL', data: { token } };
}
export default {
  verifyLogin,
};