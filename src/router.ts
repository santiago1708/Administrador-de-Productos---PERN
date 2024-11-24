import { Router } from 'express'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()


/* Routing */

router.get('/', getProducts)
router.get('/:id',
    param('id')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById
)
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
router.put('/:id',
    param('id')
        .isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage("el nombre del producto no puede ir vacio"),
    body('price').custom((value) => value > 0).withMessage("precio no valido")
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("el precio del producto no puede ir vacio"),
    body('availability').isBoolean().withMessage("Valor para disponibilidad no valido"),
    handleInputErrors,
    updateProduct
)
router.patch('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)
router.delete('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router