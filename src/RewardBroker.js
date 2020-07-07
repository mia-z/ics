import store from "./store";
import { ApplyReward } from "./Actions/GlobalStateActions";

export const RewardBroker = (activity, modifiers = null) => store.dispatch(ApplyReward(activity, { ...modifiers }))