/**
 * THRESHOLD ROOM: Identity & Inhabitation logic
 */
import { auth } from "../../shared/ts/screens/auth.ts";
import { loadState } from "../../shared/ts/core/state.ts";

(window as any).CPISI = (window as any).CPISI || {};
(window as any).CPISI.auth = auth;

document.addEventListener('DOMContentLoaded', () => {
    if (loadState()) {
        window.location.href = '../sanctuary/index.html';
    }
});
