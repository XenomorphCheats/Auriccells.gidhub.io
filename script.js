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
        loadUsers();
    });
});

function loadUsers() {
    fetch('/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        data.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username} (${user.type})`;
            userList.appendChild(li);
        });
    });
}

window.onload = loadUsers;
