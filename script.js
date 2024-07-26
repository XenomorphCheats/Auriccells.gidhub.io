document.getElementById('generatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.success) {
            resultDiv.textContent = `Successfully generated Auric Cells for ${username}`;
        } else {
            resultDiv.textContent = `Failed to generate Auric Cells for ${username}`;
        }
        loadBanList();
    });
});

function loadBanList() {
    fetch('/bans')
    .then(response => response.json())
    .then(data => {
        const banList = document.getElementById('banList');
        banList.innerHTML = '';
        data.bans.forEach(ban => {
            const li = document.createElement('li');
            li.textContent = `IP: ${ban.ip}, Username: ${ban.username}`;
            banList.appendChild(li);
        });
    });
}

window.onload = loadBanList;
