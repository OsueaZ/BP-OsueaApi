import { system } from "@minecraft/server";

export class TickInterval {
    // Static method to run a function every X ticks
    static run(ticks, callback) {
        if (typeof ticks !== "number" || ticks < 1) throw new Error("Ticks must be a positive number.");
        if (typeof callback !== "function") throw new Error("Callback must be a function.");

        return system.runInterval(() => {
            callback();
        }, ticks);
    }

    // Optional: helper to stop an interval
    static stop(id) {
        system.clearRun(id);
    }
}
