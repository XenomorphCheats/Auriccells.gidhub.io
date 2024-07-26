document.getElementById('generatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const generateButton = document.getElementById('generateButton');
    const messageDiv = document.getElementById('message');
    
    // Show the working message
    messageDiv.style.display = 'block';

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
        loadUsers(); // Load and display the user list
        // Hide the message after processing
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000); // Hide message after 5 seconds
    });
});

function loadUsers() {
    fetch('/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear current list
        data.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.username; // Display username only
            userList.appendChild(li);
        });
    })
    .catch(error => console.error('Error loading users:', error));
}

window.onload = loadUsers;

