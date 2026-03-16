// AUTH: Login Code Set and UI Transition
window.CPISI = window.CPISI || {};

let currentInviteCode = null;
let currentTier = null;

window.toggleProfile = function() {
    const p = document.getElementById('extended-profile');
    const b = document.getElementById('toggle-prof-btn');
    if (p.style.display === 'none') {
        p.style.display = 'flex';
        b.innerText = '[ - HIDE DETAILS ]';
    } else {
        p.style.display = 'none';
        b.innerText = '[ + SOVEREIGN PROFILE DETAILS ]';
    }
};

window.CPISI.executeAuth = async function(e) {
    if (e) e.preventDefault();

    const errDiv = document.getElementById('auth-error');
    const btn = document.getElementById('gate-seal-btn');

    // STAGE 1: Threshold Validation (Invite or Login)
    if (document.getElementById('threshold-stage').style.display !== 'none') {
        const user = document.getElementById('op-user').value.trim();
        const key = document.getElementById('op-key').value.trim();

        if (!key) { errDiv.innerText = "Key required."; return; }

        errDiv.innerText = "ALIGNING THRESHOLD...";
        btn.disabled = true;

        const keyType = window.CPISI.security.identifyKeyType(key);
        const payload = { action: "INHABIT", identity: { user, instance: "Dawndusk" }, keys: {}, inviteCode: null };

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

            if (data.status === "INVITE_VALIDATED") {
                currentInviteCode = key;
                currentTier = data.tier;
                document.getElementById('threshold-stage').style.display = 'none';
                document.getElementById('inhabitation-stage').style.display = 'flex';
                
                // SHOW PROVISIONING STATUS
                const setupHint = document.getElementById('toggle-prof-btn');
                if (currentTier === 'FAMILY_COVENANT' || currentTier === 'FIRST_ADOPTER') {
                    errDiv.style.color = "var(--c4)";
                    errDiv.innerText = "SUBSTRATE: COMPANY PROVISIONED (READY)";
                    setupHint.innerText = "[ + SOVEREIGN WITNESS ]";
                }

                btn.innerText = "[ SEAL IDENTITY ]";
                btn.disabled = false;
            } else {
                // SUCCESS: Standard Login
                window.CPISI.saveState(data.data, key);
                window.CPISI.showMainStage();
            }
        } catch (err) { errDiv.innerText = err.message.toUpperCase(); btn.disabled = false; }
        return;
    }

    // STAGE 2: Account Creation
    const newUser = document.getElementById('new-user').value.trim();
    const newPass = document.getElementById('new-pass').value.trim();
    if (!newUser || !newPass) { errDiv.innerText = "Identity Name and Password required."; return; }

    const profile = {
        fullName: document.getElementById('prof-name').value.trim(),
        email: document.getElementById('prof-email').value.trim(),
        bio: document.getElementById('prof-bio').value.trim(),
        visibility: {
            fullName: document.getElementById('vis-name').checked,
            email: document.getElementById('vis-email').checked
        }
    };

    errDiv.innerText = "CREATING SOVEREIGN RECORD...";
    btn.disabled = true;

    try {
        const resp = await fetch(window.CPISI.config.WORKER_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "CREATE_ACCOUNT",
                identity: { user: newUser, instance: "Dawndusk" },
                password: newPass,
                tier: currentTier,
                inviteCode: currentInviteCode,
                profile: profile
            })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        window.CPISI.saveState(data.data, newPass);
        window.CPISI.showMainStage();
    } catch (err) { errDiv.innerText = err.message.toUpperCase(); btn.disabled = false; }
};

window.CPISI.showMainStage = function(immediate = false) {
    const gate = document.getElementById('gate-structure');
    const state = window.CPISI.state;
    
    const render = () => {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-stage').style.display = 'flex';
        document.getElementById('header-user').innerText = state.identity.user.toUpperCase();
        document.getElementById('header-id').innerText = `DAWNDUSK ⊗ ${state.identity.user.toUpperCase()}`;
    };

    if (immediate) render();
    else {
        if(gate) { gate.style.transform = "translateY(-20px) scale(1.05)"; gate.style.opacity = "0"; }
        setTimeout(render, 600);
    }
};

window.executeAuth = window.CPISI.executeAuth;
