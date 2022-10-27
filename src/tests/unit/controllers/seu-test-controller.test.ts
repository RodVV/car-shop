import { expect } from 'chai';
import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import Car from '../../../models/Car'
import { carMock, carMockWithId, carMockArrayWithId } from '../../mocks/carMock';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';

describe('Car Services', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {     
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(()=>{
    sinon.restore();
  })

  describe('create new car', () => {
		it('successfully created', async () => {
      req.body = carMock;
      sinon.stub(carService, 'create').resolves(carMock);
      await carController.create(req, res);

			const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
		});
	});
});