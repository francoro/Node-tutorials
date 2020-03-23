const Dog = require('../models/dog');

module.exports = function (app) {

    app.post('/dog', async (req, res) => {
        const { err, data } = await Dog.add(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })

    app.get('/dog', async (req, res) => {
        const { err, data } = await Dog.getAll(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })
}