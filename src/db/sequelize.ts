import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'world-sport-action',
  username: 'hizqeel',
  password: 'postgres',
  host: 'localhost',
  dialect: 'postgres',
  models: [__dirname + '/src/models']
});

export default sequelize;
