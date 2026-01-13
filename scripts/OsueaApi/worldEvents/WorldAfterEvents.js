import { world } from "@minecraft/server";


//when opening a AcitonForm here, it MUST be in a function.
export class WorldAfterEvents {

    static itemUse(callback) { //This event will fire after an item is consumed/used.
        world.afterEvents.itemUse.subscribe((eventData) => {
            callback(eventData);
        });
    }

    static playerSpawn(callback) {
        world.afterEvents.playerSpawn.subscribe((eventData) => {
            callback(eventData);
        });
    } 9
}

