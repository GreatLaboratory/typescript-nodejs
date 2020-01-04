import { Router } from 'express';
import { login, logout, signup  } from '../controllers/authController';
import { isLoggedIn, isNotLoggedIn } from '../controllers/middleWares';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.post('/signup', isNotLoggedIn, signup);
        this.router.post('/login', isNotLoggedIn, login);
        this.router.get('/logout', isLoggedIn, logout);
    }
}

const userRouter = new UserRouter();

export default userRouter.router;