import { body } from 'express-validator';
import { Request, Response } from 'express'
import Product from '../models/Product.model'


export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        res.send({ data: products })
    } catch (error) {
        console.log(error)
    }
}

export const getProductsById = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        if (!product) {
            res.status(404).send({ message: 'Product not found' })
            return
        }

        res.send({ data: product });

    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.send({ data: product })
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    /* Consultar si existe */
    const { id } = req.params
    const product = await Product.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })

    if (!product) {
        res.status(404).send({ message: 'Product not found' })
        return
    }

    /* Actualizar */
    await product.update(req.body)
    await product.save()


    res.send({ data: product });
}

export const updateAvailability = async (req: Request, res: Response) => {
    /* Consultar si existe */
    const { id } = req.params
    const product = await Product.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })

    if (!product) {
        res.status(404).send({ message: 'Product not found' })
        return
    }

    /* Actualizar */
    product.availability = !product.dataValues.availability
    await product.save()


    res.send({ data: product });
}

export const deleteProduct = async (req: Request, res: Response) => {
    /* Consultar si existe */
    const { id } = req.params
    const product = await Product.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })

    if (!product) {
        res.status(404).send({ message: 'Product not found' })
        return
    }

    await product.destroy()
    res.send({ data: 'Product deleted successfully' });
}