import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express, { Application } from 'express';
import flash from 'express-flash';
import helmet from 'helmet';
import mongo, { MongoStoreFactory } from 'connect-mongo';
import mongoose, { Error } from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';

import { passportConfig } from './passport';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import testRouter from './routes/testRouter';

// Server Class
class Server {
    // Express App 필드 선언
    private app: Application;
    private mongo_uri: string = process.env.MONGO_URI || 'mongodb://{username}:{password}@localhost:{port}';
    private session_secret: string = process.env.SESSION_SECRET || 'NULL';

    // 생성자
    constructor() {
        this.app = express();
        this.connectDB();
        passportConfig(passport);
        this.config();
        this.routes();
    }

    // DB 연결
    private connectDB(): void {
        const connect = async () => {
            await mongoose.connect(this.mongo_uri, {
                dbName : 'typescript',
                useFindAndModify: false,
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }, (error: Error) => {
                if (error) { console.error('몽고디비 연결 에러', error); }
                else { console.log('몽고디비 연결 성공'); }
            });
        };
        connect();
        mongoose.connection.on('error', (error: Error) => {
            console.log('몽고디비 연결 에러', error);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
            connect();
        });
    }

    // 기본 서버 설정 및 미들웨어 
    private config(): void {
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        const MongoStore: MongoStoreFactory = mongo(session);

        // middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(session({
            resave: true,
            saveUninitialized: false,
            secret: this.session_secret,
            store: new MongoStore({
                mongooseConnection: mongoose.connection
            })
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
    }

    // 라우터
    private routes(): void {
        this.app.use('/auth', authRouter);
        this.app.use('/user', userRouter);
        this.app.use('/test', testRouter);
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

const server: Server = new Server();
server.start();