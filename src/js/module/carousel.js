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


function activateCarousel(selectorStr) {

    const $starshipCarouselControls = $(selectorStr);
    if (window.matchMedia(`(min-width: ${constants.SCREENSIZES.md}px)`).matches) {
        var carousel = new bootstrap.Carousel($starshipCarouselControls, {
            interval: false,
        });
        var carouselWidth = $(".carousel-inner")[0].scrollWidth;
        var cardWidth = $(".carousel-item").width();
        var scrollPosition = 0;
        
        $starshipCarouselControls.find(".carousel-control-next").on("click", function () {
            console.log("information: ", {scrollPosition, carouselWidth, cardWidth});
            if (scrollPosition < carouselWidth - cardWidth * 4) {
                scrollPosition += cardWidth;
                $starshipCarouselControls.find(".carousel-inner").animate(
                    { scrollLeft: scrollPosition },
                    600
                );
            }
        });
        $starshipCarouselControls.find(".carousel-control-prev").on("click", function () {
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                $starshipCarouselControls.find(".carousel-inner").animate(
                    { scrollLeft: scrollPosition },
                    600
                );
            }
        });
    } else {
        $starshipCarouselControls.addClass("slide");
    }
}
