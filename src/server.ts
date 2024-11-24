import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

/* Conect to DB */
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        /* console.log(colors.yellow.bold("DB is connected")); */
    } catch (error) {
        /* console.log(error) */
        console.log(colors.red.bold.italic("Error al conectar a la BD"))
    }
}

connectDB()

/* Instancia de express */
const server = express()

/* Leer datos de formularios */

server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.send({msg: "Desde API"})
})

export default server 