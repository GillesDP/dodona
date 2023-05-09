window.dodona.initCvgEditor = initCvgEditor;

import { init } from "cvg";

// TODO???
/** Identifiers used in HTML for relevant elements */
const OFFCANVAS_ID = "scratchpad-offcanvas";
const SHOW_OFFCANVAS_BUTTON_ID = "scratchpad-offcanvas-show-btn";
const CODE_COPY_BUTTON_ID = "scratchpad-code-copy-btn";
const CLOSE_BUTTON_ID = "scratchpad-offcanvas-close-btn";
const SUBMIT_TAB_ID = "activity-handin-link";

function initCvgEditor() {
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
    });

    // console.log(init);
    init();
}

window.dodona.initCvgEditor = initCvgEditor;
