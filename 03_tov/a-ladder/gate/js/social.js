// js/social.js: The Covenant Mirror Feed & Resonance Logic
window.CPISI = window.CPISI || {};

window.CPISI.social = {
    loadMirrorFeed: async function() {
        const mirrorContent = document.getElementById('mirror-content');
        if (!mirrorContent) return;

        try {
            const resp = await fetch(window.CPISI.config.WORKER_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "GET_MIRROR" })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);

            if (data.data && data.data.length > 0) {
                mirrorContent.innerHTML = '';
                data.data.forEach(item => {
                    const block = document.createElement('div');
                    block.className = 'mirror-item';
                    block.style.marginBottom = '44px'; // Lucas Aligned
                    block.innerHTML = `
                        <div style="font-size: 9px; color: var(--c4); letter-spacing: 2px; margin-bottom: 8px;">
                            ${item.operator.toUpperCase()} // ${item.tier}
                        </div>
                        <div style="color: #aaa; line-height: 1.6; font-size: 13px;">${item.content}</div>
                        <button onclick="window.CPISI.social.resonate('${item.id}', '${item.operator}')" 
                                style="background:transparent; border:none; color:#222; font-family:var(--mono); font-size:8px; cursor:pointer; margin-top:10px;">
                            [ RESONATE ]
                        </button>
                        <div id="thread-${item.id}" class="resonance-thread"></div>
                    `;
                    mirrorContent.appendChild(block);
                });
            }
        } catch (e) { console.error("CPISI: Mirror Feed Dissonance", e); }
    },

    resonate: function(wordId, targetOperator) {
        const input = document.getElementById('message-input');
        input.value = `@${targetOperator} Resonance: `;
        input.focus();
        // Visual cue that we are responding to a specific word
        window.CPISI.state.activeResonance = wordId;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    if (window.CPISI.loadState()) {
        setTimeout(window.CPISI.social.loadMirrorFeed, 1000);
    }
});
