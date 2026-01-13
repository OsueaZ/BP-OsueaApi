import { system } from "@minecraft/server";

export class TickInterval {
    static run(ticks, callback) {

        return system.runInterval(() => {
            callback();
        }, ticks);
    }

    static stop(id) {
        system.clearRun(id);
    }
}
