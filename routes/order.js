const {Router}=require('express')
const path = require("path");
const orderC=require(path.resolve('./controllers/orderControllers'))
const router=Router()

router.get('/order/:id',orderC.get_orders)
router.post('order/:id',orderC.checkout)

module.exports=router