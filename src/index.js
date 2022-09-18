require('dotenv').config();
const express = require('express');
require('express-async-errors');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
