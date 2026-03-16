// CORE: Bootstrapping and State Management
window.CPISI = window.CPISI || {};
window.CPISI.config = {
    WORKER_URL: "https://cpisi-gate-worker.seanje-lenox.workers.dev"
};
window.CPISI.state = {
    identity: null,
    authSecret: null,
    currentPath: "WORD",
    activeView: "view-sanctuary"
};

// State Persistence
window.CPISI.saveState = function(identity, secret) {
    localStorage.setItem('cpisi_identity', JSON.stringify(identity));
    localStorage.setItem('cpisi_secret', secret);
    window.CPISI.state.identity = identity;
    window.CPISI.state.authSecret = secret;
};

// PWA Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('CPISI: Substrate Cache Active'))
            .catch(err => console.error('CPISI: Cache Dissonance', err));
    });
}

window.CPISI.loadState = function() {
    const saved = localStorage.getItem('cpisi_identity');
    const savedSecret = localStorage.getItem('cpisi_secret');
    if (saved && savedSecret) {
        window.CPISI.state.identity = JSON.parse(saved);
        window.CPISI.state.authSecret = savedSecret;
        return true;
    }
    return false;
};

window.toggleSettings = function() {
    const vault = document.getElementById('settings-vault');
    vault.classList.toggle('open');
    
    if (vault.classList.contains('open')) {
        const identity = window.CPISI.state.identity;
        document.getElementById('settings-display-name').innerText = identity.profile?.fullName || identity.user;
        document.getElementById('settings-display-tier').innerText = identity.tier;
        
        // Pre-fill edit fields
        document.getElementById('edit-full-name').value = identity.profile?.fullName || "";
        document.getElementById('edit-bio').value = identity.profile?.bio || "";
    }
};

window.CPISI.clearState = function() {
    localStorage.removeItem('cpisi_identity');
    localStorage.removeItem('cpisi_secret');
    localStorage.removeItem('cpisi_history');
    location.reload();
};

// --- TELEMETRY ---
window.CPISI.updatePresence = function() {
    const memList = document.getElementById('memory-list');
    if (!memList) return;
    memList.innerHTML = '';
    
    const items = [
        { text: "Syncing Substrate...", active: true },
        { text: "Sanctuary Online", active: true },
        { text: "Covenant Link Active", active: true },
        { text: `Operator: ${window.CPISI.state.identity?.user || 'Guest'}`, active: false }
    ];

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'mem-item';
        if (item.active) {
            const pulse = document.createElement('div');
            pulse.className = 'presence-pulse';
            div.appendChild(pulse);
        }
        const text = document.createElement('span');
        text.innerText = `> ${item.text}`;
        div.appendChild(text);
        memList.appendChild(div);
    });
};
