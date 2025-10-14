const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatContent = document.getElementById('chat-content');
const avatar = document.querySelector('.avatar');

chatBtn.addEventListener('click', () => {
  chatBox.style.display = (chatBox.style.display === 'block') ? 'none' : 'block';
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;
  addMessage(msg, 'user');
  userInput.value = '';
  setTimeout(() => {
    const resposta = getBotResponse(msg);
    addMessage(resposta, 'bot');
    speak(resposta);
  }, 600);
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('msg', sender);
  msgDiv.textContent = text;
  chatContent.appendChild(msgDiv);
  chatContent.scrollTop = chatContent.scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase();
  if (input.includes('café')) return 'Nosso café é feito com grãos especiais!';
  if (input.includes('cardápio')) return 'Temos café, capuccino e bebidas geladas!';
  if (input.includes('horário')) return 'Abrimos todos os dias das 8h às 20h ☕';
  if (input.includes('localização')) return 'Estamos na Rua do Café, 123 - Bairro do Sabor.';
  if (input.includes('pedido')) return 'Você pode fazer seu pedido diretamente comigo ☕';
  return 'Desculpe, ainda estou aprendendo sobre isso ☕';
}

function speak(text) {
  if (!avatar) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  
  avatar.classList.add('speaking');
  speechSynthesis.speak(utterance);
  utterance.onend = () => avatar.classList.remove('speaking');
}
