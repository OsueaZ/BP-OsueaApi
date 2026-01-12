import { ModalForm } from "../forms/ModalForm.js";

// Example ModalForm
export function thirdMenu(player) {
    const form = new ModalForm()
        .title("Bedrock Mega Form") // Title at the top of the form

        .input("Your Username:", "Steve...", "JeffTheMiner")
        // Text field players can type something
        // First parameter: label shown on the form
        // Second: placeholder text (faded text shown before typing)
        // Third: default value (pre-filled text)

        .toggle("Enable Creative Mode?", false)
        // Toggle: simple true/false switch
        // Second parameter is the default value (true or false)

        .slider("Difficulty Level", 0, 10, 1, 0)
        // Slider: numeric range
        // Parameters: label, min, max, step, defaultValue

        .dropdown("Choose your Biome:", ["Plains", "Desert", "Ocean", "Nether"])
        // Dropdown: choose one option from a list
        // Parameters: label, array of options

        // CONFIRMATION (optional)
        .confirm(true)
        // If true, shows a Yes/No form before submitting
        .confirmText("Are you sure you want to submit this form?")
        // Custom text for the confirmation form

        .onSubmit((player, responses) => {
            // Called when the player submits the form
            // "responses" is an array of the inputs in the order you added them
            const [username, creative, difficulty, biomeIndex] = responses;

            player.sendMessage(`§aForm Submitted!`);
            player.sendMessage(`§7Username: §f${username}`);
            player.sendMessage(`§7Creative: §f${creative}`);
            player.sendMessage(`§7Difficulty: §f${difficulty}`);
            player.sendMessage(`§7Biome Index: §f${biomeIndex}`);
        })
        .onCancel((player) => {
            // Called if the player closes the form without submitting
            player.sendMessage("§cYou closed the form without submitting!");
        });

    // To show the form to a player:
    form.open(player);
}






//Default Modal Form Data example code below
// import { ModalFormData } from "@minecraft/server-ui";

// // Function to show the "Everything" form
// export function thirdMenu(player) {
//     const thirdMenu = new ModalFormData();

//     thirdMenu.title("Bedrock Mega Form");

//     // 1. TextField: Free text input (Placeholder, Default Text)
//     thirdMenu.textField("Write your username:", "Steve...", {
//         defaultValue: 'JeffTheMiner',
//         tooltip: "This will be your in-game name."
//     });

//     // 2. Toggle: A simple switch (True/False)
//     thirdMenu.toggle("Enable Creative Mode?");

//     // 3. Slider: Numeric range (Label, Min, Max, Step, Default)
//     thirdMenu.slider("Difficulty Level", 0, 10, { valueStep: 1, defaultValue: 0 });

//     // 4. Dropdown: Choose one from a list (Label, Options[], DefaultIndex)
//     thirdMenu.dropdown("Choose your Biome:", ["Plains", "Desert", "Ocean", "Nether"]);

//     thirdMenu.show(player).then(response => {
//         if (response.canceled) return;
//         // Extracting the data (stored in an array in the order added)
//         const [name, isCreative, difficulty, biomeIndex] = response.formValues;

//         player.sendMessage(`§aForm Submitted!`);
//         player.sendMessage(`§7Name: §f${name}`);
//         player.sendMessage(`§7Toggle: §f${isCreative}`);
//         player.sendMessage(`§7Slider: §f${difficulty}`);
//         player.sendMessage(`§7Biome Index: §f${biomeIndex}`);
//     })
// }