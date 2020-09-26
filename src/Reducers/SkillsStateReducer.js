import * as types from "../Actions/SkillsStateActionTypes";
import { DidLevelUp } from "../Tools";

const initialState = {
    DidLevelUp: false,
    SkillsLevelledUpThisTurn: [],
    Woodcutting: {name: "Woodcutting", xp: 0, level: 1},
    Mining: {name: "Mining", xp: 0, level: 1},
    Strength: {xp: 0, level: 1},
    Stamina: {xp: 0, level: 1},
    Defence: {xp: 0, level: 1},
    Health: {xp: 0, level: 1},
}

export const SkillsStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.APPLY_WOODCUTTING_XP:
            if (DidLevelUp(state.Woodcutting.level, state.Woodcutting.xp + action.xp))
                return {...state,
                    Woodcutting: {...state.Woodcutting, level: state.Woodcutting.level + 1, xp: state.Woodcutting.xp +action.xp},
                    DidLevelUp: true,
                    SkillsLevelledUpThisTurn: [...state.SkillsLevelledUpThisTurn, { skill: "Woodcutting", newLevel:state.Woodcutting.level + 1 }]
                };
            else
                return {...state,
                    Woodcutting: {...state.Woodcutting, level: state.Woodcutting.level, xp: state.Woodcutting.xp + action.xp},
                };

        case types.APPLY_MINING_XP:
            if (DidLevelUp(state.Mining.level, state.Mining.xp + action.xp))
                return {...state,
                    Mining: {...state.Mining, level: state.Mining.level + 1, xp: state.Mining.xp + action.xp},
                    DidLevelUp: true,
                    SkillsLevelledUpThisTurn: [...state.SkillsLevelledUpThisTurn, { skill: "Mining", newLevel:state.Mining.level + 1 }]
                };
            else
                return {...state,
                    Mining: {...state.Mining, level: state.Mining.level, xp: state.Mining.xp + action.xp},
                };

        case types.RESET_HAS_LEVELLED_UP:
            return {...state,
                DidLevelUp: false,
                SkillsLevelledUpThisTurn: []
            };

        default: return {...state};
    }
}
