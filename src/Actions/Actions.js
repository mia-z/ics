import { TICK_TIMER, RESET_TIMER, APPLY_REWARD, UPDATE_ACTIVITY_TICKERS, UPDATE_WORKERS } from "./ActionTypes";

const TickTimer = (payload) => {
    return { type: TICK_TIMER, payload }
}

const ResetTimer = (payload) => {
    return {type: RESET_TIMER, payload }
}

const ApplyReward = (activity, extraArgs) => {
    return {type: APPLY_REWARD, payload: { activity, ...extraArgs } }
}

const UpdateActivityTickers = (payload) => {
    return {type: UPDATE_ACTIVITY_TICKERS, payload}
}

const UpdateWorkers = (payload) => {
    return {type: UPDATE_WORKERS, payload}
}

export {
    TickTimer,
    ResetTimer,
    ApplyReward,
    UpdateActivityTickers,
    UpdateWorkers
}