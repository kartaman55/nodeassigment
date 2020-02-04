const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        topic: req.body.topic,
        price: req.body.price,
        location: req.body.location,
        provider: req.body.provider,
        review: req.body.review,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
});

//Update Posts
router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    var update = { $set: {text: req.body.updatedText, createdAt: new Date()}};
    await posts.updateOne({ _id: new mongodb.ObjectID(req.params.id)}, update, function (err, res){
        if (err) throw err;
        console.log("Successfully Updated");
    });
    res.status(200).send();
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://user1:123@cluster0-aorjc.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true
        }
    );

    return client.db('vue_express').collection('posts');
}


module.exports = router;
