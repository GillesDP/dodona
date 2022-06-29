import { customElement, property } from "lit/decorators.js";
import { html, TemplateResult } from "lit";
import { ShadowlessLitElement } from "components/shadowless_lit_element";
import { ref, Ref, createRef } from "lit/directives/ref.js";

/**
 * This component represents an input field with a datalist with possible options for the input.
 *
 * @element d-datalist-input
 *
 * @prop {String} name - name of the input field (used in form submit)
 * @prop {[{label: string, value: string}]} options - The label is used to match the user input, while the value is sent to the server.
 *          If the user input does not match any label, the value sent to the server wil be ""
 * @prop {String} value - the initial value for this field
 * @prop {String} placeholder - placeholder text shown in input
 *
 * @fires input - on value change, event details contain {label: string, value: string}
 */
@customElement("d-datalist-input")
export class DatalistInput extends ShadowlessLitElement {
    @property({ type: String })
    name: string;
    @property({ type: Array })
    options: [{label: string, value: string, extra?: string}];
    @property({ type: String })
    value: string;
    @property({ type: String })
    placeholder: string;

    inputRef: Ref<HTMLInputElement> = createRef();
    hiddenInputRef: Ref<HTMLInputElement> = createRef();

    get label(): string {
        const option = this.options.find(option => option.value === this.value);
        return option?.label;
    }

    processInput(e): void {
        const option = this.options.find(option => option.label === this.inputRef.value.value);
        this.hiddenInputRef.value.value = option ? option.value : "";
        const event = new CustomEvent("input", {
            detail: { value: this.hiddenInputRef.value.value, label: this.inputRef.value.value },
            bubbles: true,
            composed: true }
        );
        this.dispatchEvent(event);
        e.stopPropagation();
    }

    render(): TemplateResult {
        return html`
            <input class="form-control" type="text" list="${this.name}-datalist-hidden" ${ref(this.inputRef)} @input=${e => this.processInput(e)}  value="${this.label}" placeholder="${this.placeholder}" autocomplete="off">
            <datalist id="${this.name}-datalist-hidden">
                ${this.options.map(option => html`<option value="${option.label}">${option.label}${option.extra ? ": " + option.extra : ""}</option>`)}
            </datalist>
            <input type="hidden" name="${this.name}" ${ref(this.hiddenInputRef)} value="${this.value}">
        `;
    }
}
