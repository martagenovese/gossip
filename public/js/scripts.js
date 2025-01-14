document.addEventListener('DOMContentLoaded', loadMessages);

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('messageInput').value;
    saveMessage(message);
    document.getElementById('messageInput').value = '';
});

function saveMessage(message) {
    const currentDate = new Date();
    const mess = { id: Date.now(), message, currentDate, likes: 0, replies: [] };

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
    const liked = localStorage.getItem(`liked-${message.id}`) === 'true';
    li.innerHTML = `
        <p>${message.message}</p>
        <div class="date">at ${message.currentDate}</div>
        <button class="likeButton" onclick="likeMessage(${message.id})" ${liked ? 'disabled' : ''}>Like</button>
        <span id="likes-${message.id}">${message.likes} likes</span>
        <button class="replyButton" onclick="showReplyForm(${message.id})">Reply</button>
        <div id="replyForm-${message.id}" class="reply-form" style="display: none;">
            <textarea id="replyInput-${message.id}" placeholder="Type your reply here..."></textarea>
            <button onclick="submitReply(${message.id})">Submit Reply</button>
        </div>
        <ul class="replies">
            ${(message.replies || []).map(reply => `<li>${reply}</li>`).join('')}
        </ul>
    `;
    messagesList.appendChild(li);
}

function showReplyForm(id) {
    document.getElementById(`replyForm-${id}`).style.display = 'block';
}

function submitReply(id) {
    const reply = document.getElementById(`replyInput-${id}`).value;
    fetch('/replyMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, reply })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadMessages();
        }
    })
    .catch(error => console.error('Error:', error));
}

function likeMessage(id) {
    if (localStorage.getItem(`liked-${id}`) === 'true') {
        return;
    }

    fetch('/likeMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem(`liked-${id}`, 'true');
            loadMessages();
        }
    })
    .catch(error => console.error('Error:', error));
}