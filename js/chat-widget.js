document.addEventListener('DOMContentLoaded', () => {
    // Chat widget elements
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');

    // Predefined responses for the demo chatbot
    const botResponses = {
        greeting: ["Hi there! 👋", "Hello! How can I help you today?", "Welcome! What brings you here today?"],
        default: ["How can I help you with that?", "Tell me more about what you're looking for.", "Interesting! Can you provide more details?"],
        thanks: ["You're welcome!", "Glad I could help!", "My pleasure!"],
        pricing: ["Our pricing plans start at $19/month for basic features. Would you like more details about our packages?"],
        features: ["Our platform offers AI-powered responses, live chat integration, chatbot builder, analytics, and multi-channel support. Which feature would you like to know more about?"],
        support: ["Our support team is available 24/7. You can reach us at support@example.com or through this chat."],
        goodbye: ["Goodbye! Have a great day!", "Thanks for chatting with us. Come back anytime!", "Take care! Feel free to return if you have more questions."]
    };

    // Initial messages
    const initialMessages = [
        {text: "Hello! 👋 Welcome to BrandName support.", sender: "received", delay: 500},
        {text: "How can I assist you today?", sender: "received", delay: 1500}
    ];

    // Toggle chat widget visibility
    function toggleChat() {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            messageInput.focus();
        }
    }

    // Add event listeners
    chatButton.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    // Function to add a message to the chat
    function addMessage(text, type, delay = 0) {
        setTimeout(() => {
            const message = document.createElement('div');
            message.className = `message message-${type}`;
            
            const messageContent = document.createElement('p');
            messageContent.textContent = text;
            message.appendChild(messageContent);
            
            const messageTime = document.createElement('span');
            messageTime.className = 'message-time';
            messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            message.appendChild(messageTime);
            
            chatMessages.appendChild(message);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, delay);
    }

    // Show typing indicator
    function showTypingIndicator(delay = 1000) {
        const typing = document.createElement('div');
        typing.className = 'message message-received typing-message';
        typing.innerHTML = `
            <div class="typing-indicator">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        `;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return typing;
    }

    // Get bot response based on user input
    function getBotResponse(text) {
        text = text.toLowerCase();
        
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        } else if (text.includes('thank')) {
            return botResponses.thanks[Math.floor(Math.random() * botResponses.thanks.length)];
        } else if (text.includes('price') || text.includes('cost') || text.includes('plan')) {
            return botResponses.pricing[0];
        } else if (text.includes('feature') || text.includes('what') || text.includes('can')) {
            return botResponses.features[0];
        } else if (text.includes('support') || text.includes('help') || text.includes('contact')) {
            return botResponses.support[0];
        } else if (text.includes('bye') || text.includes('goodbye')) {
            return botResponses.goodbye[Math.floor(Math.random() * botResponses.goodbye.length)];
        } else {
            return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
        }
    }

    // Send user message
    function sendUserMessage() {
        const text = messageInput.value.trim();
        if (text === '') return;
        
        // Add user message
        addMessage(text, 'sent');
        messageInput.value = '';
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        // Remove typing indicator and add bot response after delay
        setTimeout(() => {
            typingIndicator.remove();
            addMessage(getBotResponse(text), 'received');
        }, Math.random() * 1000 + 1500); // Random delay between 1.5-2.5 seconds
    }

    // Event listeners for sending messages
    sendMessage.addEventListener('click', sendUserMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Load initial messages with delays
    initialMessages.forEach(msg => {
        addMessage(msg.text, msg.sender, msg.delay);
    });
    
    // Store chat state in local storage
    function saveChatState(isOpen) {
        localStorage.setItem('chatWidgetOpen', isOpen);
    }

    // Restore chat state
    const chatState = localStorage.getItem('chatWidgetOpen');
    if (chatState === 'true') {
        chatWidget.classList.add('active');
    }

    // Update chat state when toggled
    chatButton.addEventListener('click', () => {
        const isOpen = chatWidget.classList.contains('active');
        saveChatState(isOpen);
    });
});
