const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const messagesFile = path.join(__dirname, 'messages.json');

app.post('/saveMessage', (req, res) => {
    const message = req.body.message;
    fs.readFile(messagesFile, (err, data) => {
        if (err) throw err;
        const messages = JSON.parse(data);
        messages.push(message);
        fs.writeFile(messagesFile, JSON.stringify(messages), (err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

app.get('/loadMessages', (req, res) => {
    console.log('Loading messages...');
    fs.readFile(messagesFile, (err, data) => {
        if (err) throw err;
        const messages = JSON.parse(data);
        res.json({ messages });
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});