import * as types from "../Actions/GlobalStateActionTypes";
import Timer from "../Objects/Timer";
import User from "../Objects/User";

const initialState = {
    globalTimer: new Timer("global"),
    activityTick: 0,
    activity: "Idle",
    activityDetails: "",
    activityReset: 100,
    activityDelegate: null,
    activityParameters: {},
    activityIsRunning: false,
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
            activityIsRunning: true};
    }

    if (action.type === types.TICK_ACTIVITY_TIMER) {
        return {...state,
            activityTick: state.activityTick += 1}
    }

    if (action.type === types.RESET_ACTIVITY_TIMER) {
        return {...state,
            activityTick : 0};
    }

    if (action.type === types.STOP_ACTIVITY_TIMER) {
        return {...state,
            activity: "Idle", activityIsRunning: false, activityTick: 0, activityParameters: null, activityDetails: ""}
    }

    if (action.type === types.SET_ACTIVITY) {
        return {...state,
            activity: action.payload};
    }

    if (action.type === types.SET_ACTIVITY_PARAMS) {
        return {...state,
            activityParameters: action.payload};
    }

    if (action.type === types.SET_ACTIVITY_DELEGATE) {
        return {...state,
            activityDelegate: action.payload};
    }

    if (action.type === types.SET_ACTIVITY_THRESHOLD) {
        return {...state,
            activityReset: action.payload}
    }

    if (action.type === types.SET_ACTIVITY_DETAILS) {
        return {...state,
            activityDetails: action.payload}
    }
    return state;
}

export default GlobalStateReducer;