import path from "./config/path.js";

import gulp from "gulp";
import browserSync from "browser-sync";

import pug from "./task/pug.js";
import clear from "./task/clear.js";
import scss from "./task/scss.js";
import js from "./task/js.js";
import img from "./task/img.js";
import font from "./task/font.js";
import app from "./config/app.js";


const watcher = () => {
    // does it works or need to use browserSync.create()?
    gulp.watch(path.pug.watch, pug).on("all", browserSync.reload);
    gulp.watch(path.scss.watch, scss).on("all", browserSync.reload);
    gulp.watch(path.js.watch, js).on("all", browserSync.reload);
    gulp.watch(path.img.watch, img).on("all", browserSync.reload);
    gulp.watch(path.font.watch, font).on("all", browserSync.reload);
};

const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    })
}

const build = gulp.series(
    clear,
    gulp.parallel(pug, scss, js, font, img)
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server)
);

export { pug, scss, js, img, font, watcher, clear }
export default app.isProd ? build : dev;
