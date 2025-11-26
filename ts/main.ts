import * as elem from "./elements"
import { Dose } from "./parameters"
import {
    makeInputTable,
    resetDisplayReaction,
} from "./functions_common"
import { newExp, expDrugInjection } from "./functions_exp"
import { calcD50 } from "./functions_calc"
import {
    settingConcPulldownMenu,
    settingLabelDoseInit,
    settingChangeValues,
    settingRestoreValues,
    changeLang,
    changeInputTableHeaderLang,
    // changeResultTableHeaderLang,
} from "./functions_setting"


let initConcIdx = 0;
let isWait = true;



///////////////////////////////////////
// change state of UI
///////////////////////////////////////
function setUIState(state: string): void {
    if (state === "initial") {
        // div
        elem.divInitial.style.display = "block";
        elem.divExperiment.style.display = "none";
        elem.divCalculation.style.display = "none";
        elem.divSetting.style.display = "none";
    } else if (state === "experiment") {
        // div
        elem.divInitial.style.display = "none";
        elem.divExperiment.style.display = "block";
        elem.divCalculation.style.display = "none";
        elem.divSetting.style.display = "none";
        //movie
        elem.expVideo1.style.display = "block";
        elem.expVideo2.style.display = "none";
    } else if (state === "calculation") {
        // div
        elem.divInitial.style.display = "none";
        elem.divExperiment.style.display = "none";
        elem.divCalculation.style.display = "block";
        elem.divSetting.style.display = "none";
    } else if (state === "setting") {
        // div
        elem.divInitial.style.display = "none";
        elem.divExperiment.style.display = "none";
        elem.divCalculation.style.display = "none";
        elem.divSetting.style.display = "block";
    }
}



///////////////////////////////////////
// Set callback functions
///////////////////////////////////////

// Common: Back buttion
function backInitial(): void {
    setUIState("initial");
};


// Initial Tab
elem.expBtn.addEventListener("click", () => {
    setUIState("experiment")
});
elem.calcBtn.addEventListener("click", () => {
    setUIState("calculation")
});
elem.settingBtn.addEventListener("click", () => {
    setUIState("setting")
});
elem.selectLang.addEventListener("change", () => {
    const lang = changeLang();    // change language of "lang-" tags
    // Experiment tab
    if (isWait) {
        resetDisplayReaction();
    } else {
        expDrugInjection(false);
    }
    // Calculation tab
    changeInputTableHeaderLang(lang);       // input table
    if (elem.calcResultD50.innerHTML.trim() !== "") {
        calcD50(false);
    };
});

// Experiment Tab
elem.expAdministrationBtn.addEventListener("click", () => {
    expDrugInjection(true);
    isWait = false;
});
elem.expNewExpBtn.addEventListener("click", () => {
    newExp();
    isWait = true;
});
elem.expBackBtn.addEventListener("click", backInitial);


// TD50/LD50 Calculation Tab
elem.calcD50Btn.addEventListener("click", () => {
    calcD50(true)
});
elem.calcBackBtn.addEventListener("click", backInitial);


// Settings tab
elem.settingChangeBtn.addEventListener("click", () => {
    settingChangeValues();
    backInitial()
});

elem.settingCancelBtn.addEventListener("click", () => {
    settingRestoreValues();
    backInitial()
});



///////////////////////////////////////
// Initialization
///////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    // initial settings
    const initDose = Dose[initConcIdx];
    settingConcPulldownMenu(initDose);    // Experiment tab
    makeInputTable(initDose);             // Calculation tab
    settingLabelDoseInit();               // Setting tab
    newExp();

    setUIState("initial");
});

