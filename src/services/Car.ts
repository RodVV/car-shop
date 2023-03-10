import { IService } from '../interfaces/IService';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../middlewares/errorTypes';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async read():Promise<ICar[]> {
    const car = await this._car.read();
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (_id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const updated = await this._car.update(_id, parsed.data);
    if (!updated) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return updated;
  }

  public async delete(_id: string): Promise<ICar> {
    const deleted = await this._car.delete(_id);
    if (!deleted) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return deleted;
  }
}

export default CarService;