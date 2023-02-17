import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'

class Student extends Model {}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    suspended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    sequelize: sequelizeConnection,
    modelName: 'student'
});

export default Student;