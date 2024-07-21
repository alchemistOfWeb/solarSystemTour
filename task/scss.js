import path from "../config/path.js";
import app from "../config/app.js";

import { dest, src } from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import shorthand from "gulp-shorthand";
// import sass from "sass";
import * as sass from "sass";
import gulpsass from "gulp-sass";

const sassStream = gulpsass(sass)


const scss = () => {
    return src(path.scss.src, {sourcemaps: app.isProd})
    .pipe(plumber({
        errorHandler: notify.onError((error) => ({
            title: "SCSS",
            message: error.message
        })),
    }))
    .pipe(sassStream())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(size({title: "main.css"}))
    .pipe(dest(path.scss.dest, {sourcemaps: app.isProd}))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    .pipe(size({title: "main.min.css"}))
    .pipe(dest(path.scss.dest, {sourcemaps: app.isProd}))
};

export default scss;
