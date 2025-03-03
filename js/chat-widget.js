document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chatWidget');
    const chatButton = document.getElementById('chatButton');
    const chatMessages = document.getElementById('chatMessages');
    const closeChat = document.getElementById('closeChat');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');

    // Get chat state from localStorage
    const chatState = localStorage.getItem('chatOpen');
    
    // Initialize chat state based on localStorage
    if (chatState === 'true') {
        chatWidget.classList.add('active');
        chatButton.style.zIndex = "1000";
    }

    // Update chat state when toggled
    chatButton.addEventListener('click', () => {
        const isOpen = chatWidget.classList.contains('active');
        saveChatState(!isOpen);
    });
    
    // Toggle chat widget
    chatButton.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        
        // For mobile layout management
        if (chatWidget.classList.contains('active')) {
            chatButton.style.zIndex = "1000"; // Lower z-index when chat is open
            // Scroll to bottom of messages
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        } else {
            chatButton.style.zIndex = "1001"; // Higher z-index when chat is closed
        }
    });
    
    // Close chat
    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        chatButton.style.zIndex = "1001";
        saveChatState(false);
    });
    
    // Send message (example function)
    function sendChatMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userMessage = createMessage(message, 'sent');
        chatMessages.appendChild(userMessage);
        
        // Clear input
        messageInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulated response (would be replaced by actual backend)
        setTimeout(() => {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message message-received';
            typingIndicator.innerHTML = '<div class="typing-indicator"><span>.</span><span>.</span><span>.</span></div>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Remove typing indicator and show response after delay
            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                const responseText = getAutomaticResponse(message);
                const botMessage = createMessage(responseText, 'received');
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1500);
        }, 500);
    }
    
    // Create message element
    function createMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        messageDiv.appendChild(messageText);
        
        const timestamp = document.createElement('span');
        timestamp.className = 'message-time';
        timestamp.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        messageDiv.appendChild(timestamp);
        
        return messageDiv;
    }
    
    // Simple automatic responses
    function getAutomaticResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! How can I help you today?";
        } else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
            return "Our pricing plans start at $29/month. You can check all plan details in our Pricing section.";
        } else if (message.includes('contact') || message.includes('support')) {
            return "You can reach our support team at support@example.com or call us at +1 234 567 8900.";
        } else {
            return "Thanks for your message. Our team will get back to you soon!";
        }
    }
    
    // Send message on button click
    sendMessage.addEventListener('click', sendChatMessage);
    
    // Send message on Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Add basic greeting message
    setTimeout(() => {
        if (chatMessages.children.length === 0) {
            const welcomeMessage = createMessage("👋 Hi there! How can we help you today?", 'received');
            chatMessages.appendChild(welcomeMessage);
        }
    }, 1000);
    
    // Handle keyboard visibility on mobile
    messageInput.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
            chatWidget.classList.add('keyboard-visible');
        }
    });
    
    messageInput.addEventListener('blur', () => {
        chatWidget.classList.remove('keyboard-visible');
    });
    
    // Detect touch devices
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    // Apply specific adjustments for touch devices
    if (isTouchDevice()) {
        chatWidget.classList.add('touch-device');
    }
    
    // Mobile orientation change handling
    window.addEventListener('resize', () => {
        // Adjust for orientation changes
        if (chatWidget.classList.contains('active')) {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    });
    
    // Save chat state to localStorage
    function saveChatState(isOpen) {
        localStorage.setItem('chatOpen', isOpen);
    }
});
