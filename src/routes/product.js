const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

// CREATE -> POST
router.post('/product', productController.createProduct); 

router.put('/product', (req, res, next) => {
    res.json({name: 'Dudi Ali Murtado', email: 'dudiali79@mail.com'});
    next();
}); 

// READ -> GET
router.get('/product', productController.getProduct);

module.exports = router 