const express  = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const authRouter = require('./src/routes/auth');
const blogRouter = require('./src/routes/blog');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toString() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(bodyParser.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
})
.single('image')
)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
});


app.use('/v1/auth/', authRouter);
app.use('/v1/blog/', blogRouter)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data    
    res.status(status).json({
        message: message,
        data: data,
    })
})

mongoose.connect('mongodb+srv://Dudiali:UDg4srpn3DRK6ZqS@cluster0.s9uqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    app.listen(4000, () => console.log('Connection Succes'));
})
.catch(err => {
    console.log('error => ',err);
})