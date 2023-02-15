import { Request, Response } from "express";
import { getNonSuspendedStudents, getStudentByName, getStudents, postNewStudent, postSuspendStudent } from "../services/db";

export async function registerStudent(req: Request, res: Response){
    try{
        if (req.body && req.body.teacher && req.body.students){
            await postNewStudent(req.body);
            res.status(204).send();
        }
        else{
            res.status(400).send('Invalid content in the request body');
        }
        
    }
    catch(err){
        res.status(400).send(err);
    }
}

export async function retrieveStudents(req: Request, res: Response){
    try{
        const result: string[] = [];
        let query = req.query.teacher;

        if (Array.isArray(query)){
            for (let q of query){
                const students = await getStudents(String(q));
                students.forEach((student) => {
                    result.push(String(student.get("student_name")));
                })
            }
        }
        else{
            const students = await getStudents(String(query));
            students.forEach((student) => {
                result.push(String(student.get("student_name")));
            })
        }

        res.status(200).send({students: result});
    }
    catch(err){
        res.status(400).send(err);
    }
}

export async function suspendStudent(req: Request, res: Response){
    if (req.body && req.body.student){
        await postSuspendStudent(req.body.student)
        .then(() => res.status(204).send())
        .catch((err) => res.status(400).send(err));
    }
    else{
        res.status(400).send('Invalid content in the request body');
    }
}

export async function retrieveStudentsForNotification(req: Request, res: Response){
    if (req.body && req.body.teacher && req.body.notification){
        const taggedStudents: string[] = req.body.notification.split(' @');
        const result: string[] = [];
    
        taggedStudents.shift(); //Remove the message, assuming tags always comes after the message
    
        await getNonSuspendedStudents(req.body.teacher).then((students) => {
            students.forEach(student => {
                result.push(String(student.get("student_name")));
            })
        });
    
        for (let tag of taggedStudents){
            const student = await getStudentByName(tag);
            if (student)
                result.push(String(student.get("student_name")));
        };
    
        res.status(200).send({recipients: result});
    }

    
}




