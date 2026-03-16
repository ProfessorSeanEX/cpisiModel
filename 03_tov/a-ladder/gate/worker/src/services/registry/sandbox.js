// worker/src/services/registry/sandbox.js

/**
 * THE SANDBOX SUBSTRATE
 * This module governs isolated execution within the .sandbox directory.
 */

export async function processSandboxAction(env, identity, command) {
    const opId = identity.user.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Log the sandbox attempt
    const event = {
        operator: identity.user,
        command: command,
        timestamp: new Date().toISOString(),
        scope: "ISOLATED_SANDBOX"
    };
    
    await env.REGISTRY.put(`SANDBOX_LOG:${opId}:${Date.now()}`, JSON.stringify(event));

    // Relay the command to the local Master Node via CLI_RELAY
    // The CLI agent will receive this and enforce the /.sandbox path restriction.
    const relayPayload = {
        action: "SANDBOX_EXECUTE",
        payload: {
            command: command,
            directory: ".sandbox",
            operator: identity.user
        }
    };

    await env.REGISTRY.put("CLI_STATE", JSON.stringify({ 
        tool: "SANDBOX_RELAY", 
        state: "PENDING", 
        payload: relayPayload,
        timestamp: Date.now() 
    }));

    return { status: "SENT_TO_SUBSTRATE", message: "Sandbox instruction relayed to Master Node." };
}
