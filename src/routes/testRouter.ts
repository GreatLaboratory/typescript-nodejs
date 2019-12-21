import { Router } from 'express';
import { test } from '../controllers/testController';

class TestRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', test);
    }
}

const testRouter = new TestRouter();

export default testRouter.router;