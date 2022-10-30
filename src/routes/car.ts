import { Router } from 'express';
import CarController from '../controllers/Car';
import Car from '../models/Car';
import CarService from '../services/Car';

const carRoute = Router();

const car = new Car();
const carService = new CarService(car);
const carController = new CarController(carService);

carRoute.post('/cars', (req, res) => carController.create(req, res));
carRoute.get('/cars', (req, res) => carController.read(req, res));
carRoute.get('/cars/:id', (req, res) => carController.readOne(req, res));

export default carRoute;