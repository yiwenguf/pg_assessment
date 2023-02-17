import Student from "../models/student";
import Teacher from "../models/teacher"

export const create = (teacher: string): Promise<[Teacher,boolean]> => {
    try{
        return Teacher.findOrCreate({ 
            where: {name: teacher}
        });
    }
    catch (err){
        console.log(err);
        throw(err);
    }
}

export const getByName = (name: string): Promise<Teacher | null> => {
    try{
        return Teacher.findOne({
            where: {
                name: name
            },
            include: Student
        });
    }
    catch (err){
        throw(err);
    }
}
