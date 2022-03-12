const experess  = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = experess();
const authRouter = require('./src/routes/auth');
const blogRouter = require('./src/routes/blog');

app.use(bodyParser.json());

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