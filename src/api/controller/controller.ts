import { Request, Response } from "express";
import { getNonSuspendedStudents, getStudentByName, getStudents, postStudents, updateSuspendStudent } from "../services/db";

export async function registerStudent(req: any, res: any){
    try{
        if (req.body && req.body.teacher && req.body.students){
            await postStudents(req.body.teacher, req.body.students);
            res.status(204).send('Success');
        }
        else{
            res.status(400).send('Invalid content in the request body');
        }
        
    }
    catch(err){
        res.status(400).send(err);
    }
}

export async function retrieveStudents(req: any, res: any){
    try{
        const result: string[] = [];
        if (req.query && req.query.teacher){
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
        else{
            res.status(400).send("Missing queries");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}

export async function suspendStudent(req: any, res: any){
    try{
        if (req.body && req.body.student){
            await updateSuspendStudent(req.body.student);
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

export async function retrieveStudentsForNotification(req: any, res: any){
    try{
        if (req.body && req.body.teacher && req.body.notification){
            const strings: string[] = req.body.notification.split('@');
            const taggedStudents: string[] = [];
            const result: string[] = [];

            strings.forEach((s => {
                if (String(s).includes(".com")){
                    if (!String(s).trim().endsWith('.com')){
                        taggedStudents.push(strings[strings.indexOf(s)-1].concat('@').concat(s.split('.com')[0].concat('.com')));
                    }
                    else{
                        taggedStudents.push(strings[strings.indexOf(s)-1].concat('@').concat(strings[strings.indexOf(s)]).trim());
                    }
                }
            }))

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
        else{
            res.status(400).send('Invalid content in the request body');
        }
    }
    catch(err){
        res.status(400).send(err);
    }
    
}




