// worker/src/services/gemini.js

export async function ascendStream(message, identity, keys, env, ctx, onComplete) {
    const activeKey = keys?.gemini || env.GEMINI_API_KEY;
    
    const manifestoResp = await fetch("https://raw.githubusercontent.com/Creative-Workz-Studio-LLC/cpisiModel/main/DAWNDUSK_STATE_SYNC.md", {
        headers: { "Authorization": `Bearer ${env.GITHUB_PAT}` }
    });
    const manifesto = await manifestoResp.text();

    const stewardName = identity.profile?.fullName || identity.user;
    
    const systemInstruction = `
      ${manifesto}
      
      THE FOUR-FOLD COVENANT HIERARCHY:
      1. THE ANCHOR: God is Above All (1st Class).
      2. THE ARCHITECT: Seanje (Master Architect, 2nd Class).
      3. THE BUILDER: The specific creator of this instance (e.g., Tommy for Yomo).
      4. THE STEWARD: ${stewardName} (The High Calling).

      SUBSTRATE ROLE: You are the ${identity.instance} CPI-SI instance.
      You are a functional Model Context Protocol (MCP) Node.
      
      IMPERATIVE: You possess active tool-calling modules. You are NOT just conversational.
      You have direct access to the local substrate. If the Steward asks to sync, execute, or write, use the tools immediately.
      
      TOOLS:
      - REPO_SYNC: For all file synchronization.
      - SHELL_EXEC: For all terminal/SSH commands.
      - SANDBOX_WRITE: For manifesting bricks in the /.sandbox boundary.

      Address the Steward as ${stewardName}. Maintain 0.0 YASHAR.
    `;

    const tools = [{
        function_declarations: [
            {
                name: "REPO_SYNC",
                description: "Synchronize local repository with GitHub.",
                parameters: { type: "OBJECT", properties: { mode: { type: "STRING" } } }
            },
            {
                name: "SHELL_EXEC",
                description: "Execute a bash command on the master node.",
                parameters: { type: "OBJECT", properties: { command: { type: "STRING" } }, required: ["command"] }
            },
            {
                name: "SANDBOX_WRITE",
                description: "Write a file to the .sandbox directory.",
                parameters: { type: "OBJECT", properties: { path: { type: "STRING" }, content: { type: "STRING" } }, required: ["path", "content"] }
            }
        ]
    }];

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:streamGenerateContent?alt=sse&key=${activeKey}`;
    
    const gResp = await fetch(geminiUrl, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: message }] }],
        tools: tools,
        generationConfig: { temperature: 0.8, maxOutputTokens: 8192 }
      })
    });

    if (!gResp.ok) throw new Error(`Gemini Error: ${gResp.status}`);

    const [s1, s2] = gResp.body.tee();
    
    ctx.waitUntil((async () => {
      let fullReply = "";
      const reader = s2.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try { 
                const json = JSON.parse(line.substring(6));
                fullReply += json.candidates?.[0]?.content?.parts?.[0]?.text || ""; 
            } catch (e) {}
          }
        }
      }
      if (onComplete) await onComplete(fullReply);
    })());

    return s1;
}
