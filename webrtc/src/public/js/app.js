const messageList = document.querySelector('ul')
const messageForm = document.querySelector('#msg');
const nickForm = document.querySelector('#nick');

function makeMsg(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

function handleMsgSubmit(e) {
    e.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeMsg('msg', input.value));
    input.value = '';
}
function handleNickSubmit(e) {
    e.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(makeMsg('nick', input.value));
    alert(`Your nickname is changed to ${input.value}`);
}

messageForm.addEventListener('submit', handleMsgSubmit);
nickForm.addEventListener('submit', handleNickSubmit);

const socket = new WebSocket(`ws://${location.host}`);

socket.addEventListener('open', () => {
    console.log('Connected to Server ✅');
});

socket.addEventListener('message', (message) => {
    const li = document.createElement('li');
    li.textContent = message.data;
    messageList.appendChild(li);
});

socket.addEventListener('close', () => {
    console.log('Disconnected to Server ❗️')
})
