const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

const users = require('./routes/api/users');
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ${port}'));
