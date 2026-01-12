import { world } from "@minecraft/server";
import { mainMenu, secondMenu } from "./OsueaApi/examples/ActionForm.js";



world.afterEvents.itemUse.subscribe(data => {
    const { source, itemStack } = data
    const player = source
    switch (itemStack.typeId) {
        case "minecraft:stick": return secondMenu(player);
    }
})