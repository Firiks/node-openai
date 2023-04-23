document.addEventListener('DOMContentLoaded', () => {
  const $submitBtn = document.getElementById('chat-submit');
  const $chat = document.getElementById('chat');
  const $chatInput = document.getElementById('chat-input');

  // must be in format "Human: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:"
  let chatPromptAll = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\n";

  async function chatAI(message) {
    try {
      let prompt = chatPromptAll + '\nHuman: ' + message + '\nAI:';

      const response = await fetch('/chat/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        alert('Cannot reply!!!');
        return;
      }

      chatPromptAll += prompt;

      const data = await response.json();
      const responseMsg = data.data;

      chatPromptAll += ' ' + responseMsg;

      console.log('chatPromptAll', chatPromptAll);

      addMessage(responseMsg, true);

    } catch (error) {
      console.error(error);
    }
  }

  function addMessage(message, ai = false) {
    let messageHtml = ''

    if(ai) {
      messageHtml = '<p style="padding: 0.25em; text-align: right; overflow-wrap: normal;"><span style="white-space: inherit; height: auto;" class="tag is-medium is-info">';
    } else {
      messageHtml = '<p style="padding: 0.25em; text-align: left; overflow-wrap: normal;"><span style="white-space: inherit; height: auto;" class="tag is-medium is-success">';
    }

    messageHtml += `${message}</span></p>`;
    $chat.innerHTML += messageHtml;
  }

  if($submitBtn) $submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const message = $chatInput.value.trim();

    $chatInput.value = '';

    if(message) {
      addMessage(message);
      chatAI(message);
    } else {
      alert('Input field is empty.');
    }
  })

});