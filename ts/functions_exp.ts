import * as elem from "./elements";
import { Params, weightDist } from "./parameters";
import { langStr } from "./multilang_strings";
import {
    displayReactionStr,
    getSelectedLang,
    resetDisplayReaction,
} from "./functions_common";
import { normal_sample } from "./functions_stat";
import { playMovie } from "./functions_playMovie";


interface Params {
  Time: number;
  Mean: number;
  Sigma: number;
}


// global variables
let weight: number; // (g)
let z: number = 0;


// setting parameters at random
export function newExp(): void {
    // standard score for minimal toxic/lethal dose
    z = normal_sample();

    // set body weight
    weight = Math.round(
        normal_sample(weightDist.mean, weightDist.sigma) * 10
    ) / 10;
    // display weight and default injection volume
    elem.expWeight.textContent = weight.toFixed(1);
    elem.expInputVolume.value = (weight / 100).toFixed(3);

    resetDisplayReaction();
}


export function expDrugInjection(isMovie: boolean) {
    elem.expReaction.textContent = "---";

    // select parameter at selected judgment time
    const time = Number(elem.expSelectTime.value);
    const distToxic: Params = Params[0].filter(item => item.Time === time)[0];
    const distDeath: Params = Params[1].filter(item => item.Time === time)[0];

    // set minimal toxic/lethal dose
    const minToxicDose = Math.exp(distToxic["Mean"] + distToxic["Sigma"] * z);
    const minDeathDose = Math.exp(distDeath["Mean"] + distDeath["Sigma"] * z);

    const dose = calcDose(weight, getConc(), getVolume());
    const reaction = getReaction(dose, minToxicDose, minDeathDose);

    elem.expDoseTime.textContent = getStrDoseTime(dose, time);

    if (isMovie) {
        if (elem.settingSelectMovie.value === "1") {
            playMovie(reaction);
            elem.expVideo2.addEventListener("ended", () => {
                displayReactionStr(reaction);
            });
        } else {
            displayReactionStr(reaction);
        }
    } else {
        displayReactionStr(reaction);
    }
}



////////////////////////////////////////
// low-level functions (Element-independent)
////////////////////////////////////////

function getConc(): number {
    return Number(elem.expSelectConc.value);
}

function getVolume(): number {
    return Number(elem.expInputVolume.value); // (mL)
}

function calcDose(weight: number, conc: number, volume: number): number {
    return conc * volume / (weight / 1000); // (mg/kg)
}

function getStrDoseTime(dose: number, time: number): string {
    const lang = getSelectedLang();
    const str = langStr["dose"][lang] + dose.toFixed(1) + " mg/kg / " +
                langStr["time"][lang] + time + langStr["minute"][lang];
    return str 
}

// Return:
//   0: No reaction
//   1: Toxic
//   2: Death
function getReaction(dose: number,
                     minToxicDose: number,
                     minDeathDose: number): number {
    let res: number;
    if (dose < minToxicDose) {
        res = 0;
    } else if (dose < minDeathDose) {
        res = 1;
    } else {
        res = 2;
    }
    return(res);
}

