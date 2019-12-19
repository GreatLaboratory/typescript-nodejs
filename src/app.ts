import express, { Application } from 'express';

import testRouter from './router/testRouter';

const app: Application = express();

app.set("port", process.env.PORT || 3000);
app.set('env', process.env.MODE || 'dev');

// TEST 라우터
app.use('/test', testRouter);

export default app;