import UserModel from '../database/models/user.model';
import { ServiceResponse, ServiceResponseError } from '../types/ServiceResponse';
import ProductModel from '../database/models/product.model';
import { UserInput } from '../types/User';

const getAll = async (): Promise<ServiceResponse<UserInput[]> | ServiceResponseError> => {
  try {
    const users = await UserModel.findAll();
    const products = await ProductModel.findAll();

    const response: UserInput[] = users.map((user) => {
      const getUserProducts = products
        .filter((product) => product.dataValues.userId === user.dataValues.id)
        .map((product) => product.dataValues.id)
        .filter((id) => typeof id === 'number') as number[]; // Filtrar e converter para number[]
      
      return {
        username: user.dataValues.username,
        productIds: getUserProducts,
      };
    });

    return { status: 'SUCCESSFUL', data: response };
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Erro ao recuperar os usuários.' } };
  }
};

export default {
  getAll,
};