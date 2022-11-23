require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);
// app.use('/api/v2', );

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
