import $ from "jquery";

const DEFAULT_DURATION = 500;

var slidesDefault = [
    {
        slidename: "header",
        marginRatio: 0
    },
    {
        slidename: "starshipChoice",
        marginRatio: 1
    },
    {
        slidename: "equipmentChoice",
        marginRatio: 2
    },
    {
        slidename: "flightpathChoice",
        marginRatio: 3
    },
    {
        slidename: "crewChoice",
        marginRatio: 4
    },
    {
        slidename: "startGame",
        marginRatio: 5
    }
];

export default class PageSlider {
    constructor(sliderSelector) {
        this.measure = "vh";
        this.slideHeight = -100;
        this.sliderObject = $(sliderSelector); // The element for which we set the margin so that pageSlider works.
        this.slides = slidesDefault; // TEST IT
        this.currentSlide = this.slides[0];
        this.margin = 0;
    }

    // getMaxMargin() {
    //     let maxRatio = Math.max(...this.slides.map(slide => slide.marginRatio));
    //     return maxRatio * this.slideHeight;
    // }

    getMargin() {
        return this.margin;
    }
    changePositionSlide($object, newPos, duration=500) {
        $object.animate({marginTop: `${newPos}${measuer}`}, duration, 'swing');
    }

    addSlide(slidename, marginRatio) {
        this.slides.push({ slidename, marginRatio });
    }

    removeSlide(slidename) {
        this.slides = this.slides.filter(slide => slide.slidename !== slidename);
    }

    getSlideByName(slidename) {
        return this.slides.find(slide => slide.slidename === slidename)
    }
        
    slideTo(slidename, duration=DEFAULT_DURATION) {
        const targetSlide = this.getSlideByName(slidename);
        if (targetSlide) {
            this.currentSlide = targetSlide;
            this.margin = this.currentSlide.marginRatio * this.slideHeight;
            this.animateSlide(this.margin, duration);
        }
    }

    goNext(duration=DEFAULT_DURATION) {
        const currentIndex = this.slides.indexOf(this.currentSlide);
        if (currentIndex < this.slides.length - 1) {
            this.currentSlide = this.slides[currentIndex + 1];
            this.margin = this.currentSlide.marginRatio * this.slideHeight;
            this.animateSlide(this.margin, duration);
        }
    }

    goBack(duration=DEFAULT_DURATION) {
        const currentIndex = this.slides.indexOf(this.currentSlide);
        if (currentIndex > 0) {
            this.currentSlide = this.slides[currentIndex - 1];
            this.margin = this.currentSlide.marginRatio * this.slideHeight;
            this.animateSlide(this.margin, duration);
        }
    }

    animateSlide(margin, duration=DEFAULT_DURATION) {
        let marginStr = margin + this.measure;
        this.sliderObject.animate({ marginTop: marginStr }, duration, 'swing');
    }
}