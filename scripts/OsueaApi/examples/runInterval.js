import { TickInterval } from "../runInterval";

// Run every 20 ticks (~1 second)
const intervalId = TickInterval.run(20, () => {
    console.warn("Tick happened!");
});

// Stop it after 5 seconds (100 ticks)
const intervalId2 = TickInterval.run(100, () => {
    TickInterval.stop(intervalId);
    TickInterval.stop(intervalId2);
    console.warn("Interval stopped!");
});
