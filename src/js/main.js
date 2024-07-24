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

window.$ = $;

function checkboxLimitation(checkboxSelector, num){
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

function checkboxChangeInfo(checkboxSelector, infoSelector){
    $(checkboxSelector).on("change", ()=>{
        $(infoSelector).text($(`${checkboxSelector}:checked`).attr('value'));
    });
}

function isACorrectInput($inputSelector){
    let regularExp = /^.{3,18}$/i;
    let regularExp2 = /\s/;
    let str = $inputSelector.val();
    return regularExp.test(str) && (!regularExp2.test(str));
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
    var first = new ChoicesCarousel($("#starshipCarouselControls")[0], 3); first.activate();
    var first = new ChoicesCarousel($("#equipmentCarouselControls")[0], 3); first.activate();
    var first = new ChoicesCarousel($("#flightpathCarouselControls")[0], 4); first.activate();

    // change to funtion
    const changePositionSlide = ($object, newPos)=>{
        $object.animate({marginTop: `${newPos}vh`}, 500,'swing');
    };

    // change to function
    const infoBarHide = ($selector, CONST_POS, pos)=>{
        // hide bar on a magic position
        console.log(pos);
        if (pos > CONST_POS || pos < -400){
            $selector.animate({'top':'-120px'}, 700, 'swing');
            // console.log('yes');
        } else{
            $selector.animate({'top':'0'}, 700, 'swing');
            // console.log('no');
        }
    }

    const BIND_DELAY = 400;
    let lastWheel = new Date();
    let positionSlide = 0;
    const $section = $('.section-header');
    const $swiper = $('#swiper-js');
    const $commonSwiper = $('.swiper-js');
    const sectionCount = $('.section-outer').length;
    const SCROLL_MAX = (sectionCount * 100) - 100;
    const SCROLL_MIN = 0;
    const INFO_BAR_HIDE_POS = -100;
    let isCorrectInputName = false;
    let isCorrectInputSurame = false;
    const $infoBar = $('.js-info-bar');
    
    const inputName = $('#name-js');
    inputName.on('input',(e)=>{
        if(isACorrectInput(inputName)){
            console.log('name is correct');
            inputName.removeClass('section-header-wrapper__form-input_border-color_red');
            inputName.addClass('section-header-wrapper__form-input_border-color_green');
            isCorrectInputName =true;
        }else{
            console.log('name is incorrect');
            inputName.removeClass('section-header-wrapper__form-input_border-color_green');
            inputName.addClass('section-header-wrapper__form-input_border-color_red');
            isCorrectInputName = false;
        }
    });
    const inputSurname = $('#surname-js');
    inputSurname.on('input',()=>{
        if(isACorrectInput(inputSurname)){
            console.log('surname is correct');
            inputSurname.removeClass('section-header-wrapper__form-input_border-color_red');
            inputSurname.addClass('section-header-wrapper__form-input_border-color_green');
            isCorrectInputSurame = true;
        }else{
            console.log('surname is incorrect');
            inputSurname.removeClass('section-header-wrapper__form-input_border-color_green');
            inputSurname.addClass('section-header-wrapper__form-input_border-color_red');
            isCorrectInputSurame = false;
        }
    });
    const personName = $('.js-person-name');
    const personSurname = $('.js-person-surname');
    $swiper.on("click", (e)=>{
        if(isCorrectInputSurame && isCorrectInputName){
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
    // const btnSwiper = $('#swiper-js');
    const $checkboxCrewMember = $('input[name=crew-member]');
    $checkboxCrewMember.on('click', function(e){
        const id = $(this).prop('id');
        const title = $(this).prop('value');
        console.log($(this).attr('data-url-image'));

        if($(this).prop('checked')){
            const imageUrl = $(this).attr('data-url-image');
            $('<li></li>',{
                title: title,
                click: (e)=>{console.log(title)},
                class: 'info-bar__crew-list-item',
                id: id + "in-list"
            }).css({
                'backgroundImage': `url('./${imageUrl}')`,
                'backgroundPosition': "center",
                'backgroundSize': "contain"
            }).appendTo($('#js-crew-list'));
            console.log('ok');
        } else {
            $("#" + id + "in-list").remove();
            console.log('none');
        }

    });
    checkboxLimitation('input[name=crew-member]', 5);

    checkboxChangeInfo('input[name=starship]', '#starship');
    checkboxChangeInfo('input[name=item-equipment]', '#equipment');
    checkboxChangeInfo('input[name=flightPath]', '#flightPath');

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
});

