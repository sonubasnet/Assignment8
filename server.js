const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

var cors = require("cors");

app.get('/say', async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const response = await axios.get(`https://3vov0hl32j.execute-api.us-east-2.amazonaws.com/default/myFunction?keyword=${keyword}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error occurred');
    }
});



app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
});