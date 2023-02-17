import Student from "./models/student";
import Teacher from "./models/teacher";
import TeacherStudent from "./models/teacherStudent";

const dbInit = async() => Promise.all([
    await Teacher.sync(),
    await Student.sync(),
    await TeacherStudent.sync()
]);

export default dbInit;