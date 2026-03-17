/**
 * AUTH SCREEN: Sovereign Identity & Threshold Logic
 */
import { saveState } from "../core/state.ts";
import { initUI } from "../core/ui.ts";
import { config } from "../core/config.ts";

export const auth = {
    showSignup: () => {
        document.getElementById('login-form')!.style.display = 'none';
        document.getElementById('signup-form')!.style.display = 'block';
        document.getElementById('auth-error')!.innerText = "";
    },

    showLogin: () => {
        document.getElementById('login-form')!.style.display = 'block';
        document.getElementById('signup-form')!.style.display = 'none';
        document.getElementById('auth-error')!.innerText = "";
    },

    executeLogin: async (e: Event) => {
        e.preventDefault();
        const errDiv = document.getElementById('auth-error')!;
        const btn = document.getElementById('login-btn') as HTMLButtonElement;
        
        const user = (document.getElementById('op-user') as HTMLInputElement).value.trim();
        const key = (document.getElementById('op-key') as HTMLInputElement).value.trim();

        if (!user || !key) { errDiv.innerText = "IDENTITY and KEY required."; return; }

        errDiv.innerText = "ALIGNING THRESHOLD...";
        btn.disabled = true;

        try {
            const resp = await fetch(config.WORKER_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    action: "INHABIT", 
                    identity: { user, instance: "Dawndusk" }, 
                    keys: { authority: key }
                })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);

            saveState(data.data, key);
            window.location.href = 'sanctuary.html';
        } catch (err: any) { 
            errDiv.innerText = err.message.toUpperCase(); 
            btn.disabled = false; 
        }
    },

    executeSignup: async (e: Event) => {
        e.preventDefault();
        const errDiv = document.getElementById('auth-error')!;
        const btn = document.getElementById('signup-btn') as HTMLButtonElement;

        const inviteCode = (document.getElementById('invite-code') as HTMLInputElement).value.trim();
        const username = (document.getElementById('new-user') as HTMLInputElement).value.trim();
        const password = (document.getElementById('new-pass') as HTMLInputElement).value.trim();
        const confirm = (document.getElementById('conf-pass') as HTMLInputElement).value.trim();
        const firstName = (document.getElementById('first-name') as HTMLInputElement).value.trim();
        const lastName = (document.getElementById('last-name') as HTMLInputElement).value.trim();
        const email = (document.getElementById('prof-email') as HTMLInputElement).value.trim();
        const birthday = (document.getElementById('birth-date') as HTMLInputElement).value;

        if (password !== confirm) { errDiv.innerText = "PASSWORDS DO NOT ALIGN."; return; }
        if (!inviteCode) { errDiv.innerText = "INVITE CODE / MASTER KEY REQUIRED."; return; }

        btn.disabled = true;
        errDiv.innerText = "MANIFESTING IDENTITY...";

        try {
            const resp = await fetch(config.WORKER_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "REGISTER",
                    username,
                    password,
                    inviteCode,
                    profile: {
                        fullName: `${firstName} ${lastName}`,
                        email,
                        birthday,
                        bio: "",
                        visibility: { fullName: true, email: true, bio: true }
                    }
                })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);

            saveState(data.data, password);
            window.location.href = 'sanctuary.html';
        } catch (err: any) {
            errDiv.innerText = err.message.toUpperCase();
            btn.disabled = false;
        }
    }
};

// Global mapping for form access
(window as any).executeAuth = (e: Event) => { /* legacy catch */ };
(window as any).CPISI = (window as any).CPISI || {};
(window as any).CPISI.auth = auth;
