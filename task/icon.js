import path from "../config/path.js";
import app from "../config/app.js";

import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import gulpif from "gulp-if";


const icon = () => {
    return gulp.src(path.icon.src, {encoding: false})
    .pipe(plumber({
        errorHandler: notify.onError((error) => ({
            title: "Icon",
            message: error.message
        })),
    }))
    .pipe(newer(path.icon.dest))
    .pipe(gulp.dest(path.icon.dest));
};

export default icon;
