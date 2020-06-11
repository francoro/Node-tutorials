const ObjectId = require('mongodb').ObjectID;

exports.add = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")
        const dog = {
            user: {
                _id: new ObjectId(req.body.user._id),
                email: req.body.user.email
            },
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

exports.delete = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")

        await dogs.deleteOne({"_id": new ObjectId(req.params.id)})

        return {err: null, data: req.params.id}
    } catch (err) {
        return {err: err, data: {}}
    }
})

exports.edit = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")

       const response = await dogs.update({ "_id": new ObjectId(req.body._id)},{
              $set: {
                city: req.body.city,
                breed: req.body.breed,
                type: req.body.type,
                src: req.body.src
              }
            }
         ).toArray()

         return {err: null, data: response}
    } catch(err) {
        return {err, data: {}}
    }
})

exports.getByFilter = (async (req) => {
    try {

        let query = {}

        if (req.params.type !== "undefined") {
            query.type = Number(req.params.type)
        }

        if (req.params.city !== "undefined") {
            query.city = req.params.city
        }

        if (req.params.breed !== "undefined") {
            query.breed = req.params.breed
        }

        const dogs = req.db.collection("Dogs")

        const response = await dogs.find(query).toArray()

        return { err: null, data: response }
    } catch (err) {
        return { err: err, data: {} }
    }
})

exports.get = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")

        const response = await dogs.find({"_id" : new ObjectId(req.params.id)}).toArray()

        return {err: null, data: response}
    } catch(err) {
        return { err: err, data: {} }
    }
})

exports.getByUserId = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")

        const response = await dogs.find({ 'user._id': new ObjectId(req.params.userId) }).toArray()

        return { err: null, data: response }
    } catch (err) {
        return { err: err, data: {} }
    }
})

exports.getAllBreeds = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")
        const response = await dogs.distinct('breed')
        return { err: null, data: response }
    } catch (err) {
        return { err: err, data: {} }
    }
})


exports.getAllCities = (async (req) => {
    try {
        const dogs = req.db.collection("Dogs")
        const response = await dogs.distinct('city')
        return { err: null, data: response }
    } catch (err) {
        return { err: err, data: {} }
    }
})