/**
 * SANCTUARY ROOM: Conversational Mind & Fabrication Substrate
 */
import { state, loadState } from "../../shared/ts/core/state.ts";
import { initUI } from "../../shared/ts/core/ui.ts";
import { Vault } from "../../shared/ts/screens/vault.ts";
import { refreshMemory } from "../../shared/ts/components/memory.ts";
import { Social } from "../../shared/ts/systems/social.ts";
import { Sandbox } from "../../shared/ts/systems/sandbox.ts";
import { handleMessageSubmit } from "../../shared/ts/components/chat.ts";

(window as any).CPISI = {
    state,
    loadState,
    ui: { init: initUI },
    vault: Vault,
    social: Social,
    sandbox: Sandbox,
    chat: { handleSubmit: handleMessageSubmit },
    memory: { refresh: refreshMemory }
};

document.addEventListener('DOMContentLoaded', () => {
    if (!loadState()) {
        window.location.href = '../entrance/index.html';
        return;
    }
    initUI();
    refreshMemory();
});
