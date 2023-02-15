import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('pg_db', 'root', 'password', {
    host: '0.0.0.0',
    dialect: 'mysql'
});

let teacherStudentTable = sequelize.define('teacher_students', {
    teacher_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    is_suspended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

teacherStudentTable.sync();

export async function postNewStudent(content: {teacher: string, students: string[]}){
    const transaction = await sequelize.transaction();
    try{
        for (let student of content.students){
            await teacherStudentTable.create({
                teacher_name: content.teacher,
                student_name: student
            }, {transaction});
        }
        await transaction.commit();
    }
    catch (err){
        await transaction.rollback();
        throw(err);
    }
}

export function getStudents(teacherName: string){
    try{
        return teacherStudentTable.findAll({where: {
            teacher_name: teacherName,
        }});
    }
    catch (err){
        throw(err);
    }
}

export function getNonSuspendedStudents(teacherName: string){
    try{
        return teacherStudentTable.findAll({where: {
            teacher_name: teacherName,
            is_suspended: false
        }});
    }
    catch (err){
        throw(err);
    }
}

export function getStudentByName(studentName: string){
    try{
        return teacherStudentTable.findOne({where: {
            student_name: studentName,
            is_suspended: false
        }});
    }
    catch (err){
        throw(err);
    }
}

export function postSuspendStudent(studentName: string){
    return teacherStudentTable.update(
        {is_suspended: true},
        {where: {student_name: studentName}}
    );
}
