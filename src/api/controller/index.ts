import { Request, Response } from "express";
import * as teacherStudentService from '../db/services/teacherStudentService';
import * as studentService from '../db/services/studentService';
import * as teacherService from '../db/services/teacherService';

export async function register(req: Request, res: Response){
    try{
        if (req.body && req.body.teacher && req.body.students){
            await teacherStudentService.register(req.body.teacher, req.body.students);
            res.status(204).send();
        }
        else{
            res.status(400).send({message: 'Invalid content in the request body'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Something went wrong'});
    }
}

export async function retrieveStudents(req: any, res: any){
    try{
        if (req.query && req.query.teacher){
            const response = await teacherStudentService.findCommonStudent(req.query.teacher);
            res.status(200).send(response);
        }
        else{
            res.status(400).send({message: 'Invalid content in the request query'});
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Something went wrong'});
    }
}

export async function suspendStudent(req: any, res: any){
    try{
        if (req.body && req.body.student){
            const response = await studentService.suspendStudent(req.body.student);
            res.status(204).send();
        }
        else{
            res.status(400).send({message: 'Invalid content in the request body'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Something went wrong'});
    }
}

export async function retrieveStudentsForNotification(req: any, res: any){
    try{
        if (req.body && req.body.teacher && req.body.notification){
            const result = await teacherService.retrieveForNotification(req.body.teacher, req.body.notification);
            res.status(200).send({recipients: result});
        }
        else{
            res.status(400).send({message: 'Invalid content in the request body'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Something went wrong'});
    }
    
}




