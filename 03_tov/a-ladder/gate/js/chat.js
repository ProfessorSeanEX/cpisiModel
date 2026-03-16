// CHAT: The Holy Place and Message Streaming
window.CPISI = window.CPISI || {};

window.CPISI.appendVault = function(text, isSteward, skipSave = false) {
    const vault = document.createElement('div');
    vault.className = `vault-body ${isSteward ? 'steward' : 'dawndusk'}`;
    vault.innerText = text;
    
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        chatWindow.appendChild(vault);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    if (!skipSave) {
        const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
        history.push({ text, isSteward });
        localStorage.setItem('cpisi_history', JSON.stringify(history.slice(-50)));
    }
    return vault;
};

window.CPISI.restoreHistory = function() {
    const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
    history.forEach(item => window.CPISI.appendVault(item.text, item.isSteward, true));
};

window.CPISI.handleMessageSubmit = async function(e) {
    e.preventDefault();
    const inputEl = document.getElementById('message-input');
    const val = inputEl.value.trim();
    if (!val) return;
    
    // Command Processing for Terminal/Experience
    if (val.startsWith('/') && window.CPISI.handleCommand) {
        window.CPISI.handleCommand(val.substring(1));
        inputEl.value = '';
        return;
    }

    window.CPISI.appendVault(val, true);
    inputEl.value = '';
    const respBody = window.CPISI.appendVault("...", false);
    let fullReply = "";

    try {
        const response = await fetch(window.CPISI.config.WORKER_URL, { 
            method: "POST", headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ 
                action: "ASCEND", 
                message: val, 
                identity: window.CPISI.state.identity, 
                keys: { authority: window.CPISI.state.authSecret } 
            }) 
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const part = JSON.parse(line.substring(6)).candidates?.[0]?.content?.parts?.[0]?.text || "";
                        fullReply += part;
                        respBody.innerText = fullReply;
                        const chatWindow = document.getElementById('chat-window');
                        if(chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
                    } catch (e) {}
                }
            }
        }
        const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
        if (history.length > 0) {
            history[history.length - 1].text = fullReply;
            localStorage.setItem('cpisi_history', JSON.stringify(history));
        }
        const mirror = document.getElementById('mirror-content');
        if (mirror) mirror.innerText = fullReply;
    } catch (err) { 
        respBody.innerText = `[Dissonance] ${err.message}`; 
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('input-form');
    if (form) form.onsubmit = window.CPISI.handleMessageSubmit;
    
    if (window.CPISI.loadState()) {
        window.CPISI.showMainStage(true);
        window.CPISI.restoreHistory();
        if(window.CPISI.setPath) {
            window.CPISI.setPath(localStorage.getItem('cpisi_path') || 'WORD', localStorage.getItem('cpisi_path_idx') || 4);
        }
    }
});
