import 'dotenv/config';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';

import testRouter from './routes/testRouter';
import userRouter from './routes/userRouter';

// Server Class
class Server {
    // Express App 필드 선언
    public app: Application;

    // 생성자
    constructor() {
        this.app = express();
        this.connectDB();
        this.config();
        this.routes();
    }

    // DB 연결
    public connectDB(): void {
        const MONGO_URI = 'null';
        mongoose.set('useFindAndModify', false);
        const connect = () => {
            mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
                dbName : 'typescript',
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }, (error) => {
                if (error) {
                    console.log('몽고디비 연결 에러', error);
                } else {
                    console.log('몽고디비 연결 성공');
                }
            });
        };
        connect();
        mongoose.connection.on('error', (error) => {
            console.log('몽고디비 연결 에러', error);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
            connect();
        });
    }

    // 기본 서버 설정 및 미들웨어 
    public config(): void {
        // Settings
        this.app.set('port', process.env.PORT || 3000);

        // middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    // 라우터
    public routes(): void {
        this.app.use('/test', testRouter);
        this.app.use('/user', userRouter);
    }

    // 서버 구동
    public start(): void {
        this.app.use(errorHandler());
        this.app.listen(this.app.get('port'), () => {
            console.log(`  App is running at http://localhost:${this.app.get('port')}`);
            console.log('  Press CTRL-C to stop\n');
        });
    }
}

const server = new Server();
server.start();