require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173/',
      'http://127.0.0.1:5173/',
      'https://easy-med-front.vercel.app/',
    ],
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1', router);

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
