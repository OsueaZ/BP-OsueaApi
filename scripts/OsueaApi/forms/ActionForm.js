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
        this._buttons.push({
            text,
            iconPath,
            callback,
            options: {
                locked: options.locked ?? false,
                lockedMessage: options.lockedMessage ?? "§cThis button is locked.",
                confirm: options.confirm ?? false,
                confirmText: options.confirmText ?? "Are you sure?"
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

            if (button.options.locked) {
                player.sendMessage(button.options.lockedMessage);
                return;
            }

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

            if (typeof button.callback === "function") {
                button.callback(player, response.selection);
            }
        });
    }

    open(player) {
        return this.show(player);
    }
}
