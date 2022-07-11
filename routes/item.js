const path = require("path");
const { Router } = require('express');
const itemController = require(path.resolve('./controllers/itemControllers'));
const router = Router();

router.get('/items', itemController.get_items);
router.get('/item/:id',itemController.get_item)
router.post('/items',itemController.post_item);
router.put('/items/:id',itemController.update_item);
router.delete('/items/:id',itemController.delete_item);

module.exports = router;