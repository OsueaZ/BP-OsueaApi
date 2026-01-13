import { world } from "@minecraft/server";


export class WorldAfterEvents {

    static itemUse(callback) {
        world.afterEvents.itemUse.subscribe((eventData) => {
            callback(eventData);
        });
    }

    static playerSpawn(callback) {
        world.afterEvents.playerSpawn.subscribe((eventData) => {
            callback(eventData);
        });
    }

    static chatSend(callback) {
        world.afterEvents.chatSend.subscribe((eventData) => {
            callback(eventData);
        });
    }
}

// world.afterEvents.