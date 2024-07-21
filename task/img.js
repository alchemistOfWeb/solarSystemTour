import path from "../config/path.js";
import app from "../config/app.js";

import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import gulpif from "gulp-if";


const img = () => {
    return gulp.src(path.img.src, {encoding: false})
    .pipe(plumber({
        errorHandler: notify.onError((error) => ({
            title: "Image",
            message: error.message
        })),
    }))
    .pipe(newer(path.img.dest))
    .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
    .pipe(gulp.dest(path.img.dest));
};

export default img;
