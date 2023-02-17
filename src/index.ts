import express, {Express, NextFunction} from 'express';
import dbInit from './api/db/init';
import { apiRouter } from './api/routes/api'
import errorMiddleware from './error.middleware';

dbInit();

const app: Express = express();
app.use(express.json());
app.use('/api', apiRouter);
app.use(errorMiddleware);

app.listen('3000', () => {
    console.log("Listening on port 3000");
})


export default app;