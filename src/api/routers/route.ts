import {registerStudent, retrieveStudents, retrieveStudentsForNotification, suspendStudent} from '../controller/controller';
import express from 'express';

export const router = express.Router();

router.post('/register', (req, res) => registerStudent(req,res));
router.get('/commonstudents', (req, res) => retrieveStudents(req,res));
router.post('/suspend', (req, res) => suspendStudent(req,res));
router.post('/retrievefornotifications', (req, res) => retrieveStudentsForNotification(req,res));
