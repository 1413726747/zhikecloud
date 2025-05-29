document.addEventListener('DOMContentLoaded', function() {
            const applyer=new application();

            const chatContainer = document.getElementById('chatContainer');
            const messageInput = document.getElementById('messageInput');
            const sendButton = document.getElementById('sendButton');
            const currentFeatureTitle = document.querySelector('.current-feature h2');
            const currentFeatureIcon = document.querySelector('.current-feature i');
            const featureCards = document.querySelectorAll('.feature-card');

            // 调整输入框高度(Presentation.js)
            messageInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
                if (this.scrollHeight > 150) {
                    this.style.overflowY = 'scroll';
                } else {
                    this.style.overflowY = 'hidden';
                }
            });
            
            // 发送消息函数(Presentation.js)
            function sendMessage() {
                const message = messageInput.value.trim();
                if (message === '') return;
                
                // 添加用户消息
                addMessage(message, 'user');
                messageInput.value = '';
                messageInput.style.height = '60px';
                
                // 显示AI正在输入
                const typingElement = document.createElement('div');
                typingElement.className = 'message ai-message';
                typingElement.innerHTML = `
                    <div class="ai-header">
                        <img src="tes.png"class="custom-icon">
                        <h3>AI助手</h3>
                    </div>
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                chatContainer.appendChild(typingElement);
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // 模拟AI响应（实际应用中应替换为真实的API调用）
                setTimeout(() => {
                    chatContainer.removeChild(typingElement);
                    const aiResponse = applyer.generateAIResponse(message);
                    addMessage(aiResponse, 'ai');
                }, 1500);
            }
            
            // 添加消息到聊天界面
            function addMessage(text, sender) {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${sender}-message`;
                
                const now = new Date();
                const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                                  now.getMinutes().toString().padStart(2, '0');
                
                if (sender === 'ai') {
                    messageElement.innerHTML = `
                        <div class="ai-header">
                            <img src="tes.png"class="custom-icon">
                            <h3>AI助手</h3>
                        </div>
                        <p>${text}</p>
                        <div class="message-time">${timeString}</div>
                    `;
                } else {
                    messageElement.innerHTML = `
                        <p>${text}</p>
                        <div class="message-time">${timeString}</div>
                    `;
                }
                
                chatContainer.appendChild(messageElement);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
            
            // 生成AI响应（模拟）
            // function generateAIResponse(userMessage) {
            //     const responses = {
            //         '你好': '您好！很高兴为您服务。请问有什么可以帮您的吗？',
            //         '你是谁': '我是AI智能助手，可以帮您解答问题、生成内容、编写代码等。',
            //         '你会做什么': '我可以进行智能对话、内容创作、编程辅助、翻译、数据分析等任务。',
            //         '谢谢': '不客气！随时为您效劳。如果有其他问题，请随时问我。',
            //         '默认': `好的，我理解您说的是："${userMessage}"。在实际应用中，这里会连接真实的AI模型（如GPT-4）生成智能回复。这个演示展示了前端界面和交互逻辑，完整的AI助手网站还需要后端服务和AI API集成。`
            //     };

            //     const lowerCaseMessage = userMessage.toLowerCase();
            //     for (const [key, response] of Object.entries(responses)) {
            //         if (lowerCaseMessage.includes(key.toLowerCase())) {
            //             return response;
            //         }
            //     }
                
            //     return responses['默认'];
            // }
            
            // 事件监听
            sendButton.addEventListener('click', sendMessage);
            
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            
            // 侧边栏功能卡片点击事件
            featureCards.forEach(card => {
                card.addEventListener('click', function() {
                    // 移除所有卡片的active-feature类
                    featureCards.forEach(c => c.classList.remove('active-feature'));
                    // 为当前点击的卡片添加active-feature类
                    this.classList.add('active-feature');
                    
                    // 更新主内容区标题和图标
                    const featureName = this.getAttribute('data-feature');
                    const iconClass = this.getAttribute('data-icon');
                    currentFeatureTitle.textContent = featureName;
                    currentFeatureIcon.className = `fas ${iconClass}`;
                    
                    // 清空聊天容器并添加欢迎消息
                    chatContainer.innerHTML = '';
                    const welcomeMessage = document.createElement('div');
                    welcomeMessage.className = 'message ai-message';
                    welcomeMessage.innerHTML = `
                        <div class="ai-header">
                            <img src="tes.png"class="custom-icon">
                            <h3>AI助手</h3>
                        </div>
                        <p>您好！现在是${featureName}模式，有什么可以帮您的吗？</p>
                        <div class="message-time">刚刚</div>
                    `;
                    chatContainer.appendChild(welcomeMessage);
                });
            });
        });