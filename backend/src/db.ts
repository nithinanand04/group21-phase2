import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config()
const DB_NAME = process.env.DB_NAME ?? ''
const DB_USER = process.env.DB_USER ?? ''
const DB_PASS = process.env.DB_PASS ?? ''
const DB_HOST = process.env.DB_HOST ?? ''

console.log("DB_NAME:", DB_NAME);
console.log("DB_USER:", DB_USER);
console.log("DB_PASS:", DB_PASS ? "******" : "not set"); // Mask password for security
console.log("DB_HOST:", DB_HOST);

export const sequelize = new Sequelize( DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: 5432,
  dialect: 'postgres'
});

export default sequelize;