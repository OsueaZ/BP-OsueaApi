import { system, World } from "@minecraft/server";
import { WorldAfterEvents } from "./OsueaApi/worldEvents/WorldAfterEvents.js";
import { mainMenu, secondMenu } from "./OsueaApi/examples/ActionForm.js";
import { thirdMenu } from "./OsueaApi/examples/ModalForm.js";

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