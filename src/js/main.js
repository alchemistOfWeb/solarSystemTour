// const sum = require("./module/sum.js");
// import AOS from "aos";
// import * as bootstrap from "bootstrap";
// window.bootstrap = bootstrap;
// document.addEventListener('DOMContentLoaded', () => {
//     console.log("using wow1");
//     new AOS.init({
//         duration: 2000,
//         once: true
//     });
//     console.log("using wow2");
// });
import * as constants from "./constants.js";
import $ from "jquery";
import * as popper from "@popperjs/core";
import * as bootstrap from "bootstrap";
import tippy from 'tippy.js';
import ChoicesCarousel from './module/carousel.js';
import * as verification from './module/verify_inputs.js';
window.$ = $;

function checkboxLimitation(checkboxSelector, num){
    // deprecated function
    // TODO: replace with new code
    const $crewMembers = $(checkboxSelector);
    $crewMembers.on("change", ()=>{
        if($(`${checkboxSelector}:checked`).length >= num){
            $(`${checkboxSelector}:not(:checked)`).attr('disabled','disabled');
            $crewMembers.addClass('little-choise-container__radio-input-js_red');
        }else{
            $(`${checkboxSelector}:disabled`).removeAttr('disabled');
            $crewMembers.removeClass('little-choise-container__radio-input-js_red');
        }
    });
}

function checkboxChangeInfo(checkboxSelector, infoSelector) {
    // deprecated handling of a choice
    // TODO: update for new version of code
    $(checkboxSelector).on("change", ()=>{
        $(infoSelector).text($(`${checkboxSelector}:checked`).attr('value'));
    });
}



function changePositionSlide($object, newPos) {
    $object.animate({marginTop: `${newPos}vh`}, 500,'swing');
}

function infoBarHide($selector, CONST_POS, pos) {
    // hide bar on a magic position
    console.log(pos);
    if (pos > CONST_POS || pos < -400){
        $selector.animate({'top':'-120px'}, 700, 'swing');
    } else{
        $selector.animate({'top':'0'}, 700, 'swing');
    }
}



// const starshipTPLayout = (speed, fuel, health, firepower) => `
// <span>speed: ${speed}</span>
// <span>fuel: ${fuel}</span>
// <span>health: ${health}</span>
// <span>firepower: ${firepower}</span>
// `;


// ENTRYPOINT ----------------------------------------
$(function() {
    // tooltips
    // tippy(".little-choise-container__radio:has(> #starship0)", {
    //     theme: 'material',
    //     animation: 'scale',
    //     content: 'Tooltip test',
    //     placement: 'left'
    // })
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // TODO: refactoring
    $(".choice-click-handler-js").on("click", (e) => {
        console.log("Clicked choice-click-handler-js", e);
    });
    // TODO: automatic activation carousel by special class
    var first = new ChoicesCarousel($("#starshipCarouselControls")[0], 4); first.activate();
    var eq = new ChoicesCarousel($("#equipmentCarouselControls")[0], 4); eq.activate();
    var flightPathCarousel = new ChoicesCarousel($("#flightpathCarouselControls")[0], 4); flightPathCarousel.activate();
    console.log("point 1");
    var crewCarousel = new ChoicesCarousel($("#crewCarouselControls")[0], 5); crewCarousel.activate();

    const BIND_DELAY = 400;
    let lastWheel = new Date();
    let positionSlide = 0;
    const $section = $('.section-header');

    const $swiper = $('#swiper-js'); 
    const $commonSwiper = $('.swiper-js'); // next-btn in the botom of each slide

    const sectionCount = $('.section-outer').length;
    const SCROLL_MAX = (sectionCount * 100) - 100;
    const SCROLL_MIN = 0;
    const INFO_BAR_HIDE_POS = -100;

    window.isCorrectInputName = false;
    window.isCorrectInputSurname = false;
    const $infoBar = $('.js-info-bar');

    verification.verifyInputs();

    const personName = $('.js-person-name');
    const personSurname = $('.js-person-surname');

    // NEXT BTN HANDLING
    const inputName = $('#input-name-js');
    const inputSurname = $('#input-surname-js');
    $swiper.on("click", (e)=>{
        if(window.isCorrectInputSurname && window.isCorrectInputName){
            personName.text(inputName.val());
            personSurname.text(inputSurname.val());
            if(positionSlide > -SCROLL_MAX){
                positionSlide -=100;
                infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
                changePositionSlide($section, positionSlide);
            }
        } else {
            alert('Введите корректное имя и фамилию. (Имя и фамилия должны быть от 3 до 18 символов и не содержать пробелов)');
        }
    });


    $commonSwiper.on("click", ()=>{
        if(positionSlide > -SCROLL_MAX){
            positionSlide -=100;
            infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
            changePositionSlide($section, positionSlide);
        }
    });
    // NEXT BTN HANDLING END

    // SCROLL HANDLING
    $(document).on('mousewheel DOMMouseScroll', (e)=>{
        let nowWheel = new Date();
        if(nowWheel.getTime() - lastWheel.getTime() > BIND_DELAY){
            lastWheel = new Date();
            if(e.originalEvent.wheelDelta > 0){
                if(positionSlide < SCROLL_MIN){
                    positionSlide +=100;
                    infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
                    changePositionSlide($section, positionSlide);
                }
            }else{
                if(positionSlide > -SCROLL_MAX){
                    positionSlide -=100;
                    infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
                    changePositionSlide($section, positionSlide);
                }
                
            }
        }
    });
    // SCROLL HANDLING END
    
    // CHOICE HANDLING
    // deprecated handling of a choice
    // TODO: update for new version of code
    // const $checkboxCrewMember = $('input[name=crew-member]');
    // $checkboxCrewMember.on('click', function(e){
    //     const id = $(this).prop('id');
    //     const title = $(this).prop('value');
    //     console.log($(this).attr('data-url-image'));

    //     if($(this).prop('checked')){
    //         const imageUrl = $(this).attr('data-url-image');
    //         $('<li></li>',{
    //             title: title,
    //             click: (e)=>{console.log(title)},
    //             class: 'info-bar__crew-list-item',
    //             id: id + "in-list"
    //         }).css({
    //             'backgroundImage': `url('./${imageUrl}')`,
    //             'backgroundPosition': "center",
    //             'backgroundSize': "contain"
    //         }).appendTo($('#js-crew-list'));
    //         console.log('ok');
    //     } else {
    //         $("#" + id + "in-list").remove();
    //         console.log('none');
    //     }

    // });
    // limit persons for choice in crew
    // checkboxLimitation('input[name=crew-member]', 5);

    // deprecated handling of a choice
    // TODO: update for new version of code
    // checkboxChangeInfo('input[name=starship]', '#starship');
    // checkboxChangeInfo('input[name=item-equipment]', '#equipment');
    // checkboxChangeInfo('input[name=flightPath]', '#flightPath');

    // CHOICE HANDLING END

    // INFOBAR
    const $infoBarWrapper = $('.info-bar__wrapper');
    const $btnInfoBarOpen = $('.info-bar__toggle');

    $btnInfoBarOpen.on("click", ()=>{
        $btnInfoBarOpen.toggleClass('info-bar__toggle-arrow_up');
        $infoBarWrapper.toggleClass('info-bar_open');
    });

    const $infoBarLinks =  $('.info-bar-link-js');
    $infoBarLinks.on('click', function(){
        positionSlide = $(this).attr('data-index-translate');
        changePositionSlide($section, positionSlide);
        infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
        $btnInfoBarOpen.removeClass('info-bar__toggle-arrow_up');
        $infoBarWrapper.removeClass('info-bar_open');
    });
    // INFOBAR END
});

