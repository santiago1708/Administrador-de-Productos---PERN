import { Sequelize } from "sequelize";
import Dotenv from 'dotenv'

Dotenv.config()


const db = new Sequelize(process.env.DATABASE_URL)

export default db

