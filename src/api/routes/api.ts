import * as controller from '../controller';
import { Router } from 'express';

export const apiRouter = Router();

apiRouter.post('/register',(req, res) => controller.register(req,res));
apiRouter.get('/commonstudents', (req, res) => controller.retrieveStudents(req,res));
apiRouter.post('/suspend', (req, res) => controller.suspendStudent(req,res));
apiRouter.post('/retrievefornotifications', (req, res) =>controller.retrieveStudentsForNotification(req,res));
