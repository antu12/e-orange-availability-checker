require('dotenv').config();
const express = require('express');
const app = express();
const cron = require('node-cron');
const port = process.env.PORT || 3000;

app.get('/get_pulsar', (req, res) => {
    const scrapper = require('./index');
    res.sendStatus(200);
});

cron.schedule('*/15 * * * *', () => {
    const scrapper = require('./index');
    console.log('running /get_pulsar task every 15 minutes');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})