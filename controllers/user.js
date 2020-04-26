const User = require('../models/user');

module.exports = function (app) {

    app.post('/register', async (req, res) => {
        const { err, data } = await User.register(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })

    app.post('/login', async (req, res) => {
        const { err, data } = await User.login(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })
}

