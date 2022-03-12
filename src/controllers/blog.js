const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog')

exports.createBlog = (req,res, next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const error = validationResult(req);
    if(!error.isEmpty()){
        const err = new Error("invalid Value");
        err.errorStatus = 400;
        err.data = error.array()
        throw err;
    }

    const Posting = new BlogPost({
        title: title,
        body: body,
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