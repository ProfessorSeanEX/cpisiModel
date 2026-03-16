// CORE: Bootstrapping and State Management
window.CPISI = window.CPISI || {};
window.CPISI.config = {
    WORKER_URL: "https://cpisi-gate-worker.seanje-lenox.workers.dev"
};
window.CPISI.state = {
    identity: null,
    authSecret: null,
    currentPath: "WORD"
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

window.CPISI.clearState = function() {
    localStorage.clear();
    location.reload();
};
