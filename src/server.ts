import express from 'express'
import router from './router'
import db from './config/db'

/* Conect to DB */
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log("DB is connected");
    } catch (error) {
        console.log(error)
        console.log("Error al conectar a la BD");
        
    }
}

connectDB()


const server = express()
server.use('/api/products', router)


export default server 