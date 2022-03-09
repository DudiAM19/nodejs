const experess  = require('express');
const bodyParser = require('body-parser');

const app = experess();
const productRouter = require('./src/routes/product');

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
});

app.use('/v1/customer/', productRouter);

app.listen(4000);