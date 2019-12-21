import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/list', getUsers);
        this.router.get('/:id', getUser);
        this.router.post('/', createUser);
        this.router.put('/:id', updateUser);
        this.router.delete('/:id', deleteUser);
    }
}

const userRouter = new UserRouter();

export default userRouter.router;