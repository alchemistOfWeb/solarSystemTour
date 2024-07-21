import path from "../config/path.js";
import app from "../config/app.js";

import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import webpack from "webpack-stream";


const js = () => {
    return gulp.src(path.js.src, {sourcemaps: app.isProd})
    .pipe(plumber({
        errorHandler: notify.onError((error) => ({
            title: "JS",
            message: error.message
        })),
    }))
    .pipe(babel())
    .pipe(webpack(app.webpack))
    .pipe(gulp.dest(path.js.dest, {sourcemaps: app.isProd}))
};

export default js;
