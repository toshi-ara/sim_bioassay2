//////////////////////////////////
// statistical functions
//////////////////////////////////

const M_SQ_PI2 = 0.398942280401432677940;
const M_SQ_2 = 0.7071067811865475;

// Random generation according to standard normal distribution
// Box-Muller transform
// https://qiita.com/kyonsi/items/579a61edab661f27e3a5
export function normal_sample(mu = 0, sd = 1): number {
    let x = Math.random();
    let y = Math.random();
    let z1 = Math.sqrt(-2 * Math.log(x)) * Math.cos(2 * Math.PI  * y);
    // let z2 = Math.sqrt(-2 * Math.log(x)) * Math.sin(2 * Math.PI  * y);
    return mu + z1 * sd;
}


export function normal_pdf(x: number): number {
    return Math.exp(-x * x / 2) * M_SQ_PI2
}

// Cumulative distribution function (CDF)
// q -> p
// Abramowitz and Stegun (1964) formula 7.1.26
// precision: abs(err) < 1.5e-7
export function normal_cdf(x: number, upper: boolean = false): number {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    // AS formula 7.1.26
    const sign = x < 0 ? -1 : 1;
    const xx = Math.abs(x) * M_SQ_2;  // = Math.abs(x) / Math.sqrt(2);
    const t = 1 / (1 + p * xx)
    const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-xx * xx);

    const signup = upper ? -1 : 1;
    return (1 + signup * sign * erf) * 0.5;
}

// http://aoki2.si.gunma-u.ac.jp/JavaScript/ld50.html
// inverse normal disribution
// p -> q
//
// Toda, H.:
//   An Optimal Rational Approximation for Normal deviates for Digital Computers.
//   Bull. Electrotech. Lab, Vol. 31, No. 12, pp. 1259-1270 (1967)
//
// (improve when p is near 0.5)
// Hideo TODA, Harumi ONO:
//   The Minimax Approximation for Percentage Points of
//     the Standard Normal Distribution. [in Japanese]
//   Japanese journal of applied statistics 22(1) 13-21 (1993)
//   (https://doi.org/10.5023/jappstat.22.13)
//
export function normal_inv(p: number): number {
    const b0 = 0.1570796288e+1
    const b1 = 0.3706987906e-1
    const b2 = -0.8364353589e-3
    const b3 = -0.2250947176e-3
    const b4 = 0.6841218299e-5
    const b5 = 0.5824238515e-5
    const b6 = -0.1045274970e-5
    const b7 = 0.8360937017e-7
    const b8 = -0.3231081277e-08
    const b9 = 0.3657763036e-10
    const b10 = 0.69362339826e-12

    // improve when p is near 0.5
    let y;
    if (p < 0.48972 || p > 0.51028) {
        y = -Math.log(4 * p * (1 - p))
    } else {
        const e = 0.5 - p
        y = 4 * Math.pow(e, 2) + 8 * Math.pow(e, 4)
    }

    let x = Math.sqrt((((((((((((y * b10 + b9) * y + b8) * y + b7) * y + b6) * y + b5) * y + b4) * y + b3) * y + b2) * y + b1) * y + b0) * y))
    if (p < 0.5) {
        x = -x
    }
    return x
}

