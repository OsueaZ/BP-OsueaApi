import { ActionFormData } from "@minecraft/server-ui";

export class ActionForm {
    constructor() {
        this._title = "";
        this._body = "";
        this._buttons = [];
        this._onCancel = null;
    }

    title(text) {
        this._title = String(text);
        return this;
    }

    body(text) {
        this._body = String(text);
        return this;
    }

    button(text, iconPath = "texture/blocks/barrier", callback = null, options = {}) {
        // Add button with default options
        this._buttons.push({
            text,
            iconPath,
            callback,
            options: {
                locked: options.locked ?? false,
                lockedMessage: options.lockedMessage ?? "§cThis button is locked.",
                confirm: options.confirm ?? false,                  // Enable confirmation
                confirmText: options.confirmText ?? "Are you sure?" // Confirmation text
            }
        });
        return this;
    }

    buttonIf(condition, text, iconPath = "texture/blocks/barrier", callback = null, options = {}) {
        if (condition) {
            return this.button(text, iconPath, callback, options);
        } else {
            return this.button(text, iconPath, null, {
                locked: true,
                lockedMessage: options.conditionFailureText ?? "§cYou failed to meet the requirement to use this button."
            });
        }
    }

    onCancel(callback) {
        this._onCancel = callback;
        return this;
    }

    show(player) {
        const form = new ActionFormData()
            .title(this._title)
            .body(this._body);

        // Add all buttons to the form
        for (const button of this._buttons) {
            button.iconPath
                ? form.button(button.text, button.iconPath)
                : form.button(button.text);
        }

        return form.show(player).then(response => {
            if (response.canceled) {
                if (this._onCancel) this._onCancel(player);
                return;
            }

            const button = this._buttons[response.selection];

            // Locked buttons
            if (button.options.locked) {
                player.sendMessage(button.options.lockedMessage);
                return;
            }

            // Confirmation
            if (button.options.confirm) {
                const confirmForm = new ActionFormData()
                    .title(button.text)
                    .body(button.options.confirmText)
                    .button("Yes")
                    .button("No");

                confirmForm.show(player).then(confirmResponse => {
                    if (!confirmResponse.canceled && confirmResponse.selection === 0) {
                        if (typeof button.callback === "function") button.callback(player, response.selection);
                    }
                });
                return;
            }

            // Normal callback
            if (typeof button.callback === "function") {
                button.callback(player, response.selection);
            }
        });
    }

    open(player) {
        return this.show(player);
    }
}
