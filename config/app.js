const isProd = process.argv.includes("--production");
const isDev = !isProd;
// import info from "../data/info.json" assert { type: "json" };
import crew from  "../data/crew.json" assert { type: "json" };
import equipment from "../data/equipment.json" assert { type: "json" };
import flightpaths from "../data/flightpaths.json" assert { type: "json" };
import starships from "../data/starships.json" assert { type: "json" };

export default {
    isProd,
    isDev,
    htmlmin: {
        collapseWhitespace: isProd,
    },
    pug: {
        pretty: isDev,
        data: {
            crew,
            equipment,
            flightpaths,
            starships
        }
    },
    webpack: {
        mode: isProd ? "production" : "development"
    },
    imagemin: {
        verbose: true
    },
    fonter: {
        formats: ["ttf", "woff", "eot", "svg"]
    }
}