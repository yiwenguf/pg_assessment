import * as studentDal from '../dal/student';
import * as teacherDal from '../dal/teacher'
import Student from '../models/student';

export async function retrieveForNotification(name: string, notification: string): Promise<string[]>{
    const result: string[] = [];

    const teacher = await teacherDal.getByName(name);
    const students: Student[] = teacher?.getDataValue('students');

    if (students){
        students.forEach(student => {
            if (!Boolean(student.getDataValue('suspended'))){
                result.push(student.getDataValue('name'));
            }
        })
    }
        
    const match = notification.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    if (match){
        for (let email of match){
            const student = await studentDal.getByName(email);
            if (student){
                if (!Boolean(student.getDataValue('suspended'))){
                    result.push(student.getDataValue('name'));
                }
            }
            
        }
    }
    
    return result;
}