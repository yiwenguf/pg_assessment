import express, {Express} from 'express';
import { router } from './api/routers/route'

const app: Express = express();
app.use(express.json());
app.use('/api', router);

app.listen('3000', () => {
    console.log("Listening on port 3000");
})

export default app;