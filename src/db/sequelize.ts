import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  database: 'world-sport-action',
  username: 'hizqeel',
  password: process.env.PASSWORD,
  host: 'localhost',
  dialect: 'postgres',
  models: [__dirname + '/src/models']
});

export default sequelize;
