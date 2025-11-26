///////////////////////////////////////
// elements
///////////////////////////////////////
// div (Tabs)
export const divInitial = <HTMLElement>document
    .getElementById("initial")!;
export const divExperiment = <HTMLElement>document
    .getElementById("experiment")!;
export const divCalculation = <HTMLElement>document
    .getElementById("calculation")!;
export const divSetting = <HTMLElement>document
    .getElementById("setting")!;

// Initial Tab
export const header = document
    .getElementById("initial-header")!;
export const expBtn = <HTMLInputElement>document
    .getElementById("initial-exp-btn")!;
export const calcBtn = <HTMLInputElement>document
    .getElementById("initial-calc-btn")!;
export const concBtn = <HTMLInputElement>document
    .getElementById("initial-conc-setting-btn")!;
export const settingBtn = <HTMLInputElement>document
    .getElementById("initial-setting-btn")!;
export const selectLang = <HTMLSelectElement>document
    .getElementById("initial-select-lang")!;

// Experiment Tab
export const expWeight = <HTMLElement>document
    .getElementById("exp-weight")!;
export const expSelectConc = <HTMLSelectElement>document
    .getElementById("exp-select-conc")!;
export const expInputVolume = <HTMLInputElement>document
    .getElementById("exp-volume")!;
export const expSelectTime = <HTMLSelectElement>document
    .getElementById("exp-select-time")!;

export const expBackBtn = <HTMLInputElement>document
    .getElementById("exp-back-btn")!;
export const expNewExpBtn = <HTMLInputElement>document
    .getElementById("exp-newexp-btn")!;
export const expAdministrationBtn = <HTMLInputElement>document
    .getElementById("exp-administration-btn")!;

export const expDoseTime = <HTMLElement>document
    .getElementById("exp-dose-time")!;
export const expReaction = <HTMLElement>document
    .getElementById("exp-reaction")!;
export const expVideo1 = <HTMLVideoElement>document
    .getElementById("exp-video1")!;
export const expVideo2 = <HTMLVideoElement>document
    .getElementById("exp-video2")!;


// TD50/LD50 Calculation Tab
export const calcInputTable = <HTMLTableElement>document
    .getElementById("calc-input-table")!;
export const calcSelectReaction = <HTMLInputElement>document
    .getElementById("calc-select-reaction")!;
export const calcResultD50 = <HTMLElement>document
    .getElementById("calc-result-d50")!;

export const calcResultArea = <HTMLElement>document
    .getElementById("calc-result-area")!;
export const calcResultTable = <HTMLTableElement>document
    .getElementById("calc-result-table")!;
export const calcResultPlot = <HTMLCanvasElement>document
    .getElementById("calc-result-plot")!;
export const ctx = <CanvasRenderingContext2D>calcResultPlot.getContext("2d");

export const calcBackBtn = <HTMLInputElement>document
    .getElementById("calc-back-btn")!;
export const calcD50Btn = <HTMLInputElement>document
    .getElementById("calc-d50-btn")!;


// Setting Tab
// movie
export const settingSelectMovie = <HTMLSelectElement>document
    .getElementById("setting-select-movie")!;

// radio button for select concentration
export const settingSelectDose = document
    .getElementsByName("setting-select-dose") as NodeListOf<HTMLInputElement>;

export const settingDose0 = <HTMLElement>document
    .getElementById("setting-dose0")!;
export const settingDose1 = <HTMLElement>document
    .getElementById("setting-dose1")!;

// buttons
export const settingCancelBtn = <HTMLInputElement>document
    .getElementById("setting-cancel-btn")!;
export const settingChangeBtn = <HTMLInputElement>document
    .getElementById("setting-change-btn")!;

