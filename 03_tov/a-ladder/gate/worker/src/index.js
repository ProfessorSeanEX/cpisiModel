import { validateThreshold } from './services/auth.js';
import { inhabitNode, toggleLock } from './services/registry/core.js';
import { ascendStream } from './services/gemini.js';
import { syncCovenantRecord } from './services/github.js';
import { publishToMirror, getMirrorFeed } from './services/social.js';

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin");
    const corsHeaders = {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    
    // NEUTRAL START
    if (request.method === "GET") return new Response(JSON.stringify({ status: "AWAITING_INHABITATION", version: "a-01.50" }), { headers: corsHeaders });

    try {
      const body = await request.json();
      const { action, identity, keys, inviteCode, message, vaultBlock, profile } = body;
      
      const { tier, isEnterpriseSteward, userNameLow } = validateThreshold(identity, keys, inviteCode, env);

      // ==========================================
      // THE REGISTRY & SOCIAL PROTOCOLS
      // ==========================================
      
      if (action === "REGISTER") {
          if (tier === "UNAUTHORIZED") throw new Error("Invalid Registration Key.");
          const record = await inhabitNode(env, userNameLow.replace(/[^a-z0-9]/g, '_'), identity, tier, isEnterpriseSteward, profile);
          return new Response(JSON.stringify({ status: "REGISTERED", data: record }), { headers: corsHeaders });
      }

      if (action === "INHABIT") {
        if (tier === "UNAUTHORIZED") throw new Error("Invalid Threshold Keys.");
        const record = await inhabitNode(env, userNameLow.replace(/[^a-z0-9]/g, '_'), identity, tier, isEnterpriseSteward, profile);
        return new Response(JSON.stringify({ status: "AUTHORIZED", data: record }), { headers: corsHeaders });
      }

      if (action === "PUBLISH_TOV") {
          if (tier === "UNAUTHORIZED") throw new Error("Unauthorized publish.");
          const record = await publishToMirror(env, identity, vaultBlock);
          return new Response(JSON.stringify({ status: "PUBLISHED", data: record }), { headers: corsHeaders });
      }

      if (action === "GET_MIRROR") {
          const feed = await getMirrorFeed(env);
          return new Response(JSON.stringify({ status: "SUCCESS", data: feed }), { headers: corsHeaders });
      }

      // Action to LOCK/UNLOCK node
      if (action === "TOGGLE_LOCK") {
        const opId = identity.user.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const isLocked = await toggleLock(env, opId, identity.user, isEnterpriseSteward);
        return new Response(JSON.stringify({ status: "SUCCESS", locked: isLocked }), { headers: corsHeaders });
      }

      // ==========================================
      // THE STREAMING MIND (ASCENSION)
      // ==========================================
      if (action === "ASCEND") {
        const isOverride = message.trim() === "/RECALL" || message.trim() === "[MASTER OVERRIDE]";
        if (isOverride) {
           if (!isEnterpriseSteward) throw new Error("Unauthorized: Threshold Override requires Steward Signature.");
           const resetMsg = `data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: `[SYSTEM INTERCEPT] Master Identity Verified. Cognitive drift purged. State reset to 0.0 YASHAR.` }] } }] })}\n\n`;
           return new Response(resetMsg, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
        }

        const opId = identity.user.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        const stream = await ascendStream(message, identity, keys, env, ctx, async (fullReply) => {
            await syncCovenantRecord(env, identity, opId, message, fullReply);
        });

        return new Response(stream, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
      }

      throw new Error("Invalid Action Protocol.");

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  }
};
