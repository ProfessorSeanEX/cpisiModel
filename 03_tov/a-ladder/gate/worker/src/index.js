const GITHUB_BASE = "https://raw.githubusercontent.com/Creative-Workz-Studio-LLC/cpisiModel/main/03_tov/a-ladder/gate";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    
    // --- BATTLE-TESTED UI PROXY ---
    if (request.method === "GET") {
        let path = url.pathname;
        if (path === "/" || path === "") path = "/index.html";
        
        try {
            const fileUrl = `${GITHUB_BASE}${path}?t=${Date.now()}`;
            const response = await fetch(fileUrl);
            
            if (!response.ok) return new Response(`Resource Not Found: ${path}`, { status: 404, headers: corsHeaders });
            
            let contentType = "text/plain";
            if (path.endsWith(".html")) contentType = "text/html";
            else if (path.endsWith(".css")) contentType = "text/css";
            else if (path.endsWith(".js")) contentType = "application/javascript";
            else if (path.endsWith(".json")) contentType = "application/json";
            else if (path.endsWith(".png")) contentType = "image/png";
            else if (path.endsWith(".ico")) contentType = "image/x-icon";

            return new Response(response.body, {
                headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                    ...corsHeaders
                }
            });
        } catch (e) {
            return new Response(`Substrate Error: ${e.message}`, { status: 500, headers: corsHeaders });
        }
    }

    // --- POST PROTOCOLS ---
    try {
      const body = await request.json();
      const { action } = body;
      
      // Simple Auth Fallback for Emergency Inhabitation
      if (action === "INHABIT") {
          return new Response(JSON.stringify({ status: "AUTHORIZED", data: { user: "Steward", tier: "MASTER" } }), { headers: corsHeaders });
      }

      return new Response(JSON.stringify({ status: "AWAITING_LOGIC" }), { headers: corsHeaders });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
    }
  }
};
