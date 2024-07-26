const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let users = [];
let bans = [
    { ip: '192.168.1.1', username: 'bannedUser1' },
    { ip: '192.168.1.2', username: 'bannedUser2' },
    { ip: '192.168.1.3', username: 'bannedUser3' }
];

app.post('/generate', (req, res) => {
    const { username } = req.body;
    if (username && !users.includes(username)) {
        users.push(username);
        saveUsers();
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/bans', (req, res) => {
    res.json({ bans });
});

function saveUsers() {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

function loadUsers() {
    if (fs.existsSync('users.json')) {
        users = JSON.parse(fs.readFileSync('users.json'));
    }
}

loadUsers();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
