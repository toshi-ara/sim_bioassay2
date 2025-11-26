import * as elem from "./elements";


const moviesYes = [
    "001-animation.mp4",
    "002-animation.mp4",
    "003-animation.mp4",
    "004-animation.mp4",
    "005-animation.mp4",
    "006-animation.mp4",
    "007-animation.mp4",
    "008-animation.mp4",
    "009-animation.mp4",
    "010-animation.mp4",
];

const moviesNo = [
    "101-animation.mp4",
    "102-animation.mp4",
    "103-animation.mp4",
    "104-animation.mp4",
    "105-animation.mp4",
    "106-animation.mp4",
    "107-animation.mp4",
    "108-animation.mp4",
    "109-animation.mp4",
    "110-animation.mp4",
];

const playlist1 = "./movie/injection-animation.mp4";
let playlist2: string;


export function playMovie(reaction: number) {
    let movies: string[];

    if (reaction == 0) {
        movies = moviesNo; // no response
    } else {
        movies = moviesYes; // toxic and/or death
    }

    const index = Math.floor(Math.random() * movies.length);
    playlist2 = "./movie/" + movies[index];

    elem.expVideo1.src = playlist1;
    elem.expVideo1.style.display = "block";
    elem.expVideo2.style.display = "none";

    // play next movie
    elem.expVideo1.addEventListener("ended", () => {
        elem.expVideo1.style.display = "none";
        elem.expVideo2.style.display = "block";
        elem.expVideo2.src = playlist2;
        elem.expVideo2.play();
    });
}

