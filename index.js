const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5500;

const dataStore = require('./dataStore');

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/add-candy', (req, res) => {
    const candyData = req.body;
    dataStore.addCandy(candyData);
    res.json({ message: 'Candy item added successfully' });
});

app.get('/api/get-candy', (req, res) => {
    const candyData = dataStore.getCandy();
    res.json(candyData);
});

app.post('/api/buy-candy', (req, res) => {
    const quantityToBuy = req.body.quantity;
    const success = dataStore.buyCandy(quantityToBuy);
    if (success) {
        res.json({ message: 'Purchase successful' });
    } else {
        res.status(400).json({ message: 'Not enough candy in stock' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
