import request from "supertest";
import server, {connectDB} from "../server";
import db from "../config/db";


describe('GET/api', () => {
    it('should send back a json response', async () => {
        const response = await request(server).get('/api')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.msg).toBe('Desde API')

        /* Not */
        expect(response.status).not.toBe(404)
        expect(response.body.msg).not.toBe('desde api')
    })
})

jest.mock('../config/db')

describe('connectDB', () => {
    it('should hanle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error al conectar a la BD')
        )
    })
})