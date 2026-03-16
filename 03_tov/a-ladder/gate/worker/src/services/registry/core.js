// worker/src/services/registry/core.js

export async function inhabitNode(env, opId, identity, tier, isEnterpriseSteward, profile = {}) {
    // Standard Inhabitation Logic
    const record = { 
        instance: identity.instance, 
        user: identity.user, 
        tier: tier, 
        joined: new Date().toISOString(),
        locked: false,
        profile: {
            fullName: profile.fullName || "",
            email: profile.email || "",
            bio: profile.bio || "",
            visibility: profile.visibility || { fullName: false, email: false, bio: true }
        }
    };
    
    // Store in general registry for lookups
    await env.REGISTRY.put(`REGISTRY:${opId}`, JSON.stringify(record));
    return record;
}

export async function createSovereignAccount(env, username, password, tier, profile, inviteCode) {
    const opId = username.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Check if username taken
    const existing = await env.REGISTRY.get(`USER:${opId}`);
    if (existing) throw new Error("This Identity Name has already been inhabited.");

    const userRecord = {
        username: username,
        password: password, // In production, hash this.
        tier: tier,
        profile: profile,
        created: new Date().toISOString()
    };

    // Burn the Invite
    await env.REGISTRY.put(`USED_INVITE:${inviteCode}`, JSON.stringify({ 
        by: username, timestamp: new Date().toISOString() 
    }));

    // Create the Account
    await env.REGISTRY.put(`USER:${opId}`, JSON.stringify(userRecord));
    
    // Create the Registry Entry
    return await inhabitNode(env, opId, { instance: "Dawndusk", user: username }, tier, false, profile);
}

export async function toggleLock(env, opId, identityUser, isEnterpriseSteward) {
    const existing = await env.REGISTRY.get(`REGISTRY:${opId}`);
    if (!existing) throw new Error("No Identity Record found to lock.");
    
    const record = JSON.parse(existing);
    if (record.user !== identityUser && !isEnterpriseSteward) {
        throw new Error("Unauthorized lock operation.");
    }
    
    record.locked = !record.locked;
    await env.REGISTRY.put(`REGISTRY:${opId}`, JSON.stringify(record));
    return record.locked;
}
