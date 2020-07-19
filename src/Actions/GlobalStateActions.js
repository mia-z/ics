import * as types from "../Actions/GlobalStateActionTypes";

const TickGlobalTimer = () => {
    return { type: types.TICK_GLOBAL_TIMER };
}

const ResetGlobalTimer = () => {
    return {type: types.RESET_GLOBAL_TIMER };
}

const ApplyReward = (activity, extraArgs) => {
    return {type: types.APPLY_REWARD, payload: { activity, ...extraArgs } };
}

const TickActivityTimer = () => {
    return {type: types.TICK_ACTIVITY_TIMER};
}

const ResetActivityTimer = () => {
    return {type: types.RESET_ACTIVITY_TIMER};
}

const StopActivityTimer = () => {
    return {type: types.STOP_ACTIVITY_TIMER};
}

const StartActivityTimer = () => {
    return {type: types.START_ACTIVITY_TIMER};
}

const SetActivity = (payload) => {
    return {type: types.SET_ACTIVITY, payload};
}

const SetActivityParams = (payload) => {
    return {type: types.SET_ACTIVITY_PARAMS, payload};
}

const SetActivityDelegate = (payload) => {
    return {type: types.SET_ACTIVITY_DELEGATE, payload};
}

const SetActivityThreshold = (payload) => {
    return {type: types.SET_ACTIVITY_THRESHOLD, payload};
}

export {
    TickGlobalTimer,
    ResetGlobalTimer,
    ApplyReward,
    TickActivityTimer,
    ResetActivityTimer,
    StopActivityTimer,
    StartActivityTimer,
    SetActivity,
    SetActivityParams,
    SetActivityDelegate,
    SetActivityThreshold
}