exports.register = (async (req) => {
    try {
        const { email, password } = req.body;

        const user = req.db.collection('Users')
        await user.insertOne({ email, password });
        return { err: null, data: "ok" }

    } catch (err) {
        return { err: err, data: {} }
    }
});

exports.login = (async (req) => {
    try {
        const user = req.db.collection('Users')
        const response = await user.find({ password: req.body.password, email: req.body.email }).toArray()
        return { err: null, data: !response.length ? [] : response }
    } catch (err) {
        return { err: err, data: {} }
    }
})