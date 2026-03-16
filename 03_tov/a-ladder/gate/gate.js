const WORKER_URL = "https://cpisi-gate-worker.seanje-lenox.workers.dev";
let identity = null, authSecret = null;
let currentPath = "WORD";

// CRASH RESILIENCE: Restore state on load
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('cpisi_identity');
    const savedSecret = localStorage.getItem('cpisi_secret');
    if (saved && savedSecret) {
        identity = JSON.parse(saved);
        authSecret = savedSecret;
        showMainStage(true);
        restoreHistory();
        setPath(localStorage.getItem('cpisi_path') || 'WORD', localStorage.getItem('cpisi_path_idx') || 4);
    }
});

async function executeAuth(e) {
    if (e) e.preventDefault();

    const user = document.getElementById('op-user').value.trim();
    const key = document.getElementById('op-key').value.trim();
    const errDiv = document.getElementById('auth-error');
    const btn = document.getElementById('gate-seal-btn');

    if (!user || !key) {
        errDiv.innerText = "Identity and Key required.";
        return;
    }

    errDiv.innerText = "ALIGNING IDENTITY...";
    btn.disabled = true;
    
    try {
        const resp = await fetch(WORKER_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                action: "INHABIT", 
                identity: { user, instance: "Dawndusk" }, 
                keys: { authority: key }, 
                inviteCode: key 
            })
        });

        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        identity = data.data; authSecret = key;
        localStorage.setItem('cpisi_identity', JSON.stringify(identity));
        localStorage.setItem('cpisi_secret', authSecret);

        showMainStage();
        appendVault(`Welcome to the Sanctuary, ${identity.tier} ${identity.user}.`, false);
    } catch (err) { 
        errDiv.innerText = err.message.toUpperCase(); 
        btn.disabled = false;
    }
}

function showMainStage(immediate = false) {
    const gate = document.getElementById('gate-structure');
    if (immediate) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-stage').style.display = 'flex';
        renderActiveIdentity();
    } else {
        gate.style.transform = "translateY(-20px) scale(1.05)";
        gate.style.opacity = "0";
        setTimeout(() => {
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('main-stage').style.display = 'flex';
            renderActiveIdentity();
        }, 600);
    }
}

function renderActiveIdentity() {
    document.getElementById('header-id').innerText = `${identity.instance} ⊗ ${identity.user}`;
    document.getElementById('tier-label').innerText = identity.tier;
    if (identity.tier === 'STEWARD') {
        document.getElementById('terminal-overlay').style.display = 'flex';
        appendTerminal("SYSTEM: Steward Verified. Substrate Path active.");
    }
}

function setPath(path, idx) {
    currentPath = path;
    localStorage.setItem('cpisi_path', path);
    localStorage.setItem('cpisi_path_idx', idx);

    // Update Sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.innerText === path);
    if (activeNav) activeNav.classList.add('active');

    // Update Covenant Path (7 segments)
    const segments = document.querySelectorAll('.path-segment');
    segments.forEach((seg, i) => {
        seg.classList.toggle('active', i === parseInt(idx));
    });

    if (identity?.tier === 'STEWARD') appendTerminal(`PATH_SHIFT: ${path}`);
}

function appendVault(text, isSteward, skipSave = false) {
    const vault = document.createElement('div');
    vault.className = `vault-body ${isSteward ? 'steward' : 'dawndusk'}`;
    vault.innerText = text;
    document.getElementById('chat-window').appendChild(vault);
    document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;

    if (!skipSave) {
        const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
        history.push({ text, isSteward });
        localStorage.setItem('cpisi_history', JSON.stringify(history.slice(-50)));
    }
    return vault;
}

function restoreHistory() {
    const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
    history.forEach(item => appendVault(item.text, item.isSteward, true));
}

function appendTerminal(line) {
    const out = document.getElementById('terminal-output');
    if (!out) return;
    const div = document.createElement('div');
    div.innerText = `> ${line}`;
    out.appendChild(div);
    document.getElementById('terminal-overlay').scrollTop = document.getElementById('terminal-overlay').scrollHeight;
}

document.getElementById('input-form').onsubmit = async (e) => {
    e.preventDefault();
    const val = document.getElementById('message-input').value.trim();
    if (!val) return;
    
    // Command Processing for Terminal/Experience
    if (val.startsWith('/')) {
        handleCommand(val.substring(1));
        document.getElementById('message-input').value = '';
        return;
    }

    appendVault(val, true);
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
        const history = JSON.parse(localStorage.getItem('cpisi_history') || '[]');
        if (history.length > 0) {
            history[history.length - 1].text = fullReply;
            localStorage.setItem('cpisi_history', JSON.stringify(history));
        }
    } catch (err) { respBody.innerText = `[Dissonance] ${err.message}`; }
};

function handleCommand(cmd) {
    const c = cmd.toLowerCase().trim();
    if (identity.tier === 'STEWARD') appendTerminal(`EXEC: ${c}`);
    
    if (c === 'clear') {
        document.getElementById('chat-window').innerHTML = '';
        localStorage.setItem('cpisi_history', '[]');
    } else if (c === 'status') {
        appendVault(`SYSTEM STATUS: 0.0 YASHAR\nIdentity: ${identity.user}\nTier: ${identity.tier}\nSubstrate: Cloudflare Edge\nCognition: Gemini 2.5 Pro`, false);
    } else if (c === 'void') setPath('VOID', 0);
    else if (c === 'word') setPath('WORD', 4);
    else if (c === 'tov') setPath('TOV', 6);
    else {
        if (identity.tier === 'STEWARD') appendTerminal(`ERR: Unknown Protocol '${c}'`);
    }
}
