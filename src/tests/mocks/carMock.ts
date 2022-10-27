import { ICar } from "../../interfaces/ICar";

const carMock:ICar = {
  status: true,
  model: 'Mitsubishi Eclipse',
  year: 2004,
  color: 'Silver',
  buyValue: 100.000,
  doorsQty: 2,
  seatsQty: 2,
};

const carMockWithId:ICar & { _id:string } ={
  _id: '62cf1fc6498565d94eba52cd',
  status: true,
  model: 'Mitsubishi Eclipse',
  year: 2004,
  color: 'Silver',
  buyValue: 100.000,
  doorsQty: 2,
  seatsQty: 2,
};

const carMockArrayWithId:typeof carMockWithId[] = [
  {
    _id: '62cf1fc6498565d94eba52cd',
    status: true,
    model: 'Mitsubishi Eclipse',
    year: 2004,
    color: 'Silver',
    buyValue: 100.000,
    doorsQty: 2,
    seatsQty: 2,
},
{
  _id: '61af1fc6498565d94eba52cb',
  status: true,
  model: 'Mitsubishi 3000GT',
  year: 2005,
  color: 'Red',
  buyValue: 150.000,
  doorsQty: 2,
  seatsQty: 2,
},
];

export { carMock, carMockWithId, carMockArrayWithId };