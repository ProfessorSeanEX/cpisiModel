// worker/src/services/social.js

export async function publishToMirror(env, identity, vaultBlock) {
    const mirrorId = `mirror_${Date.now()}`;
    const record = {
        id: mirrorId,
        operator: identity.user,
        tier: identity.tier,
        content: vaultBlock,
        published: new Date().toISOString()
    };
    
    // Store in a dedicated public mirror namespace or key prefix
    await env.REGISTRY.put(`MIRROR:${mirrorId}`, JSON.stringify(record));
    
    // Maintain a list of recent mirror posts
    const existing = await env.REGISTRY.get('MIRROR_FEED');
    let feed = existing ? JSON.parse(existing) : [];
    feed.unshift(record);
    feed = feed.slice(0, 50); // Keep last 50
    await env.REGISTRY.put('MIRROR_FEED', JSON.stringify(feed));
    
    return record;
}

export async function getMirrorFeed(env) {
    const feed = await env.REGISTRY.get('MIRROR_FEED');
    return feed ? JSON.parse(feed) : [];
}
