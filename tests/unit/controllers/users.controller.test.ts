import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import userService from '../../../src/services/user.service'
import userController from '../../../src/controllers/user.controller'
import UserModel from '../../../src/database/models/user.model';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { User } from '../../../src/types/User';


chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('User Controller', function() {
    it('deve recuperar todos os usuarios', async function() {
      const mockedUsers = [
        UserModel.build({ id: 1, username: 'Hagar', vocation: 'Guerreiro', level: 10, password: 'password1' }),
        UserModel.build({ id: 2, username: 'Eddie', vocation: 'Guerreiro', level: 20, password: 'password2' }),
        UserModel.build({ id: 3, username: 'Helga', vocation: 'Curandeira', level: 15, password: 'password3' }),
      ];
      

      sinon.stub(UserModel, 'findAll').resolves(mockedUsers);
      // Aqui, assumimos que você está testando o userService diretamente. Se estiver testando o userController, você precisa mockar userService.getAll.

      // Chamada ao serviço ou controlador, dependendo do que está sendo testado
      const result = await userService.getAll();
      expect(result.status).to.equal('SUCCESSFUL');

      const expectedResult = [
        { username: 'Hagar', productIds: [1, 2] },
        { username: 'Eddie', productIds: [3, 4] },
        { username: 'Helga', productIds: [5] },
      ];
      // Verificações
      expect(result.data).to.deep.equal(expectedResult);

    })
  })
});
