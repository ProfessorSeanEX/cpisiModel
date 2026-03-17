/**
 * ENTRANCE ROOM: Project Status & Testimony
 */
import { config } from "../../shared/ts/core/config.ts";
import { state, loadState } from "../../shared/ts/core/state.ts";

document.addEventListener('DOMContentLoaded', () => {
    if (loadState()) {
        window.location.href = '../sanctuary/index.html';
    }
});

// Attach to window for the Enter Sanctuary button if needed, 
// though we use a direct link in index.html for speed.
(window as any).CPISI = {
    config,
    state
};
