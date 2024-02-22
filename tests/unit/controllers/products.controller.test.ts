import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';
import { ProductSequelizeModel } from '../../../src/database/models/product.model';
import ProductModel from '../../../src/database/models/product.model';
chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('Product Controller', function () {
    it('Cadastrar um produto', async function() {
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

    it('deve recuperar todos os produtos', async function() {
      // Dados mockados que simulam o retorno do ProductModel.findAll
      const mockedProducts = [
        ProductModel.build({ id: 1, name: 'Produto 1', price: '10.00', userId: 1 }),
        ProductModel.build({ id: 2, name: 'Produto 2', price: '20.00', userId: 2 }),
      ];
  
      // Criando um stub para o método findAll do modelo ProductModel
      sinon.stub(ProductModel, 'findAll').resolves(mockedProducts);
  
      // Chamada ao método getAll do serviço
      const result = await productService.getAll();
  
      // Verifica se o resultado tem o status 'SUCCESSFUL'
      expect(result.status).to.equal('SUCCESSFUL');
      // Verifica se os dados retornados são iguais aos dados mockados
      expect(result.data).to.deep.equal(mockedProducts);
    });
  })
})
