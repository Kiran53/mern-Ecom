const path = require("path");
const { Router } = require('express');
const cartController = require(path.resolve('./controllers/cartControllers'));
const router = Router();

router.get('/cart/:id',cartController.get_cart_items);
router.post('/cart/:id',cartController.add_cart_item);
router.delete('/cart/:userId/:itemId',cartController.delete_item);
router.patch('/cart/:id',cartController.update_cart_item);

module.exports = router;