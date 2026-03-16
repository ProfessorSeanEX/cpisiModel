// worker/src/services/registry/core.js

export async function inhabitNode(env, opId, identity, tier, isEnterpriseSteward, profile = {}) {
    // Check if node is locked
    const existing = await env.REGISTRY.get(opId);
    if (existing) {
        const record = JSON.parse(existing);
        if (record.locked && !isEnterpriseSteward) {
            throw new Error("This CPISI Node is LOCKED. Enterprise Stewardship bypass required.");
        }
    }

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
    
    await env.REGISTRY.put(opId, JSON.stringify(record));
    return record;
}

export async function toggleLock(env, opId, identityUser, isEnterpriseSteward) {
    const existing = await env.REGISTRY.get(opId);
    if (!existing) throw new Error("No Identity Record found to lock.");
    
    const record = JSON.parse(existing);
    if (record.user !== identityUser && !isEnterpriseSteward) {
        throw new Error("Unauthorized lock operation.");
    }
    
    record.locked = !record.locked;
    await env.REGISTRY.put(opId, JSON.stringify(record));
    return record.locked;
}
