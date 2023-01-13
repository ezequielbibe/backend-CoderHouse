import express from 'express'
import { cartControllerGet, cartControllerDelete, cartControllerGetProducts, cartControllerPostProduct, cartControllerDeleteProduct} from './controllers/cartController.js'

const router = express.Router()

router.get('/', cartControllerGet)
router.delete('/:id', cartControllerDelete)
router.get('/:id/products', cartControllerGetProducts)
router.post('/:id/products', cartControllerPostProduct)
router.delete('/:id/products/:id_prod', cartControllerDeleteProduct)

export default router