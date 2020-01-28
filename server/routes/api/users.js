const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadUsersCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadUsersCollection();
    await posts.insertOne({
        email: req.body.email,
        password: req.body.password,
        usertype: req.body.usertype,
        createdAt: new Date()
    });
    res.status(201).send();
});



async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://127.0.0.1:27017',
        {
            useNewUrlParser: true
        }
    );

    return client.db('vue_express').collection('users');
}


module.exports = router;
