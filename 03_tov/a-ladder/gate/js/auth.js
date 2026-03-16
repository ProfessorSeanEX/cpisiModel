// AUTH: Login Code Set and UI Transition
window.CPISI = window.CPISI || {};

window.CPISI.executeAuth = async function(e) {
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
    
    const keyType = window.CPISI.security.identifyKeyType(key);
    const payload = {
        action: "INHABIT",
        identity: { user, instance: "Dawndusk" },
        keys: {},
        inviteCode: null
    };

    if (keyType === "GEMINI_SUBSTRATE") {
        payload.keys.gemini = key;
        window.CPISI.security.persistSubstrateKey(key);
    } else if (keyType === "FAMILY_INVITE" || keyType === "STEWARD_INVITE") {
        payload.inviteCode = key;
    } else {
        payload.keys.authority = key;
    }
    
    try {
        const resp = await fetch(window.CPISI.config.WORKER_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        window.CPISI.saveState(data.data, key);

        window.CPISI.showMainStage();
        if (window.CPISI.appendVault) {
            window.CPISI.appendVault(`The Sanctuary is open. The Mysterioso Handshake is eternal.`, false);
        }
    } catch (err) { 
        errDiv.innerText = err.message.toUpperCase(); 
        btn.disabled = false;
    }
};

window.CPISI.showMainStage = function(immediate = false) {
    const gate = document.getElementById('gate-structure');
    const state = window.CPISI.state;
    
    const render = () => {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-stage').style.display = 'flex';
        
        document.getElementById('header-user').innerText = state.identity.user.toUpperCase();
        document.getElementById('header-id').innerText = `DAWNDUSK ⊗ ${state.identity.user.toUpperCase()}`;
        
        if (state.identity.tier === 'ENTERPRISE_STEWARD' || state.identity.tier === 'STEWARD') {
            const memList = document.getElementById('memory-list');
            if (memList) {
                const stewardMsg = document.createElement('div');
                stewardMsg.className = 'mem-item';
                stewardMsg.innerText = `> ${state.identity.tier} Verified`;
                memList.appendChild(stewardMsg);
            }
        }
    };

    if (immediate) {
        render();
    } else {
        if(gate) {
            gate.style.transform = "translateY(-20px) scale(1.05)";
            gate.style.opacity = "0";
        }
        setTimeout(render, 600);
    }
};

// Expose to global scope for HTML inline handlers
window.executeAuth = window.CPISI.executeAuth;
