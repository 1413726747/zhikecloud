class application {
  constructor() {
  }
  generateAIResponse(userMessage) {
    const responses = {
                    '你好': '您好！很高兴为您服务。请问有什么可以帮您的吗？',
                    '你是谁': '我是AI智能助手，可以帮您解答问题、生成内容、编写代码等。',
                    '你会做什么': '我可以进行智能对话、内容创作、编程辅助、翻译、数据分析等任务。',
                    '谢谢': '不客气！随时为您效劳。如果有其他问题，请随时问我。',
                    '默认': `好的，我理解您说的是："${userMessage}"。在实际应用中，这里会连接真实的AI模型（如GPT-4）生成智能回复。这个演示展示了前端界面和交互逻辑，完整的AI助手网站还需要后端服务和AI API集成。`
                };

                const lowerCaseMessage = userMessage.toLowerCase();
                for (const [key, response] of Object.entries(responses)) {
                    if (lowerCaseMessage.includes(key.toLowerCase())) {
                        return response;
                    }
                }
                
                return responses['默认'];
  }
}