import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controllers/login.controller';
import loginService from '../../../src/services/login.service';
import userService from '../../../src/services/user.service';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return 400 if username and password are missing', async function () {
    const req = {} as Request;
    req.body = {};
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });
  it('should return 400 if username is missing', async function () {
    const req = {} as Request;
    req.body = { password: 'password' };
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });
  it('should return 400 if password is missing', async function () {
    const req = {} as Request;
    req.body = { username: 'username' };
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });
  it('should return 401 if username is not found', async function () {
    const req = {} as Request;
    req.body = { username: 'unknown', password: 'password' };
    sinon.stub(loginService, 'verifyLogin').resolves({ status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } });
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
  });
  it('should return 401 if password is invalid', async function () {
    const req = {} as Request;
    req.body = { username: 'username', password: 'wrongpassword' };
    sinon.stub(loginService, 'verifyLogin').resolves({ status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } });
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
  });
  it('should return 401 if username is not found', async function () {
    const req = {} as Request;
    req.body = { username: 'unknown', password: 'password' };
    sinon.stub(loginService, 'verifyLogin').resolves({ status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } });
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
  });
  it('should return 401 if password is invalid', async function () {
    const req = {} as Request;
    req.body = { username: 'username', password: 'wrongpassword' };
    sinon.stub(loginService, 'verifyLogin').resolves({ status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } });
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
  });

  it('should return 200 and token if login is successful', async function () {
    const req = {} as Request;
    req.body = { username: 'username', password: 'password' };
    sinon.stub(loginService, 'verifyLogin').resolves({ status: 'SUCCESSFUL', data: { token: 'token' } });
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: 'token' });
  });

  it('should return a token when valid username and password are provided', async function () {
    req.body = {
      username: 'validUsername',
      password: 'validPassword'
    };

    sinon.stub(loginService, 'verifyLogin').resolves({ status: 'SUCCESSFUL', data: {token:'validToken'} });

    await loginController.login(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ token: 'validToken' });
  });

  it('should return a null', async function () {
    req.body = {
      username: 'validUsername',
      password: 'validPassword'
    };

    sinon.stub(loginService, 'verifyLogin').resolves({ status: 'SUCCESSFUL', data: {token:'validToken'} });

    await loginController.login(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ token: 'validToken' });
  });

});
