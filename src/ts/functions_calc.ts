import * as elem from "./elements";
import D50 from "./D50";
import {
    getSelectedLang,
    getSelectedDose,
    getSelectedReaction,
    makeResultTable,
} from "./functions_common";
import { langStr } from "./multilang_strings";
import { plotCurve } from "./functions_plot";
import { Chart } from "chart.js"


interface Point {
  x: number;
  y: number;
}
let chart: Chart;


export function calcD50(plot: boolean): void {
    // must define elements in function
    const calcTotal = document
        .querySelectorAll<HTMLInputElement>(".calc-total")!;
    const calcResponse = document
        .querySelectorAll<HTMLInputElement>(".calc-response")!;

    // selected dose and reaction
    const dose = getSelectedDose();
    const reaction = getSelectedReaction();

    let logDose: number[] = [];
    let total: number[] = [];
    let response: number[] = [];
    let responseRate: number[] = [];
    let curveResponse: Point[] = [];
    let strResultD50: string;

    // get data from input table at Calculation tab
    for (let i = 0; i < dose.length; i++) {
        logDose[i] = Math.log(dose[i])
        total[i] = Number(calcTotal[i].value);
        response[i] = Number(calcResponse[i].value);
        responseRate[i] = response[i] / total[i];  // for plot
    }

    const d50 = new D50(dose.length, logDose, total, response, 10E-6);
    if (d50.isConvergence) {
        curveResponse = d50.getCurvePosition(logDose, 101);
        strResultD50 = `${reaction} = ${d50.D50.toFixed(1)} (mg/kg)`;
    } else {
        curveResponse = [];
        const lang = getSelectedLang();
        strResultD50 = `${reaction}${langStr["d50Str"][lang]}`;
    }

    // display results
    elem.calcResultD50.style.display = "block";
    elem.calcResultArea.style.display = "block";

    elem.calcResultD50.textContent = strResultD50;
    makeResultTable(dose, total, response);

    if (plot) {
        if (chart) {
            chart.destroy()
        }
        chart = plotCurve(elem.ctx, logDose, responseRate, curveResponse, d50.logD50)
    }
}

