import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import Student from './student'
import Teacher from './teacher'

class TeacherStudent extends Model {}

TeacherStudent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
},{
    sequelize: sequelizeConnection,
    modelName: 'teacherStudent'
});

Student.belongsToMany(Teacher, { through: TeacherStudent });
Teacher.belongsToMany(Student, { through: TeacherStudent });
TeacherStudent.belongsTo(Student);
TeacherStudent.belongsTo(Teacher);

export default TeacherStudent;