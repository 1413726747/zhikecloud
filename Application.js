class application {
  constructor() {
    this.model="1";
  }
  model_change(datamodel){
    this.model=datamodel;
  }
  generateAIResponse(userMessage) {
    if (this.model === "1") {
        // 模式1：数据输入
        if (userMessage.includes('你好')) {
            return '模式1：您好！很高兴为您服务。';
        } else if (userMessage.includes('你是谁')) {
            return '模式1：我是AI助手。';
        } else {
            return `模式1：您输入的是"${userMessage}"。`;
        }
    } else if (this.model === "2") {
        // 模式2：编程辅助
        if (userMessage.includes('for循环')) {
            return '模式2：for循环语法示例：for(let i=0;i<10;i++){}';
        } else {
            return `模式2：编程问题"${userMessage}"已收到。`;
        }
    } else if (this.model === "3") {
        // 模式3：翻译助手
        if (userMessage.includes('hello')) {
            return '模式3：hello 的中文是“你好”。';
        } else {
            return `模式3：暂不支持该翻译。`;
        }
    } else {
        // 其他模式
        return `当前为未知模式，收到："${userMessage}"`;
    }
  }

  handleFileInput(file, addMessageCallback) {
    if (!file) return false;

    const allowedTypes = [
        'text/plain',
        'application/json',
        'text/csv',
        'image/jpeg',
        'image/png',
        'application/pdf'
    ];
    if (!allowedTypes.includes(file.type)) {
        if (typeof addMessageCallback === 'function') {
            addMessageCallback(`不支持的文件类型：${file.type}，请上传txt、csv、json、jpg、png或pdf文件。`, 'ai');
        }
        return false;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        if (typeof addMessageCallback === 'function') {
            if (file.type.startsWith('image/')) {
                addMessageCallback(
                    `已上传图片文件：${file.name}<br><img src="${e.target.result}" style="max-width:200px;max-height:200px;">`,
                    'user'
                );
            } else if (file.type === 'application/pdf') {
                addMessageCallback(`已上传PDF文件：${file.name}`, 'user');
            } else {
                addMessageCallback(
                    `已上传文件：${file.name}\n内容预览：\n${e.target.result.substring(0, 200)}...`,
                    'user'
                );
            }
        }
        // 这里可以触发AI回复
        if (typeof addMessageCallback === 'function') {
            addMessageCallback('文件已成功接收！', 'ai');
        }
    };
    if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }
    return true;
}
}