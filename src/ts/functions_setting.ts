import * as elem from "./elements";
import { langStr } from "./multilang_strings";
import { Dose } from "./parameters";
import {
    getSelectedLang,
    getSelectedDoseIdx,
    resetDisplayReaction,
    makeInputTable,
} from "./functions_common";


// store setting values
//   restore when Cancel button is pushed
let saveMovie = "1";
let saveDoseIdx = "0";
let saveReactionIdx = "0";


////////////////////////////////////////
// Callback function
////////////////////////////////////////

export function settingChangeValues () {
    // set movie
    saveMovie = elem.settingSelectMovie.value;
    if (saveMovie === "1") {
        elem.expVideo1.hidden = false;
        elem.expVideo2.hidden = true;
    } else {
        elem.expVideo1.hidden = true;
        elem.expVideo2.hidden = true;
    }

    const doseIdx = getSelectedDoseIdx();
    const dose = Dose[doseIdx];

    // Experiment tab
    settingConcPulldownMenu(dose);  // set concentration to pulldown menu

    // Calculation tab
    if (String(doseIdx) != saveReactionIdx) {  // change dose
        // Experiment tab
        resetDisplayReaction();
        // Calculation tab
        elem.calcResultD50.style.display = "none";
        elem.calcResultArea.style.display = "none";
        elem.calcSelectReaction.value = doseIdx;  // select TD50/LD50
        makeInputTable(dose);                     // make input table
    }

    // Save variables for restore
    saveReactionIdx = doseIdx;
    saveDoseIdx = doseIdx;
};


export function settingRestoreValues() {
    // Restore values
    elem.calcSelectReaction.value = saveReactionIdx;
    elem.settingSelectMovie.value = saveMovie;
    elem.settingSelectDose.item(Number(saveDoseIdx)).checked = true;
};



////////////////////////////////////////
// utility functions
////////////////////////////////////////

// set at Experiment Tab
//   set drug concentration at pulldown menu
export function settingConcPulldownMenu(dose: number[]) {
    // delete all child elements
    while(elem.expSelectConc.firstChild) {
        elem.expSelectConc.removeChild(elem.expSelectConc.firstChild);
    }

    // set concentration as child elements
    for (let i = 0; i < dose.length; i++) {
        let op = document.createElement("option");
        const conc = dose[i] / 10;
        op.value = conc.toString();
        op.text = conc.toFixed(2) + " mg/mL";
        elem.expSelectConc.appendChild(op);
    }

    // select first item
    elem.expSelectConc.value = (dose[0] / 10).toString();
}


// set at Setting Tab
//   set Dose label (preset)
export function settingLabelDoseInit(): void {
    elem.settingDose0.textContent = joinNumber2Str(Dose[0], 1, " / ") + " (mg/kg)";
    elem.settingDose1.textContent = joinNumber2Str(Dose[1], 1, " / ") + " (mg/kg)";
}

function joinNumber2Str(data: number[], digit: number, sep: string): string {
    const result: string[] = data.map(x => {
        return String(x.toFixed(digit));
    });
    return result.join(sep);
}



////////////////////////////////////////
// multi-language
////////////////////////////////////////

interface TypeLang { [key: string]: string };
const langDefault = "en";

// elements with class="multilang"
const langEl = document.querySelectorAll<HTMLElement>(".multilang");


export function changeLang(): string {
    // selected language
    const lang = getSelectedLang();

    // change language at each id
    langEl.forEach((elem) => {
        // get each hash with class="multilang"
        const langId = elem["id"];

        if (langId in langStr) {
            // get hash with lang ("ja", "en", ...)
            const hashStr: TypeLang = langStr[langId]
            if (lang in hashStr) {
                elem.innerHTML = hashStr[lang];
            } else {
                elem.innerHTML = hashStr[langDefault];
            }
        };
    });

    return lang;
}


export function changeInputTableHeaderLang(lang: string) {
    // input table at Calculation tab
    const headerDose = <HTMLElement>document
        .getElementById("calc-table-input-header-dose")!;
    const headerTotal = <HTMLElement>document
        .getElementById("calc-table-input-header-total")!;
    const headerResponse = <HTMLElement>document
        .getElementById("calc-table-input-header-response")!;

    headerDose.innerText = langStr["headerDose"][lang];
    headerTotal.innerText = langStr["headerTotal"][lang];
    headerResponse.innerText = langStr["headerResponse"][lang];
}

