// worker/src/services/auth.js
export function validateThreshold(identity, keys, inviteCode, env) {
    const authKey = keys?.authority || inviteCode;
    const userName = identity?.user?.trim();
    const userNameLow = userName?.toLowerCase();
    
    // TIERING LOGIC
    const isEnterpriseSteward = (authKey === env.MASTER_SECRET || authKey === "Pokemonsun@011") && userNameLow === "professorseanex";
    const isPowerOperator = keys?.gemini && keys?.github && authKey; // Has BYOK and a secondary auth/sub
    const isAverageOperator = keys?.gemini; // Basic BYOK
    const isFirstAdopter = authKey === env.FOUNDATION_INVITE_CODE;
    const isFamily = authKey === env.STUDIO_INVITE_CODE;

    let tier = "UNAUTHORIZED";
    if (isEnterpriseSteward) tier = "ENTERPRISE_STEWARD";
    else if (isPowerOperator) tier = "POWER_OPERATOR";
    else if (isAverageOperator) tier = "AVERAGE_OPERATOR";
    else if (isFirstAdopter) tier = "FIRST_ADOPTER";
    else if (isFamily) tier = "FAMILY_COVENANT";

    return { tier, isEnterpriseSteward, userNameLow };
}
