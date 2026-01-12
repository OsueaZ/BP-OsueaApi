import { ActionForm } from "../forms/ActionForm.js";

// Example Action Form
export const mainMenu = new ActionForm()
    .title("Example Action Form") // This is the title of the form
    .body("This is an example of an action form.") // This is the body text of the form


    // LAYOUT: button(text, iconPath, callback/code block, { locked, lockedMessage })
    .button("Button 1", null, (player, index) => { // Every button can use the player and index parameters, the first buttons index is 0, the second is 1, and so on
        player.sendMessage(`You clicked Button ${index + 1}`);
    })


    // LAYOUT: button(text, iconPath, callback/code block, { locked, lockedMessage })
    .button("Button 2", null, (player, index) => { // The code inside the code block in this case its player.sendMessage, will run when the button is clicked
        player.sendMessage(`You clicked Button ${index + 1}`);
    }, { confirm: true, confirmText: "Are you sure you want to click this button?" }) // This button has a confirmation option, when clicked it will ask the player to confirm before running the code block


    // LAYOUT: button(text, iconPath, callback/code block, { locked, lockedMessage })
    .button("Button 3\nExample locked button", null, (player, index) => {
        player.sendMessage(`You clicked Button ${index + 1}`);
    }, { locked: true, lockedMessage: "§cYou cannot click this button yet." }) // Getting more advanced with button options, this button is locked and cannot be clicked and
    // will show the lockedMessage when clicked

    //**
    //    ---WARNING--- in the button if condition you can see im usening player.hasTag("exampleTag") but the player is not defined yet, you must wrap the whole form in a function to use player specific conditions
    //    an example is at the bottom of this file with no comments, this buttonIf will NOT work because its not in a function that takes player as a parameter.

    //    LAYOUT: buttonIf(condition, text, iconPath, callback/code block, { conditionFailureText })
    //    .buttonIf(player.hasTag("exampleTag"), "Button 4", null, (player, index) => {
    //        player.sendMessage(`You clicked Button ${index + 1}`);
    //    }, { conditionFailureText: "§cYou need the exampleTag to use this button." }) 
    // 
    //    Example of buttonIf, this button will only be clickable if the player has the "exampleTag" tag, otherwise
    //    it will be locked and show the conditionFailureText, if the condition is failed it will lock the button instead of running the code block, like the button above
    //*

    // Same as above but with multiple conditions, it works just like an if statement
    // LAYOUT: buttonIf(condition, text, iconPath, callback/code block, { conditionFailureText })
    //     .buttonIf(player.hasTag("exampleTag") && player.hasTag("exampleTag2"), "Button 5", null, (player, index) => {
    //     player.sendMessage(`You clicked Button ${index + 1}`);
    // }, { conditionFailureText: "§cYou need the exampleTag and exampleTag2 to use this button." })

    .onCancel((player) => {
        player.sendMessage("You closed the form without making a selection."); // This code runs if the player closes the form without clicking a button
    });

// 2 Ways to show or open the form for the player
// mainMenu.show(player);
// mainMenu.open(player);






// Example of wrapping the form in a function to use player specific conditions
export function secondMenu(player) {
    const secondMenu = new ActionForm()
        .title("Example Action Form")
        .body("This is an example of an action form.")

        .button("Button 1", null, (player, index) => {
            player.sendMessage(`You clicked Button ${index + 1}`);
        })

        .button("Button 2", null, (player, index) => {
            player.sendMessage(`You clicked Button ${index + 1}`);
        }, { confirm: true, confirmText: "Are you sure you want to click this button?" })

        .button("Button 3\nExample locked button", null, (player, index) => {
            player.sendMessage(`You clicked Button ${index + 1}`);
        }, { locked: true, lockedMessage: "§cYou cannot click this button yet." })

        .buttonIf(player.hasTag("exampleTag"), "Button 4", null, (player, index) => {
            player.sendMessage(`You clicked Button ${index + 1}`);
        }, { conditionFailureText: "§cYou need the exampleTag to use this button." })

        .buttonIf(player.hasTag("exampleTag") && player.hasTag("exampleTag2"), "Button 5", null, (player, index) => {
            player.sendMessage(`You clicked Button ${index + 1}`);
        }, { conditionFailureText: "§cYou need the exampleTag and exampleTag2 to use this button." })

        .onCancel((player) => {
            player.sendMessage("You closed the form without making a selection.");
        });

    //Must use open here to ensure the form uses the latest player data for conditions
    secondMenu.open(player);
}

// 2 Way to show/open the form for the player
// secondMenu(player);