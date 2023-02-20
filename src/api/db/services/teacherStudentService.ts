import * as teacherDal from '../dal/teacher'
import * as studentDal from '../dal/student'
import * as teacherStudentDal from '../dal/teacherStudent'

export const register = async (teacher: string, students: string[]): Promise<any> => {
    const teacherId = Number((await teacherDal.create(teacher))[0].getDataValue('id'));
    for (let student of students){
        try{
            const studentId = (Number((await studentDal.create(student))[0].getDataValue('id')));
            await teacherStudentDal.create(teacherId, studentId);
        }
        catch (err) {
            continue;
        }
        
    }
}

export const findCommonStudent = async (name: string | string[]): Promise<{students: string[]}> => {
    const idList: number[] = []
    const result: {students: string[]} = {students: []};

    if (Array.isArray(name)){
        for (let n of name){
            const teacher = await teacherDal.getByName(n)
            if (teacher){
                idList.push(Number(teacher.get('id')));
            }
            else{
                return {students: []}; // Return empty as a non-existant teacher is selected in query
            }
        }
    }
    else{
        const teacher = await teacherDal.getByName(name)
        if (teacher){
            idList.push(Number(teacher.get('id')));
        }
    }

    const students = await teacherStudentDal.findCommonStudent(idList);
    students.forEach((student) => {
        result.students.push(student.getDataValue('student').getDataValue('name'));
    })

    return result;
}