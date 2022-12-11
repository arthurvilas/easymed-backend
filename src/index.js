require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const router = require('./routes');
const routerV2 = require('./v2/routes');
const { DatabaseError } = require('pg');
const AppError = require('./utils/AppError');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);
app.use('/api/v2', routerV2);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof DatabaseError) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
