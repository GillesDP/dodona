import { init, set_code, copySolution, get_code } from "cvg";

/**
 * Custom interface to not have to add the ace package as dependency
 */
interface Editor {
    setValue(v: string): void;
    getValue(): string;
}

// TODO???
/** Identifiers used in HTML for relevant elements */
const OFFCANVAS_ID = "scratchpad-offcanvas";
const SHOW_OFFCANVAS_BUTTON_ID = "scratchpad-offcanvas-show-btn";
const CODE_COPY_BUTTON_ID = "scratchpad-code-copy-btn";
const CLOSE_BUTTON_ID = "scratchpad-offcanvas-close-btn";
const SUBMIT_TAB_ID = "activity-handin-link";

function initCvgEditor() {
    let editor: Editor | undefined = undefined;

    const closeButton = document.getElementById(CLOSE_BUTTON_ID);
    // To prevent horizontal scrollbar issues, we delay rendering the button
    // until after the page is loaded
    const showButton = document.getElementById(SHOW_OFFCANVAS_BUTTON_ID);
    showButton.classList.add("offcanvas-show-btn");
    showButton.classList.remove("hidden");
    showButton.addEventListener("click", async function () {
        // TODO??? singleton
    });
    // Ask user to choose after offcanvas is shown
    document.getElementById(OFFCANVAS_ID).addEventListener("shown.bs.offcanvas", () => {
        // TODO ???
        editor ||= window.dodona.editor;
        if(editor){
            const editorCode = editor.getValue();
            const currentCode = get_code();
            if (!editorCode.includes('{')){
                if (!currentCode || 
                    (editorCode && currentCode !== editorCode &&
                        confirm(I18n.t("js.coding_scratchpad.overwrite_code")))) {
                    set_code(editorCode);
                    init();
                    document.getElementById("btn-copy").onclick = function() {
                        editor.setValue(copySolution());
                        closeButton.click();
                        document.getElementById(SUBMIT_TAB_ID)?.click();
                    }
                }
            }
        }
    });
}

export { initCvgEditor }