exports.register = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const result = {
        message: "Register Succes",
        data: {
            uid: 1,
            name: name,
            email: email,
            password: password,
        }
    }
    console.log(result);
    res.status(200).json(result);
    next()
}