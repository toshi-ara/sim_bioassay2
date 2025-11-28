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
let isFirstMovie = false;


export function playMovie(reaction: number) {
    let movies: string[];

    if (reaction == 0) {
        movies = moviesNo; // no response
    } else {
        movies = moviesYes; // toxic and/or death
    }

    const index = Math.floor(Math.random() * movies.length);
    playlist2 = "./movie/" + movies[index];

    // initialization
    const v1 = elem.expVideo1;
    const v2 = elem.expVideo2;

    // muted is necessary to autoplay in iOS
    v1.muted = true;
    v2.muted = true;

    if (isFirstMovie) {
        v1.src = playlist1;
        v1.style.display = "block";
        v2.style.display = "none";

        // register ended once for next movie
        v1.onended = () => {
            v1.style.display = "none";
            v2.style.display = "block";
            v2.src = playlist2;

            // async/await to avoid block of play() in iPhone
            v2.play().catch(err => {
                console.log("Autoplay blocked:", err);
            });
        };

        // necesarry in iOS
        v1.play().catch(err => {
            console.log("Autoplay blocked:", err);
        });
    } else {
        v2.src = playlist2;
        v1.style.display = "none";
        v2.style.display = "block";

        v2.play().catch(err => {
            console.log("Autoplay blocked:", err);
        });
    }
}

