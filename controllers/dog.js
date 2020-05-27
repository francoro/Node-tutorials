const Dog = require('../models/dog');

module.exports = function (app) {

    app.post('/dog', async (req, res) => {
        const { err, data } = await Dog.add(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })

    app.get('/dog/:type/:city/:breed', async (req, res) => {
        const { err, data } = await Dog.getByFilter(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })

    app.get('/dog/user/:userId', async (req, res) => {
        const { err, data } = await Dog.getByUserId(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })

    app.get('/breed', async (req, res) => {
        const { err, data } = await Dog.getAllBreeds(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })

    app.get('/city', async (req, res) => {
        const { err, data } = await Dog.getAllCities(req)
        if (err) return res.send({ error: err.message });
        res.json(data)
    })
}