const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog')

exports.createBlog = (req,res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        const err = new Error("invalid Value");
        err.errorStatus = 400;
        err.data = error.array()
        throw err;
    }

    if(!req.file){
        const err = new Error("Image harus di upload");
        err.errorStatus = 422;
        throw err;
    }
    
    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {uid: 1, name: 'Dudi Ali'}
    });

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create Blog Succes",
            data: result
        });
    })
    .catch(err => console.log(err))

}

exports.getBlog = (req, res, next) => {
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data blog post berhasil dipanggil',
            data: result,
        })
    })
    .then(err => {
        next(err)
    })
}