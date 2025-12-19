const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; // Avoid port conflicts
const dataFile = path.join(__dirname, 'marble.json');

app.get('/orders', (req, res) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        res.send(JSON.parse(data));
    });
});

app.post('/orders', (req, res) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        const orders = JSON.parse(data);
        orders.push(req.body);
        fs.writeFile(dataFile, JSON.stringify(orders, null, 2), err => {
            if (err) return res.status(500).send('Error writing file');
            res.send('Order added!');
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
