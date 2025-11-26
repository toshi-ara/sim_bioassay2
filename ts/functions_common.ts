import * as elem from "./elements";
import { langStr } from "./multilang_strings";
import { Dose } from "./parameters";


const reactionsD50 = ["TD₅₀", "LD₅₀"];


// get selected Dose from Setting tab (preset)
export function getSelectedDoseIdx(): string {
    const idx = document.querySelector<HTMLSelectElement>(
        'input[name="setting-select-dose"]:checked'
    )!.value;
    return idx;
}

export function getSelectedDose(): number[] {
    const idx = getSelectedDoseIdx();
    return Dose[Number(idx)];
}

export function getSelectedLang(): string {
    return elem.selectLang.value;
}

// get TD50 or LD50
export function getSelectedReaction(): string {
    const idx = elem.calcSelectReaction.value;
    return reactionsD50[idx];
}


// display reaction at Experiment tab
export function displayReactionStr(reaction: number) {
    const lang = getSelectedLang();
    elem.expReaction.textContent = langStr["reaction"][lang][reaction];
}

export function resetDisplayReaction() {
    const lang = getSelectedLang();
    elem.expDoseTime.textContent = langStr["wait"][lang];
    elem.expReaction.textContent = "---";
}



// set at Calculation Tab
//   set dose at input table
export function makeInputTable(dose: number[]) {
    const elemTbl = elem.calcInputTable;
    elemTbl.innerText = "";

    const thead = document.createElement("thead");
    const headtr = document.createElement("tr");
    const tbody = document.createElement("tbody");

    // header
    elemTbl.appendChild(thead);
    thead.appendChild(headtr);

    const th1 = document.createElement("th");
    th1.textContent = "Dose (mg/kg)";
    th1.setAttribute("id", "calc-table-input-header-dose");
    headtr.appendChild(th1);

    const th2 = document.createElement("th");
    th2.textContent = "Total";
    th2.setAttribute("id", "calc-table-input-header-total");
    headtr.appendChild(th2);

    const th3 = document.createElement("th");
    th3.textContent = "Response";
    th3.setAttribute("id", "calc-table-input-header-response");
    headtr.appendChild(th3);

    // contents
    elemTbl.appendChild(tbody);
    // dose.forEach((x: number) => {
    for (let i = 0; i < dose.length; i++) {
        const x = dose[i];
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const td1 = document.createElement("td");
        td1.setAttribute("class", "align-middle");
        td1.textContent = x.toFixed(1);
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.setAttribute("class", "align-middle");
        const input2 = document.createElement("input");
        input2.setAttribute("class", "calc-total");
        input2.setAttribute("type", "tel");
        input2.setAttribute("id", "calc-total-" + i);
        td2.appendChild(input2);
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.setAttribute("class", "align-middle");
        const input3 = document.createElement("input");
        input3.setAttribute("class", "calc-response");
        input3.setAttribute("type", "tel");
        input3.setAttribute("id", "calc-response-" + i);
        td3.appendChild(input3);
        tr.appendChild(td3);
    };
}

export function makeResultTable(dose: number[],
                                total: number[],
                                response: number[]) {
    const elemTbl = elem.calcResultTable;
    const lang = getSelectedLang();
    let rateResponse: number[] = [];

    for (let i = 0; i < dose.length; i++) {
        rateResponse[i] = response[i] / total[i]
    }

    // clear table
    elemTbl.innerText = "";

    const thead = document.createElement("thead");
    const headtr = document.createElement("tr");
    const tbody = document.createElement("tbody");

    // header
    elemTbl.appendChild(thead);
    thead.appendChild(headtr);

    const th1 = document.createElement("th");
    th1.textContent = langStr["headerDose"][lang];
    th1.setAttribute("id", "calc-table-result-header-dose");
    headtr.appendChild(th1);

    const th2 = document.createElement("th");
    th2.textContent = langStr["headerTotal"][lang];
    th2.setAttribute("id", "calc-table-result-header-total");
    headtr.appendChild(th2);

    const th3 = document.createElement("th");
    th3.textContent = langStr["headerResponse"][lang];
    th3.setAttribute("id", "calc-table-result-header-response");
    headtr.appendChild(th3);

    const th4 = document.createElement("th");
    th4.textContent = langStr["headerRate"][lang];
    th4.setAttribute("id", "calc-table-result-header-rate");
    headtr.appendChild(th4);

    // contents
    elemTbl.appendChild(tbody);
    for (let i = 0; i < dose.length; i++) {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const td1 = document.createElement("td");
        td1.setAttribute("class", "align-middle");
        td1.textContent = dose[i].toFixed(1);
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.setAttribute("class", "align-middle");
        td2.textContent = total[i].toFixed(0);
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.setAttribute("class", "align-middle");
        td3.textContent = response[i].toFixed(0);
        tr.appendChild(td3);

        const td4 = document.createElement("td");
        td4.setAttribute("class", "align-middle");
        td4.textContent = (rateResponse[i] * 100).toFixed(1);
        tr.appendChild(td4);
    }
}

