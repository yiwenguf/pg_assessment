import express, {Express} from 'express';
import { router } from './api/routers/route'
import { initDb } from './api/services/db';

const app: Express = express();
app.use(express.json());
app.use('/api', router);

initDb();

app.listen('3000', () => {
    console.log("Listening on port 3000");
})

export default app;