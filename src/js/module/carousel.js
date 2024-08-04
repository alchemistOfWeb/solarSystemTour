import * as constants from "../constants.js";
import * as bootstrap from "bootstrap";
import $ from "jquery";

export default class ChoicesCarousel {
    constructor(elementNode, elementsInView) {
        this.elementsInView = {};
        this.elementsInView.common = elementsInView.common ?? 1;
        this.elementsInView.sm = elementsInView.sm ?? this.elementsInView.common;
        this.elementsInView.md = elementsInView.md ?? this.elementsInView.sm;
        this.elementsInView.lg = elementsInView.lg ?? this.elementsInView.md;
        this.elementsInView.xl = elementsInView.xl ?? this.elementsInView.lg;

        this.elementNode = elementNode;
        this.scrollPosition = 0;
        this.setup()
    }

    getRealCarouselWidth(cardWidth=null) {
        let scrollWidth = this.elementNode.querySelector(".carousel-inner").scrollWidth;
        if (cardWidth) {
            return scrollWidth - scrollWidth % cardWidth;
        } else {
            return scrollWidth;
        }
    }

    getRealCardWidth() {
        return this.elementNode.querySelector(".carousel-item").offsetWidth;
    }

    createCarousel(interval=false) {
        if (!this.carousel) {
            this.carousel = new bootstrap.Carousel(this.elementNode, {interval});
        }
    }

    destroyCarousel() {
        delete this.carousel;
    }

    setup() {
        this.activate();
        $(window).on('resize', (e) => this.activate());
        window.carousel = this; // TMP
    }


    activate() {
        this.cardWidth = this.getRealCardWidth();
        this.carouselWidth = this.getRealCarouselWidth(this.cardWidth);
        this.createCarousel();
        const $tmp = $(this.elementNode).find(".carousel-control-prev");
        $tmp.off("click");
        $tmp.on("click", (e) => this.pressedPrevHandle());

        const $tmp2 = $(this.elementNode).find(".carousel-control-next");
        $tmp2.off("click");
        $tmp2.on("click", (e) => this.pressedNextHandle());
    }

    getNumElementsInView() {
        let screenWidth = window.innerWidth;
        if (screenWidth < constants.SCREENSIZES.sm) {
            return this.elementsInView.common;
        } else if (screenWidth < constants.SCREENSIZES.md) {
            return this.elementsInView.sm;
        } else if (screenWidth < constants.SCREENSIZES.lg) {
            return this.elementsInView.md;
        } else if (screenWidth < constants.SCREENSIZES.xl) {
            return this.elementsInView.lg;
        } else {
            return this.elementsInView.xl;
        }
    }

    scroll(distance) {
        // this.scrollPosition += distance;
        // if (this.scrollPosition < 0) this.scrollPosition = 0;
        // let elementsInView = this.getNumElementsInView();
        // let maxScroll = this.carouselWidth - this.cardWidth * elementsInView;
        // console.log({maxScroll});
        // if (this.scrollPosition > maxScroll) this.scrollPosition = maxScroll;
        let newScrollPos = this.scrollPosition + distance;
        if (newScrollPos < 0) {
            this.scrollPosition = 0;
            return;
        }
        
        let maxScroll = this.carouselWidth - this.cardWidth * this.getNumElementsInView();
        console.log('scrollItem ', {distance, newScrollPos, maxScroll, scrollPosition: this.scrollPosition});
        if (newScrollPos > maxScroll) return;
        this.scrollPosition = newScrollPos;
        this.animateScroll();
    }

    scrollItem(coef=1) {
        this.scroll(coef * this.cardWidth);
    }

    scrollItemLeft() {
        // console.log('scrollItemLeft');
        this.scrollItem(-1)
    }

    scrollItemRight() {
        // console.log('scrollItemRight');
        this.scrollItem(1)
    }

    pressedNextHandle() {
        // let elementsInView = this.getNumElementsInView();
        this.scrollItemRight();
        // if (this.scrollPosition < this.carouselWidth - this.cardWidth * elementsInView) {
        //     this.scrollItemRight();
        // }
    }

    pressedPrevHandle() {
        
        this.scrollItemLeft();
        // if (this.scrollPosition > 0) {
        //     this.scrollItemLeft();
        // }
    }

    animateScroll() {
        const carouselInner = this.elementNode.querySelector(".carousel-inner");
        $(carouselInner).animate(
            { scrollLeft: this.scrollPosition },
            600
        );
    }
}
