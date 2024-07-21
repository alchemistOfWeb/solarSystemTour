const path = require("../config/path.js");
const app = require("../config/app.js")

const { dest, src } = require("gulp");
const fileinclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");


const html = () => {
    return src(path.html.src)
    .pipe(plumber({
        errorHandler: notify.onError((error) => ({
            title: "HTML",
            message: error.message
        })),
    }))
    .pipe(fileinclude())
    .pipe(htmlmin(app.htmlmin))
    .pipe(dest(path.html.dest))
};

module.exports = html;
