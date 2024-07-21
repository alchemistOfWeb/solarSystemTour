const isProd = process.argv.includes("--production");
const isDev = !isProd;
// import info from "../data/info.json" assert { type: "json" };

export default {
    isProd,
    isDev,
    htmlmin: {
        collapseWhitespace: isProd,
    },
    pug: {
        pretty: isDev,
        data: {}
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