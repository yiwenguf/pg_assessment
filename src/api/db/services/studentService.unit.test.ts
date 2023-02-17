import { suspendStudent } from "./studentService";

const studentDal = require('../dal/student');

describe('Suspend a student', () => {
    it('Sql executed successfully, return 1', async() => {
        const mock = jest.spyOn(studentDal, 'suspendStudent');
        mock.mockImplementation(() => {
            return Promise.resolve([1]);
        });

        const response = await suspendStudent("studentjon@gmail.com");
        expect(response).toEqual([1]);

        mock.mockRestore();
    });
});