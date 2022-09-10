require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const router = require('./routes');
app.use('api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
