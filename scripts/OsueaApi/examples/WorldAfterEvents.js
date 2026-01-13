import { world } from "@minecraft/server";
import { WorldAfterEvents } from "../worldEvents/WorldAfterEvents";

//when opening a AcitonForm here, it MUST be in a function.

//This event will fire after an item is consumed/used.
WorldAfterEvents.itemUse((eventData) => {
});

//This event will fire after a player spawns.
WorldAfterEvents.playerSpawn((eventData) => {
});

//This event will fire after a player sends a chat message.
WorldAfterEvents.chatSend((eventData) => {
})