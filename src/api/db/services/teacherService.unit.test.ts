import Student from "../models/student";
import Teacher from "../models/teacher";
import { retrieveForNotification } from "./teacherService";

const teacherDal = require('../dal/teacher');
const studentDal = require('../dal/student');

describe('Retrieve for notification', () => { // Assuming studentjon is under teacherken
    it('Test with 1 message in front and 2 tags in notification', async() => {
        const mock = jest.spyOn(teacherDal, 'getByName');
        mock.mockImplementation((name) => {
            const teacher = new Teacher();
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name: 'studentjon@gmail.com'
            }
            teacher.dataValues = {
                students: [
                    student
                ]
            }
            return teacher;
        });

        const mock2 = jest.spyOn(studentDal, 'getByName');
        mock2.mockImplementation((name) => {
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name
            }
            return student;
        }); 


        const response = await retrieveForNotification(
            "teacherken@gmail.com",
             "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com");
        expect(response).toEqual([
            "studentjon@gmail.com", "studentagnes@gmail.com", "studentmiche@gmail.com"
        ]);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with 1 message at the back and 2 tags in notification', async() => {
        const mock = jest.spyOn(teacherDal, 'getByName');
        mock.mockImplementation((name) => {
            const teacher = new Teacher();
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name: 'studentjon@gmail.com'
            }
            teacher.dataValues = {
                students: [
                    student
                ]
            }
            return teacher;
        });

        const mock2 = jest.spyOn(studentDal, 'getByName');
        mock2.mockImplementation((name) => {
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name
            }
            return student;
        }); 


        const response = await retrieveForNotification(
            "teacherken@gmail.com",
             "@studentagnes@gmail.com @studentmiche@gmail.com Hello students!");
        expect(response).toEqual([
            "studentjon@gmail.com", "studentagnes@gmail.com", "studentmiche@gmail.com"
        ]);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with 2 message and 1 tags between messages in notification', async() => {
        const mock = jest.spyOn(teacherDal, 'getByName');
        mock.mockImplementation((name) => {
            const teacher = new Teacher();
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name: 'studentjon@gmail.com'
            }
            teacher.dataValues = {
                students: [
                    student
                ]
            }
            return teacher;
        });

        const mock2 = jest.spyOn(studentDal, 'getByName');
        mock2.mockImplementation((name) => {
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name
            }
            return student;
        }); 


        const response = await retrieveForNotification(
            "teacherken@gmail.com",
             "Hello @studentmiche@gmail.com, How are you today?");
        expect(response).toEqual([
            "studentjon@gmail.com", "studentmiche@gmail.com"
        ]);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with 1 message and no tags in notification', async() => {
        const mock = jest.spyOn(teacherDal, 'getByName');
        mock.mockImplementation((name) => {
            const teacher = new Teacher();
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name: 'studentjon@gmail.com'
            }
            teacher.dataValues = {
                students: [
                    student
                ]
            }
            return teacher;
        });

        const mock2 = jest.spyOn(studentDal, 'getByName');
        mock2.mockImplementation((name) => {
            const student = new Student();
            student.dataValues = {
                suspended: false,
                name
            }
            return student;
        }); 


        const response = await retrieveForNotification(
            "teacherken@gmail.com",
             "Hello students!");
        expect(response).toEqual([
            "studentjon@gmail.com"
        ]);

        mock.mockRestore();
        mock2.mockRestore();
    });
});