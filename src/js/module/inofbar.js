import $ from "jquery";
// import * as constants from "../constants.js";

export default class Infobar {
    constructor(infobarSelector) {
        this.infobarObject = $(infobarSelector);
        // this.activeInterval = {start: -100, end: -400};
        this.disabledSections = ["header", "startGame"]
    }

    // isInActiveInterval(pos) {
    //     return pos > this.activeInterval.start && pos < this.activeInterval.end;
    // }

    activatePagesliderGoHandling() {
        $(document).on("pageSlider:go", (event, currentSlide) => {
            if (this.disabledSections.includes(currentSlide.slidename)) {
                this.hide();
            } else {
                this.show();
            }
        })
    }
    deactivatePagesliderGoHandling() {
        $(document).off("pageSlider:go");
    }

    hide(duration=700) {
        // this.infobarObject.addClass();
        this.infobarObject.animate({'top':'-120px'}, duration, 'swing'); // hiden
    }

    show(duration=700) {
        // this.infobarObject.addClass();
        this.infobarObject.animate({'top':'0'}, duration, 'swing'); // active
    }
}