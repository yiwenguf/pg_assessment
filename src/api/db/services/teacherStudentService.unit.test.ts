import Student from "../models/student";
import Teacher from "../models/teacher";
import TeacherStudent from "../models/teacherStudent";
import { findCommonStudent, register } from "./teacherStudentService";

const teacherDal = require('../dal/teacher');
const studentDal = require('../dal/student');
const teacherStudentDal = require('../dal/teacherStudent');

describe('Register', () => {
    it('Testing the flow of adding to 3 tables', async() => {
        const mock = jest.spyOn(teacherDal, 'create');
        mock.mockImplementation(() : Promise<[Teacher,boolean]> => {
            const teacher = new Teacher();
            teacher.dataValues = {
                id: 1
            };

            return Promise.resolve([teacher, true]);
        });

        const mock2 = jest.spyOn(studentDal, 'create');
        mock2.mockImplementation(() : Promise<[Teacher,boolean]> => {
            const student = new Student();
            student.dataValues = {
                id: 1
            };

            return Promise.resolve([student, true]);
        });

        const mock3 = jest.spyOn(teacherStudentDal, 'create');
        mock3.mockImplementation(() : Promise<TeacherStudent> => {
            const teacherStudent = new TeacherStudent();
            return Promise.resolve(teacherStudent);
        });

        const response = await register("teacherkenny@gmail.com",
        [
            "studentjon@gmail.com",
            "studenthon@gmail.com"
        ]);

        expect(response).toBeUndefined();

        mock.mockRestore();
        mock2.mockRestore();
        mock3.mockRestore();
    });
});

describe('Find common student', () => {
    it('Using an array of string as input and returning 2 students', async() => {
        const mock = jest.spyOn(teacherDal, 'getByName');
        mock.mockImplementationOnce(async() : Promise<Teacher | null> => {
            const teacher = new Teacher();
            teacher.dataValues = {
                id: 1
            };

            return Promise.resolve(teacher);
        });
        mock.mockImplementationOnce(async() : Promise<Teacher | null> => {
            const teacher = new Teacher();
            teacher.dataValues = {
                id: 2
            };

            return Promise.resolve(teacher);
        });

        const mock2 = jest.spyOn(teacherStudentDal, 'findCommonStudent');
        mock2.mockImplementation(() => {
            const teacherStudent = new TeacherStudent();
            const s = new Student();
            s.dataValues = {
                name: 'studentjon@gmail.com'
            }
            teacherStudent.dataValues = {
                student: s
            }

            const teacherStudent2 = new TeacherStudent();
            const s2 = new Student();
            s2.dataValues = {
                name: 'studentjane@gmail.com'
            }
            teacherStudent2.dataValues = {
                student: s2
            }

            return Promise.resolve([teacherStudent, teacherStudent2]);
        });

        const response = await findCommonStudent(["teacherken@gmail.com","teacherbob@gmail.com"]);
        expect(response).toEqual({students: ['studentjon@gmail.com', 'studentjane@gmail.com']});

    });
    it('Using one string as input and returning 2 students', async() => {
        const mock = jest.spyOn(teacherDal, 'getByName');
        mock.mockImplementation(async() : Promise<Teacher | null> => {
            const teacher = new Teacher();
            teacher.dataValues = {
                id: 1
            };

            return Promise.resolve(teacher);
        });

        const mock2 = jest.spyOn(teacherStudentDal, 'findCommonStudent');
        mock2.mockImplementation(() => {
            const teacherStudent = new TeacherStudent();
            const s = new Student();
            s.dataValues = {
                name: 'studentjon@gmail.com'
            }
            teacherStudent.dataValues = {
                student: s
            }

            const teacherStudent2 = new TeacherStudent();
            const s2 = new Student();
            s2.dataValues = {
                name: 'studentjane@gmail.com'
            }
            teacherStudent2.dataValues = {
                student: s2
            }

            return Promise.resolve([teacherStudent, teacherStudent2]);
        });

        const response = await findCommonStudent("teacherken@gmail.com");
        expect(response).toEqual({students: ['studentjon@gmail.com', 'studentjane@gmail.com']});

    });
});