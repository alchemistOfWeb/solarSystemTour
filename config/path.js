const pathSrc = "./src";
const pathDest = "./public";

export default {
    root: pathDest,
    html: {
        src: pathSrc + "/html/*.html",
        watch: pathSrc + "/html/**/*.html",
        dest: pathDest
    },
    pug: {
        src: pathSrc + "/pug/*.pug",
        watch: pathSrc + "/pug/**/*.pug",
        dest: pathDest
    },
    css: {
        src: pathSrc + "/css/*.css",
        watch: pathSrc + "/css/**/*.css",
        dest: pathDest + "/css"
    },
    scss: {
        src: pathSrc + "/scss/*.{scss,sass}",
        watch: pathSrc + "/scss/**/*.{scss,sass}",
        dest: pathDest + "/css"
    },
    js: {
        src: pathSrc + "/js/*.js",
        watch: pathSrc + "/js/**/*.js",
        dest: pathDest + "/js"
    },
    img: {
        src: pathSrc + "/img/*.{jpg,jpeg,png,gif,svg}",
        watch: pathSrc + "/img/**/*.{jpg,jpeg,png,gif,svg}",
        dest: pathDest + "/img"
    },
    font: {
        src: pathSrc + "/font/*.{ttf,otf,eot,otc,ttc,woff,woff2,svg}",
        watch: pathSrc + "/font/**/*.{ttf,otf,eot,otc,ttc,woff,woff2,svg}",
        dest: pathDest + "/fonts"
    },
}