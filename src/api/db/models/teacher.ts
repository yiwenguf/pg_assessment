import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'

class Teacher extends Model {}

Teacher.init({
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
    }
},{
    sequelize: sequelizeConnection,
    modelName: 'teacher'
});

export default Teacher;