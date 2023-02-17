import { Sequelize } from "sequelize";
import Student from "../models/student"
import Teacher from "../models/teacher";
import TeacherStudent from "../models/teacherStudent";

export const create = (teacherId: number, studentId: number): Promise<TeacherStudent> => {
    try{
        return TeacherStudent.create({ 
            teacherId,
            studentId
        });
    }
    catch (err){
        console.log(err);
        throw(err);
    }
}

export const findCommonStudent = (id: number[]): Promise<TeacherStudent[]> => {
    try{
        return TeacherStudent.findAll({
            attributes: ["studentId", [Sequelize.fn('count', Sequelize.col('teacherId')) ,'user_count']],
            where: {
                teacherId: id
            },
            group: "studentId",
            having: Sequelize.literal(`count(teacherId) = ${id.length}`),
            include: Student
        });
    }
    catch (err){
        throw(err);
    }
}