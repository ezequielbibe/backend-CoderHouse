import express from 'express'
import { productControllerGet, productControllerPost, productControllerPut, productControllerDelete } from './controllers/productsController.js'

const router = express.Router()

router.get('/:id?', productControllerGet)
router.post('/', productControllerPost)
router.put('/:id', productControllerPut)
router.delete('/:id', productControllerDelete)

export default router