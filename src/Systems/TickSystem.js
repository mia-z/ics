import store from "./../store";
import { TickTimer, ResetTimer, UpdateActivityTickers, AssignTimerId } from "./../Actions/GlobalStateActions";
import { ExploreTile } from "../Actions/ExplorationStateActions";
import { RewardBroker } from "./../RewardBroker";

export const StartTickSystem = () => {
    let ticker = setInterval(TickSystem, 16);
    store.dispatch(AssignTimerId(ticker));
}

export const TickSystem = () => {
    let state = store.getState().GlobalState;
    if (state.activityTickers.length !== 0) {
        store.dispatch(TickTimer());
        let tickActs = state.activityTickers.filter(timer => {
            let newActState;
            if (timer.tick >= timer.resetTick) {
                //console.log(timer.extra);
                RewardBroker(timer.activity, { modifiers: { ...timer } });
                if (timer.activity === "Explore") {
                    timer.onDone();
                    return false;
                }
                return {...timer, tick: timer.tick = 0 };
            } else newActState = {...timer, tick: timer.tick += 1 }
            return newActState;
        });
        store.dispatch(UpdateActivityTickers(tickActs));
        //console.log("ticking in main");
        if (state.globalTicker.tick >= 100) {
            store.dispatch(ResetTimer());
            //console.log("completed this round of tick", state.activityTickers);
        }
    }
}

export default TickSystem;