import store from "./../store";
import { TickTimer, ResetTimer, UpdateActivityTickers } from "./../Actions/Actions";
import { RewardBroker } from "./../RewardBroker";

export const TickSystem = () => {
    let props = store.getState();
    if (props.activityTickers.length !== 0) {
        store.dispatch(TickTimer());
        let tickActs = props.activityTickers.map(timer => {
            let newActState;
            if (timer.tick >= timer.resetTick) {
                //console.log(timer.extra);
                RewardBroker(timer.activity, { modifiers: { ...timer } });
                return newActState = {...timer, tick: timer.tick = 0};
            } else newActState = {...timer, tick: timer.tick += 1 }
            return newActState;
        }); 
        store.dispatch(UpdateActivityTickers(tickActs));
        //console.log("ticking in main");
        if (props.globalTicker.tick >= 100) {
            store.dispatch(ResetTimer());
            console.log("completed this round of tick", props.activityTickers);
        }
    }
}

export default TickSystem;