import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read():Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    return this._model.findOne({ _id });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    const document = await this._model
      .findByIdAndUpdate(_id, obj, { new: true }); // por padrao o metodo findByIdAndUpdate retorna o objeto ANTES da atualizao, podemos mudar isso com o parametro "new"
    return document;
  }

  public async delete(_id: string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    
    const document = await this._model.findByIdAndDelete({ _id });
    return document;
  }
}

export default MongoModel;