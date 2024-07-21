// const sum = require("./module/sum.js");
import AOS from "aos";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;
document.addEventListener('DOMContentLoaded', () => {
    console.log("using wow1");
    new AOS.init({
        duration: 2000,
        once: true
    });
    console.log("using wow2");
});
