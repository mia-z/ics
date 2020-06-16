export default class Timer {
    constructor(activity, extra) {
        this.activity = activity;
        this.tick = 0;
        this.extra = extra;
        this.isRunning = false;
        this.id = -1;
        this.resetTick = 120;
    }
}