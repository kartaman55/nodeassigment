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
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Posts

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
