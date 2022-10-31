import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
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
    // it('failed to read: not found', async () => {
    //   let error;
    //   sinon.stub(carModel, 'readOne').resolves(null);
    //   try {
    //     await carService.readOne(carMockWithId._id);        
    //   } catch (err: any) {
    //     error = err;
    //   }
    //   expect(error?.error).to.be.deep.equal(ErrorTypes.EntityNotFound);        
		// });
	});

  describe('Update car', () => {
		it('successfully updated', async () => {
			sinon.stub(carModel, 'update').resolves(carMockWithId);

			const updated = await carService.update('any-id', carMock);
			expect(updated).to.be.deep.eq(carMockWithId);
			sinon.restore();
		});

		it('Failed to update - Zod', async () => {
			let error;
			try {
				await carService.update('any-id', {});				
			} catch (err) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});

		it('Failed to update - car not found', async () => {
			sinon.stub(carModel, 'update').resolves(null);
			let error: any;
			try {
				await carService.update('any-id', carMock);				
			} catch (err) {
				error = err;
			}
			expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound);
		});
	});

  describe('delete car', () => {
		it('successfully deleted', async () => {
      sinon.stub(carModel, 'delete').resolves(carMockWithId);
			const deleted = await carService.delete(carMockWithId._id);
			expect(deleted).to.be.deep.eq(carMockWithId);
			sinon.restore();
		});
    it('failed to delete', async () => {
      sinon.stub(carModel, 'delete').resolves(null);
      try {
        await carService.delete(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.deep.eq(ErrorTypes.EntityNotFound);        
      }
			sinon.restore();
		});
	});
});