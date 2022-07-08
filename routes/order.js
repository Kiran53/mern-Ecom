const {Router}=require('express')
const orderC=require('../controllers/orderControllers')
const router=Router()

router.get('/order/:id',orderC.get_orders)
router.post('order/:id',orderC.checkout)

module.exports=router