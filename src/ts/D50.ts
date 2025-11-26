// Original codes in Javasctipt by Prof. Shigenobu Aoki
// http://aoki2.si.gunma-u.ac.jp/JavaScript/src/ld50.html
//
// modified by Typescript
// rename several variables

import { normal_pdf, normal_cdf, normal_inv } from "./functions_stat"


const MAX_LOOP = 100
const NORM975 =  1.959964;

interface Point {
  x: number;
  y: number;
}


export default class D50 {
    // input
    num: number
    x: number[]
    n: number[]
    r: number[]
    eps: number

    // internal
    _alpha: number = 0
    _beta: number = 0
    _alpha1: number = 0
    _beta1: number = 0
    ww: number = 0
    xbar: number = 0
    ssn_wx: number = 0

    // output
    _logD50: number = 0
    _D50: number = 0
    _ci: [number, number] = [0, 0]
    // _ollf: number = 0.0
    // _cllf: number = 0.0
    _convergence: boolean = false

    constructor(num: number, x: number[], n: number[], r: number[], eps: number) {
        this.num = num
        this.x = x
        this.n = n
        this.r = r
        this.eps = eps

        // start calculation
        this.estimation1()
        this.estimation2()
        if (this.isConvergence) {
            // logD50, D50, confidence interval
            this.calcValues()
        }
    }

    private estimation1(): void {
        let p: number   // rate[i]
        let y: number   // quantile point of rate[i]
        let sum_x = 0   // sum(x[i])
        let sum_x2 = 0  // sum(x[i]^2)
        let sum_y = 0   // sum(y[i])
        let sum_xy = 0  // sum(x[i] * y[i])

        // linear regression (y = alpha + beta * x)
        for (let i = 0; i < this.num; i++) {
            p = this.r[i] / this.n[i]
            if (p != 0 && p != 1) {
                y = normal_inv(p)
                sum_y += y
                sum_x += this.x[i]
                sum_x2 += this.x[i] * this.x[i]
                sum_xy += this.x[i] * y
                // this._ollf += this.r[i] * Math.log(p) + (this.n[i] - this.r[i]) * Math.log(1 - p)
            }
        }
        const nRSS = this.num * sum_x2 - sum_x * sum_x        // num * RSS
        this._alpha1 = (sum_x2 * sum_y - sum_xy * sum_x) / nRSS
        this._beta1 = (this.num * sum_xy - sum_x * sum_y) / nRSS
    }

    private estimation2(): void {
        let y: number;
        let p: number;
        let z: number;
        let w: number;
        let sum_wx: number;
        let sum_wx2: number;
        let sum_wy: number;
        let sum_wxy: number
        let ybar: number;
        let ssn_wxy: number;
        let alpha1: number;
        let beta1: number;
        let diffAlpha :number;
        let diffBeta: number;
        this._alpha = this._alpha1;
        this._beta = this._beta1;

        for (let loop = 0; loop < MAX_LOOP; loop++) {
            sum_wx = sum_wy = sum_wx2 = sum_wxy = this.ww = 0;
            for (let i = 0; i < this.num; i++) {
                y = this._alpha + this._beta * this.x[i];  // linear predictor
                p = normal_cdf(y);    // Cumulative distribution function (CDF)
                z = normal_pdf(y);    // Probability density function (PDF)
                y += (this.r[i] / this.n[i] - p) / z;
                w = z * z / p / (1 - p) * this.n[i];
                sum_wy += w * y;
                sum_wx += w * this.x[i];
                sum_wx2 += w * this.x[i] * this.x[i];
                sum_wxy += w * this.x[i] * y;
                this.ww += w;
                // this._cllf += this.r[i] * Math.log(p) + (this.n[i] - this.r[i]) * Math.log(1 - p);
            }

            this.xbar = sum_wx / this.ww;
            ybar = sum_wy / this.ww;
            this.ssn_wx = sum_wx2 - sum_wx * sum_wx / this.ww;  // Swx
            ssn_wxy = sum_wxy - sum_wx * sum_wy / this.ww;      // Swxy

            beta1 = ssn_wxy / this.ssn_wx;
            alpha1 = ybar - beta1 * this.xbar;

            // convergence?
            diffAlpha = Math.abs((this._alpha - alpha1) / this._alpha);
            diffBeta = Math.abs((this._beta - beta1) / this._beta);
            if (diffAlpha < this.eps && diffBeta < this.eps) {
                this._convergence = true;
                return
            }
            this._alpha = alpha1;
            this._beta = beta1;
        }
        // no convergence
        this._convergence = false;
        return
    }

    private calcValues(): void {
        // logD50, D50
        this._logD50 = -this._alpha / this._beta
        this._D50 = Math.exp(this._logD50)

        // // confidence interval
        const dev = this._logD50 - this.xbar;
        const g = (NORM975 / this._beta)**2 / this.ssn_wx;
        const cl = this._logD50 + g * dev / (1 - g);
        const pm = NORM975 / this._beta / (1 - g) * Math.sqrt((1 - g) / this.ww + dev**2 / this.ssn_wx);
        this._ci[0] = Math.exp(cl - pm)
        this._ci[1] = Math.exp(cl + pm)
    }

    // for fitted curve
    getCurvePosition(logx: number[], n: number): Point[] {
        const xmin = Math.min(...logx)
        const xmax = Math.max(...logx)
        const step = (xmax - xmin) / (n - 1)

        const xy: Point[] = [];
        for (let i = 0; i < n - 1; i++) {
            const x = xmin + step * i;
            const y = normal_cdf(this._alpha + this._beta * x);
            xy.push({x: x, y: y});
        }
        const y = normal_cdf(this._alpha + this._beta * xmax);
        xy.push({x: xmax, y: y});

        // return [x, y]
        return xy;
    }

    // get values
    get isConvergence(): boolean {
        return this._convergence
    }

    get logD50(): number {
        return  this._logD50
    }

    get D50(): number {
        return  this._D50
    }

    get CI(): [number, number] {
        return  this._ci
    }
}

