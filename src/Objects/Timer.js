export default class Timer {
    constructor(activity, extra, resetAt = 100, overrideIsRunning = false) {
        this.activity = activity;
        this.tick = 0;
        this.extra = extra;
        this.isRunning = overrideIsRunning;
        this.id = -1;
        this.resetTick = resetAt;
        this.activeWorkers = 0;
    }
}