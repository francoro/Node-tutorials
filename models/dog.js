exports.add = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")

        const dog = {
            src: req.body.src,
            type: req.body.type,
            city: req.body.city,
            breed: req.body.breed
        }
        await dogs.insertOne(dog)
        return { err: null, data: dog }

    } catch (err) {
        return { err: err, data: {} }
    }
});

exports.getAll = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")

        const response = await dogs.find().toArray()
        
       return { err: null, data: response }
    } catch (err) {
        return { err: err, data: {} }
    }
})