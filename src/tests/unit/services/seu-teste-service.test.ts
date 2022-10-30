import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import Car from '../../../models/Car'
import { carMock, carMockWithId, carMockArrayWithId } from '../../mocks/carMock';
import CarService from '../../../services/Car';
import { ErrorTypes } from '../../../middlewares/errorTypes';

describe('Car Services', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);

  afterEach(()=>{
    sinon.restore();
  })

  describe('create new car', () => {
		it('successfully created', async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
			const newCar = await carService.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('read all cars', () => {
		it('successfully read', async () => {
      sinon.stub(carModel, 'read').resolves(carMockArrayWithId);
			const getCars = await carService.read();
			expect(getCars).to.be.deep.equal(carMockArrayWithId);
		});
	});

  describe('read car by id', () => {
		it('successfully read', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMockWithId);
			const getCar = await carService.readOne(carMockWithId._id);
			expect(getCar).to.be.deep.equal(carMockWithId);
		});
    it('failed to read: not found', async () => {
      let error;
      sinon.stub(carModel, 'readOne').resolves(null);
      try {
        await carService.readOne(carMockWithId._id);        
      } catch (err: any) {
        error = err;
      }
      expect(error?.error).to.be.deep.equal(ErrorTypes.EntityNotFound);        
		});
	});
});