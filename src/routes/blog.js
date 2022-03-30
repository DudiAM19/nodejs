const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const blogController = require('../controllers/blog');

router.post('/post', [
    body('title').isLength({min: 5}).withMessage("input title anda kurang dari 5 huruf"),
    body('body').isLength({min: 5}).withMessage("input body anda kurang dari 5 huruf")
    ], 
    blogController.createBlog);

router.get('/posts', blogController.getBlog);
router.get('/post/:postId', blogController.getBlogById);
router.put('/post/:postId', [
    body('title').isLength({min: 5}).withMessage("input title anda kurang dari 5 huruf"),
    body('body').isLength({min: 5}).withMessage("input body anda kurang dari 5 huruf")
    ], 
    blogController.updateBlog);

module.exports = router;