import { ModalFormData, ActionFormData } from "@minecraft/server-ui";

export class ModalForm {
    constructor() {
        this._title = "";
        this._inputs = [];
        this._onSubmit = null;
        this._onCancel = null;
        this._confirm = false; // Confirm before submit
        this._confirmText = "Are you sure?"; // Default confirmation message
    }

    title(text) {
        this._title = String(text);
        return this;
    }

    input(label, placeholder = "", defaultValue = "") {
        this._inputs.push({
            type: "input",
            label,
            placeholder,
            defaultValue
        });
        return this;
    }

    toggle(label, defaultValue = false) {
        this._inputs.push({
            type: "toggle",
            label,
            defaultValue
        });
        return this;
    }

    slider(label, min, max, step = 1, defaultValue = null) {
        this._inputs.push({
            type: "slider",
            label,
            min,
            max,
            step,
            defaultValue: defaultValue ?? min
        });
        return this;
    }

    dropdown(label, options = []) {
        if (!Array.isArray(options) || options.length === 0) {
            throw new Error("Dropdown options must be a non-empty array of strings.");
        }
        this._inputs.push({
            type: "dropdown",
            label,
            options
        });
        return this;
    }

    onSubmit(callback) {
        this._onSubmit = callback;
        return this;
    }

    onCancel(callback) {
        this._onCancel = callback;
        return this;
    }

    // Confirm before submitting
    confirm(value = true) {
        this._confirm = value;
        return this;
    }

    // Custom text for the confirmation
    confirmText(text) {
        this._confirmText = String(text);
        return this;
    }

    show(player) {
        const form = new ModalFormData().title(this._title);

        for (const field of this._inputs) {
            switch (field.type) {
                case "input":
                    form.textField(field.label, field.placeholder, { defaultValue: field.defaultValue });
                    break;
                case "toggle":
                    form.toggle(field.label, { defaultValue: field.defaultValue });
                    break;
                case "slider":
                    form.slider(field.label, field.min, field.max, { valueStep: field.step, defaultValue: field.defaultValue });
                    break;
                case "dropdown":
                    form.dropdown(field.label, field.options);
                    break;
            }
        }

        return form.show(player).then(response => {
            if (response.canceled) {
                if (this._onCancel) this._onCancel(player);
                return;
            }

            // If confirm is enabled, show a Yes/No form first
            const proceed = () => {
                if (this._onSubmit) this._onSubmit(player, response.formValues);
            };

            if (this._confirm) {
                const confirmForm = new ActionFormData()
                    .title(this._confirmText)
                    .button("Yes")
                    .button("No");

                confirmForm.show(player).then(c => {
                    if (!c.canceled && c.selection === 0) proceed();
                });
            } else {
                proceed();
            }
        });
    }

    open(player) {
        return this.show(player);
    }
}
