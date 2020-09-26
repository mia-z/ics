import * as types from "./SkillsStateActionTypes";

const ApplyWoodcuttingXp = (xp) => {
    return {type: types.APPLY_WOODCUTTING_XP, xp};
}

const ApplyMiningXp = (xp) => {
    return {type: types.APPLY_MINING_XP, xp};
}

const ResetHasLevelledUp = () => {
    return {type: types.RESET_HAS_LEVELLED_UP};
}

export {
    ApplyWoodcuttingXp,
    ApplyMiningXp,
    ResetHasLevelledUp
};
