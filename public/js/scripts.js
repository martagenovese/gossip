document.addEventListener('DOMContentLoaded', loadMessages);

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('messageInput').value;
    saveMessage(message);
    document.getElementById('messageInput').value = '';
});

function saveMessage(message) {
    const currentDate = new Date();
    const mess = { id: Date.now(), message, currentDate };

    fetch('/saveMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mess)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadMessages();
        }
    })
    .catch(error => console.error('Error:', error));
}

function loadMessages() {
    fetch('/loadMessages')
    .then(response => response.json())
    .then(data => {
        const messagesList = document.getElementById('messagesList');
        messagesList.innerHTML = '';
        data.messages.forEach(message => {
            addMessage(message);
        });
    })
    .catch(error => console.error('Error:', error));
}

function addMessage(message) {
    const messagesList = document.getElementById('messagesList');
    const li = document.createElement('li');
    li.innerHTML = `
        <p>${message.message}</p>
        <div class="date">at ${message.currentDate}</div>
    `;
    messagesList.appendChild(li);
}