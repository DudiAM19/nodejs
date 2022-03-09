exports.createProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json(
        {
            message: 'create product succes',
            data: {
                id: 1,
                name: name,
                price: price
            }
        }
    );
    next();
}

exports.getProduct = (req, res, next) => {
    res.json(
        {
            message: 'get all product succes',
            data: [
                {
                    id: 1,
                    name: 'bodat',
                    price: 10000,
                }
            ]
        }
    );
    next();
}