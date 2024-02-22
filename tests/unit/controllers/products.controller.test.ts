import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';
import { ProductSequelizeModel } from '../../../src/database/models/product.model';
chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('Product Controller', async function () {
    const prod = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      userId: 1
    };
    const expectedResult = {
      id: 1,
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      userId: 1
    };
  
    req.body = prod;
    sinon.stub(productService, 'create').resolves({ status: 'CREATED', data: expectedResult });
    await productController.create(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(expectedResult);
  })
  // describe('teste product Controller', function () {
  //   it('Cria um novo produto', async function () {
  //     const prod = {
  //       name: 'pipoca',
  //       price: "5.00",
  //       userId: 2
  //     };

  //     const expectedResult: ServiceResponse<Product> = {
  //       status: 'CREATED',
  //       data: {
  //         id: 3,
  //         name: 'pipoca',
  //         price: "5.00",
  //         userId: 2
  //       }
  //     };

  //     req.body = prod;
  //     sinon.stub(productService, 'create').resolves(expectedResult);

  //     const result = await productController.create(req, res);

  //     expect(res.status).to.be.calledWith(201);
  //     expect(res.json).to.be.calledWith(expectedResult);
  //   });

  //   // it('recupera todos os produtos', async function () {
  //   //   // Ajuste de acordo com a estrutura real esperada, considerando que o `id` é opcional em Product, mas provavelmente presente nos modelos Sequelize retornados
  //   //   interface ProductWithId extends Product {
  //   //     id: number;
  //   //   }
  //   //   const responseMock = {
  //   //     status: 'SUCCESSFUL',
  //   //     data: [
  //   //       {
  //   //         id: 1,
  //   //         name: 'pipoca',
  //   //         price: "5.00",
  //   //         userId: 2
  //   //       },
  //   //       {
  //   //         id: 2,
  //   //         name: 'coca',
  //   //         price: "2.00",
  //   //         userId: 2
  //   //       }
  //   //     ]
  //   //   } as unknown as ServiceResponse<ProductSequelizeModel[]>;

  //   //   // A função `resolves` é usada para simular uma resposta de sucesso da função `getAll`
  //   //   sinon.stub(productService, 'getAll').resolves(responseMock);

  //   //   // Chamada ao método do controlador que estamos testando
  //   //   await productController.getAll(req, res);

  //   //   // Verifica se os métodos `status` e `json` do objeto `res` foram chamados com os argumentos esperados
  //   //   expect(res.status).to.have.been.calledWith(200);
  //   //   expect(res.json).to.have.been.calledWith(responseMock);
  //   // });
  // });
})
