import express, { Router } from 'express';
import { test } from '../controllers/testController';

const testRouter: Router = express.Router();

testRouter.get('/', test);

export default testRouter;