import { system, world } from "@minecraft/server";
import { WorldAfterEvents } from "./OsueaApi/worldEvents/WorldAfterEvents.js";
import { mainMenu, secondMenu } from "./OsueaApi/examples/ActionForm.js";
import { thirdMenu } from "./OsueaApi/examples/ModalForm.js";
import { TickInterval } from "./OsueaApi/runInterval.js";

WorldAfterEvents.itemUse((eventData) => {
    const player = eventData.source;
    const item = eventData.itemStack;

    switch (item.typeId) {
        case "minecraft:stick": return system.runTimeout(() => secondMenu(player));
        case "minecraft:diamond": return system.runTimeout(() => thirdMenu(player));
    }
});

WorldAfterEvents.playerSpawn((eventData) => {
    const player = eventData.player;
    if (!eventData.initialSpawn) return;
    secondMenu(player);
});

WorldAfterEvents.chatSend((eventData) => {
    const player = eventData.sender;
    const message = eventData.message;

    world.sendMessage(`§8[§3Osu§bea§f-Api§8] §f${player.name} §8> §7${message}`)
})

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
