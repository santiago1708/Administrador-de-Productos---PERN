import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger'
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

/* Documentacion */

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server 