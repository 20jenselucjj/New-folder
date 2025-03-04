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
            chatButton.style.zIndex = "997"; // Lower z-index when chat is open to prevent overlap
            // Scroll to bottom of messages
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        } else {
            chatButton.style.zIndex = "1001"; // Higher z-index when chat is closed
        }
    });
    
    // Close chat and exit full screen mode
    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        chatWidget.classList.remove('keyboard-visible'); // Exit full screen mode
        chatButton.style.zIndex = "1001";
        document.body.style.overflow = ''; // Restore scrolling
        saveChatState(false);
        messageInput.blur(); // Remove focus from input
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
    
    // Enhanced mobile keyboard handling
    messageInput.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
            chatWidget.classList.add('keyboard-visible');
            
            // Scroll to bottom when keyboard appears
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
                // Try to bring the input into view on iOS
                messageInput.scrollIntoView(false);
            }, 300);
        }
    });

    messageInput.addEventListener('blur', () => {
        // Small delay to prevent jumpy animations
        setTimeout(() => {
            chatWidget.classList.remove('keyboard-visible');
        }, 100);
    });

    // Fix for iOS virtual keyboard issues
    function handleResize() {
        const isKeyboardVisible = 
            document.activeElement === messageInput && 
            window.innerWidth <= 768;
            
        if (isKeyboardVisible && window.visualViewport) {
            // Use Visual Viewport API for better keyboard handling
            const viewportHeight = window.visualViewport.height;
            const windowHeight = window.innerHeight;
            
            // If keyboard is likely visible (viewport significantly smaller than window)
            if (viewportHeight < windowHeight * 0.8) {
                chatWidget.classList.add('keyboard-visible');
                chatMessages.scrollTop = chatMessages.scrollHeight;
                // Adjust chat button to avoid overlap
                chatButton.style.opacity = "0.7"; // Make chat button semi-transparent
            } else {
                chatWidget.classList.remove('keyboard-visible');
                chatButton.style.opacity = "1"; // Restore chat button opacity
            }
        }
    }

    // Use Visual Viewport API if available for better keyboard detection
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
    } else {
        window.addEventListener('resize', handleResize);
    }

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

    // FULL SCREEN HANDLING - Only go full screen when input is focused on mobile
    messageInput.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
            chatWidget.classList.add('keyboard-visible'); // Enter full screen mode
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Scroll to bottom of chat
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    });

    messageInput.addEventListener('blur', () => {
        // Small delay to prevent jumpy animations or accidental exits
        // Only exit if user isn't actively interacting with the widget
        if (!chatWidget.contains(document.activeElement)) {
            setTimeout(() => {
                chatWidget.classList.remove('keyboard-visible'); // Exit full screen mode
                document.body.style.overflow = ''; // Restore background scrolling
            }, 200);
        }
    });

    // Handle ESC key to exit full screen mode
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatWidget.classList.contains('keyboard-visible')) {
            chatWidget.classList.remove('keyboard-visible');
            document.body.style.overflow = '';
            messageInput.blur();
        }
    });
});
