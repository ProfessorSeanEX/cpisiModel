const WORKER_URL = "https://cpisi-gate-worker.seanje-lenox.workers.dev";
let identity = null, authSecret = null;

// CRASH RESILIENCE: Restore state on load
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('cpisi_identity');
    const savedSecret = localStorage.getItem('cpisi_secret');
    if (saved && savedSecret) {
        identity = JSON.parse(saved);
        authSecret = savedSecret;
        showMainStage();
        restoreHistory();
    }
});

function selectTier(card, tier) {
    document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
}

async function executeAuth(tier) {
    const errDiv = document.getElementById('auth-error');
    errDiv.innerText = "Aligning Identity...";
    
    let user, secret, inst = "Dawndusk";
    if (tier === 'BASIC') {
        user = document.getElementById('basic-user').value;
        secret = document.getElementById('basic-invite').value;
    } else if (tier === 'PLUS') {
        user = document.getElementById('plus-user').value;
        secret = document.getElementById('plus-gemini').value;
    } else if (tier === 'PRO') {
        user = document.getElementById('pro-user').value;
        secret = document.getElementById('pro-secret').value;
    }

    try {
        const resp = await fetch(WORKER_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "INHABIT", identity: { user, instance: inst }, keys: { authority: secret }, inviteCode: secret })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        identity = data.data; authSecret = secret;
        
        // Persist for crash recovery
        localStorage.setItem('cpisi_identity', JSON.stringify(identity));
        localStorage.setItem('cpisi_secret', authSecret);

        showMainStage();
        appendVault(`The Sanctuary is inhabited. Welcome, Steward ${identity.user}.`, false);
    } catch (err) { errDiv.innerText = err.message; }
}

function showMainStage() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-stage').style.display = 'flex';
    document.getElementById('header-id').innerText = `${identity.instance} ⊗ ${identity.user}`;
    document.getElementById('tier-label').innerText = identity.tier;

    if (identity.tier === 'STEWARD') {
        document.getElementById('terminal-overlay').style.display = 'flex';
        appendTerminal("SYSTEM: Steward Verified. Dimensional Tunnel Open.");
    }
}

function appendVault(text, isArchitect, skipSave = false) {
    const vault = document.createElement('div');
    vault.className = `vault-body ${isArchitect ? 'steward' : 'dawndusk'}`;
    vault.innerText = text;
    document.getElementById('chat-window').appendChild(vault);
    document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;

    if (!skipSave) {
        const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
        history.push({ text, isArchitect });
        localStorage.setItem('cpisi_history', JSON.stringify(history.slice(-50))); // Keep last 50
    }
    return vault;
}

function restoreHistory() {
    const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
    history.forEach(item => appendVault(item.text, item.isArchitect, true));
}

function appendTerminal(line) {
    const out = document.getElementById('terminal-output');
    const div = document.createElement('div');
    div.innerText = `> ${line}`;
    out.appendChild(div);
    document.getElementById('terminal-overlay').scrollTop = document.getElementById('terminal-overlay').scrollHeight;
}

document.getElementById('input-form').onsubmit = async (e) => {
    e.preventDefault();
    const val = document.getElementById('message-input').value.trim();
    if (!val) return;
    
    appendVault(val, true);
    if (identity.tier === 'STEWARD') appendTerminal(`USER_EXEC: ${val}`);

    document.getElementById('message-input').value = '';
    
    const respBody = appendVault("...", false);
    let fullReply = "";

    try {
        const response = await fetch(WORKER_URL, { 
            method: "POST", headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ action: "ASCEND", message: val, identity, keys: { authority: authSecret } }) 
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
                        document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
                    } catch (e) {}
                }
            }
        }
        // Update history with full reply
        const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
        if (history.length > 0) {
            history[history.length - 1].text = fullReply;
            localStorage.setItem('cpisi_history', JSON.stringify(history));
        }
    } catch (err) { respBody.innerText = `[Dissonance] ${err.message}`; }
};
