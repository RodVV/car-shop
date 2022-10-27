import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import Car from '../../../models/Car'
import { carMock, carMockWithId, carMockArrayWithId } from '../../mocks/carMock';
import CarService from '../../../services/Car';

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
});