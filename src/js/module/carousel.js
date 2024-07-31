import * as constants from "../constants.js";
import * as bootstrap from "bootstrap";
import $ from "jquery";

export default class ChoicesCarousel {
    constructor(elementNode, elementsInView=4) {
        this.elementsInView = elementsInView;
        this.elementNode = elementNode;
        console.log("point 'before CarouselWidth'");
        this.carouselWidth = this.getRealCarouselWidth();
        console.log("point 'before cardlWidth'");
        this.cardWidth = this.getRealCardWidth();
        this.scrollPosition = 0;
    }

    getRealCarouselWidth() {
        console.log(this.elementNode);
        return this.elementNode.querySelector(".carousel-inner").scrollWidth;
    }

    getRealCardWidth() {
        return this.elementNode.querySelector(".carousel-item").offsetWidth;
    }

    createCarousel() {
        console.log("point 'create'");
        this.carousel = new bootstrap.Carousel(this.elementNode, {interval: false});
    }

    destroyCarousel() {
        delete this.carousel;
    }

    activate() {
        console.log("point 'activate'");
        if (window.matchMedia(`(min-width: ${constants.SCREENSIZES.md}px)`).matches) {
            this.createCarousel();
            this.elementNode.querySelector(".carousel-control-prev")
                .addEventListener("click", (e) => this.pressedPrevHandle());
            this.elementNode.querySelector(".carousel-control-next")
                .addEventListener("click", (e) => this.pressedNextHandle());
        }
    }

    pressedNextHandle() {
        if (this.scrollPosition < this.carouselWidth - this.cardWidth * this.elementsInView) {
            this.scrollPosition += this.cardWidth;

            this.animateScroll();
        }
    }

    pressedPrevHandle() {
        if (this.scrollPosition > 0) {
            this.scrollPosition -= this.cardWidth;
            this.animateScroll();
        }
    }

    animateScroll() {
        const carouselInner = this.elementNode.querySelector(".carousel-inner");
        $(carouselInner).animate(
            { scrollLeft: this.scrollPosition },
            600
        );
    }
}
