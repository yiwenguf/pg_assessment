import { Sequelize } from 'sequelize'

const sequelizeConnection = new Sequelize('pg_db', 'root', 'root', {
    host: '0.0.0.0',
    dialect: 'mysql'
});

export default sequelizeConnection;