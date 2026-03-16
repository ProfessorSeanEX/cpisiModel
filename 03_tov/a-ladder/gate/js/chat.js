// CHAT: The Visual Parser for the Substrate Stream
window.CPISI = window.CPISI || {};

window.CPISI.appendVault = function(text, isSteward, skipSave = false) {
    const stream = document.getElementById('terminal-stream');
    if (!stream) return;

    const vault = document.createElement('div');
    vault.className = `vault-body ${isSteward ? 'steward' : 'dawndusk'}`;
    
    const seal = document.createElement('div');
    seal.className = 'vault-seal';
    seal.innerText = '✧';
    seal.onclick = () => window.CPISI.sealWord(text, vault);
    vault.appendChild(seal);

    const content = document.createElement('div');
    content.className = 'vault-content';
    content.innerText = text;
    vault.appendChild(content);
    
    stream.appendChild(vault);
    window.CPISI.terminal.scrollToBottom();

    if (!skipSave) {
        const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
        history.push({ text, isSteward });
        localStorage.setItem('cpisi_history', JSON.stringify(history.slice(-50)));
    }
    return vault;
};

window.CPISI.restoreHistory = async function() {
    const stream = document.getElementById('terminal-stream');
    if (stream) stream.innerHTML = '';
    
    try {
        const resp = await fetch(window.CPISI.config.WORKER_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "GET_HISTORY",
                identity: window.CPISI.state.identity,
                inviteCode: window.CPISI.state.authSecret
            })
        });
        const data = await resp.json();
        if (data.data && data.data.length > 0) {
            data.data.forEach(item => {
                window.CPISI.appendVault(item.text, item.isSteward, true);
            });
        } else {
            const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
            history.forEach(item => window.CPISI.appendVault(item.text, item.isSteward, true));
        }
    } catch (e) { console.error("CPISI: History Sync Dissonance", e); }
};

window.CPISI.handleMessageSubmit = async function(e) {
    e.preventDefault();
    const inputEl = document.getElementById('message-input');
    const val = inputEl.value.trim();
    if (!val) return;
    
    const user = window.CPISI.state.identity?.user || 'steward';

    // If it's a command, handle it via terminal logic
    if (val.startsWith('/')) {
        window.CPISI.handleCommand(val.substring(1));
        inputEl.value = '';
        return;
    }

    // Otherwise, treat it as a natural language command (Revelation)
    window.CPISI.terminal.command(user, val);
    inputEl.value = '';
    
    const respVault = window.CPISI.appendVault("...", false);
    const respContent = respVault.querySelector('.vault-content');
    respContent.classList.add('thinking');
    let fullReply = "";

    try {
        const payload = { 
            action: "ASCEND", message: val, 
            identity: window.CPISI.state.identity, 
            keys: { authority: window.CPISI.state.authSecret } 
        };
        const substrateKey = window.CPISI.security.getSubstrateKey();
        if (substrateKey) payload.keys.gemini = substrateKey;

        const response = await fetch(window.CPISI.config.WORKER_URL, { 
            method: "POST", headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(payload) 
        });
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            let lines = buffer.split('\n');
            buffer = lines.pop();
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const json = JSON.parse(line.substring(6));
                        const part = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
                        if (part) {
                            if (fullReply === "") {
                                respContent.innerText = "";
                                respContent.classList.remove('thinking');
                            }
                            fullReply += part;
                            respContent.innerText = fullReply;
                            window.CPISI.terminal.scrollToBottom();
                        }
                    } catch (e) {}
                }
            }
        }
    } catch (err) { 
        respContent.classList.remove('thinking');
        respContent.innerText = `[Dissonance] ${err.message}`; 
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('input-form');
    if (form) form.onsubmit = window.CPISI.handleMessageSubmit;
    
    if (window.CPISI.loadState()) {
        window.CPISI.showMainStage(true);
        window.CPISI.restoreHistory();
        window.CPISI.updatePresence();
        
        // Apply tiered visibility to the root
        const tier = window.CPISI.state.identity?.tier || 'SUPPORT';
        document.body.className = `tier-${tier.toLowerCase().replace('_', '-')}`;
        
        // Update prompt
        const prompt = document.getElementById('terminal-prompt');
        if (prompt) prompt.innerText = `${window.CPISI.state.identity.user}@dawndusk:~$`;
    }
});
