import * as types from "../Actions/GlobalStateActionTypes";
import Timer from "../Objects/Timer";
import User from "../Objects/User";

const initialState = {
    globalTimer: new Timer("global"),
    activityTimer: new Timer("Idle", null),
    exploreStats: {
        Villages: 0, Farmlands: 0, Forest: 0, Desert: 0
    },
    user: new User()
};

export const GlobalStateReducer = (state = initialState, action) => {
    if (action.type === types.TICK_GLOBAL_TIMER) {
        return {...state,
            globalTimer: {...state.globalTimer, tick: state.globalTimer.tick += 1}
        };
    }

    if (action.type === types.RESET_GLOBAL_TIMER) {
        return {...state,
            globalTimer: {...state.globalTimer, tick: 0}
        };
    }

    if (action.type === types.START_ACTIVITY_TIMER) {
        return {...state,
            activityTimer: {...state.activityTimer, isRunning: true}
        };
    }

    if (action.type === types.TICK_ACTIVITY_TIMER) {
        return {...state,
            activityTimer: {...state.activityTimer, tick: state.activityTimer.tick += 1}
        };
    }

    if (action.type === types.RESET_ACTIVITY_TIMER) {
        return {...state,
            activityTimer: {...state.activityTimer, tick: 0}
        };
    }

    if (action.type === types.STOP_ACTIVITY_TIMER) {
        return {...state,
            activityTimer: {...state.activityTimer, isRunning: false, tick: 0, activity: "Idle", extra: null}
        };
    }

    if (action.type === types.SET_ACTIVITY) {
        return {...state,
            activityTimer: {...state.activityTimer, activity: action.payload}
        };
    }

    if (action.type === types.SET_ACTIVITY_PARAMS) {
        return {...state,
            activityTimer: {...state.activityTimer, extra: action.payload}
        };
    }

    if (action.type === types.SET_ACTIVITY_DELEGATE) {
        return {...state,
            activityTimer: {...state.activityTimer, onDoneDelegate: action.payload}
        };
    }

    if (action.type === types.SET_ACTIVITY_THRESHOLD) {
        return {...state,
            activityTimer: {...state.activityTimer, resetTick: action.payload}
        };
    }

    if (action.type === types.APPLY_REWARD) {
        switch(action.payload.activity)
        {
            case "Explore": 
                return ExploreRewardState(state, action.payload);
            case "Mining":
                return MiningRewardState(state, action.payload);
            case "Woodcutting":
                return WoodcuttingRewardState(state, action.payload);
            default: return console.log("@@ERROR AT APPLY_REWARD ACTION IN GlobalStateReducer: action.payload.activity IS INCORRECT");
        }
    }
    return state;
};

const ExploreRewardState = (state, payload) => {
    //May need this later
    return { ...state };
}

const MiningRewardState = (state, payload) => {
    state.user.AddOre(payload.modifiers.extra, payload.modifiers.activeWorkers);
    return {...state, user: {...state.user } };
}

const WoodcuttingRewardState = (state, payload) => {
    state.user.AddWood(payload.modifiers.extra, payload.modifiers.activeWorkers);
    return {...state, user: {...state.user } };
}

export default GlobalStateReducer;