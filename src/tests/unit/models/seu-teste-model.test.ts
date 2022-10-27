import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import Car from '../../../models/Car'
import { carMock, carMockWithId, carMockArrayWithId } from '../../mocks/carMock';

describe('Car Models', () => {
  const carModel = new Car();

  afterEach(()=>{
    sinon.restore();
  })

  describe('create new car', () => {
		it('successfully created', async () => {
      sinon.stub(mongoose.Model, 'create').resolves(carMockWithId);
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});
  describe('read all', () => {
		it('successfully read', async () => {
      sinon.stub(mongoose.Model, 'find').resolves(carMockArrayWithId);
			const read = await carModel.read();
			expect(read).to.be.deep.equal(carMockArrayWithId);
		});
	});
  describe('read one', () => {
		it('successfully found', async () => {
      sinon.stub(mongoose.Model, 'findOne').resolves(carMockWithId);
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
			const read = await carModel.readOne('any-id');
			expect(read).to.be.deep.equal(carMockWithId);
		});
    it('id not found', async () => {
      let catchError: any;
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
			try {
				await carModel.readOne('invalid-id');
			} catch (error: any) {
        catchError = error;
      }
      expect(catchError?.message).to.be.eq('InvalidMongoId');
		});
	});

});