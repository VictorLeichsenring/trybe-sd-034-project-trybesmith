import { expect } from 'chai';
import sinon from 'sinon';
import userService from '../../../src/services/user.service';
import loginService from '../../../src/services/login.service';
import UserModel, {UserSequelizeModel} from '../../../src/database/models/user.model';
import { Token } from '../../../src/types/Token';
import { Login } from '../../../src/types/Login';
import bcrypt from 'bcryptjs';
import jwtUtil from '../../../src/utils/jwt.util';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should return INVALID_DATA if username is missing', async function () {
    const login: Login = { username: '', password: 'password' };
    const result = await loginService.verifyLogin(login);
    expect(result.status).to.equal('INVALID_DATA');
    expect(result.data).to.deep.equal({ message: '"username" and "password" are required' });
  });
  it('should return INVALID_DATA if password is missing', async function () {
    const login: Login = { username: 'username', password: '' };
    const result = await loginService.verifyLogin(login);
    expect(result.status).to.equal('INVALID_DATA');
    expect(result.data).to.deep.equal({ message: '"username" and "password" are required' });
  });
  it('should return UNAUTHORIZED if username is not found', async function () {
    const login: Login = { username: 'unknown', password: 'password' };
    sinon.stub(UserModel, 'findOne').resolves(null);
    const result = await loginService.verifyLogin(login);
    expect(result.status).to.equal('UNAUTHORIZED');
    expect(result.data).to.deep.equal({ message: 'Username or password invalid' });
  });

  // it('should return UNAUTHORIZED if password is incorrect', async function () {
  //   const foundUser: UserSequelizeModel = UserModel.build({ username: 'username', password: 'correctpassword' });
  //   const login: Login = { username: 'username', password: 'incorrectpassword' };
  //   sinon.stub(UserModel, 'findOne').resolves(foundUser);
  //   sinon.stub(bcrypt, 'compare').resolves(false);
  //   const result = await loginService.verifyLogin(login);
  //   expect(result.status).to.equal('UNAUTHORIZED');
  //   expect(result.data).to.deep.equal({ message: 'Username or password invalid' });
  // });

  // it('should return SUCCESSFUL with token if login is successful', async function () {
  //   const foundUser: UserSequelizeModel = UserModel.build({ id: 1, username: 'username', password: 'correctpassword' });
  //   const login: Login = { username: 'username', password: 'correctpassword' };
  //   sinon.stub(UserModel, 'findOne').resolves(foundUser);
  //   sinon.stub(bcrypt, 'compare').resolves(true);
  //   sinon.stub(jwtUtil, 'sign').returns('token');
  //   const result = await loginService.verifyLogin(login);
  //   expect(result.status).to.equal('SUCCESSFUL');
  //   expect(result.data).to.deep.equal({ token: 'token' });
  // });
});
