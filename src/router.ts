import { Router } from 'express'
import { createProduct, getProducts } from './handlers/product'
import { body } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()


/* Routing */

router.get('/', getProducts)
router.post('/',
    /* Validacion */
    body('name')
        .notEmpty().withMessage("el nombre del producto no puede ir vacio"),
    body('price').custom((value) => value > 0).withMessage("precio no valido")
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("el precio del producto no puede ir vacio"),
        handleInputErrors,
    createProduct
)
router.put('/', (req, res) => {
    res.send('Hola mundo en put')
})
router.patch('/', (req, res) => {
    res.send('Hola mundo en patch')
})
router.delete('/', (req, res) => {
    res.send('Hola mundo en delete')
})

export default router