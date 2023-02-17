import Student from "../models/student"

export const create = (student: string): Promise<[Student,boolean]> => {
    try{
        return Student.findOrCreate({ 
            where: {name: student}
        });
    }
    catch (err){
        console.log(err);
        throw(err);
    }
}

export const getByName = (name: string): Promise<Student | null> => {
    try{
        return Student.findOne({
            where: {
                name: name
            }
        });
    }
    catch (err){
        throw(err);
    }
}

export function suspendStudent(name: string): Promise<[number]>{
    try{
        return Student.update(
            {suspended: true},
            {where: {name}}
        );
    }
    catch(err){
        console.log(err);
        throw(err);
    }
}