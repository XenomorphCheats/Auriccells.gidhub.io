const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let users = [];

const fakeUsernames = [
    'GhostKiller123', 'SurvivorPro', 'DBDMaster', 'EntitySlayer', 'HookedAgain',
    'HexTotemDestroyer', 'BloodpointFarmer', 'PalletStunner', 'SkillCheckKing', 'LockerDweller'
];

app.post('/generate', (req, res) => {
    const { username } = req.body;
    if (username && !users.find(user => user.username === username)) {
        users.push({ username, type: 'real' });
        generateFakeUsers();
        saveUsers();
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/users', (req, res) => {
    res.json({ users });
});

function generateFakeUsers() {
    for (let i = 0; i < 5; i++) {
        const fakeUser = fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)];
        if (!users.find(user => user.username === fakeUser)) {
            users.push({ username: fakeUser, type: 'fake' });
        }
    }
}

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
