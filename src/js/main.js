// import AOS from "aos";
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
// import tippy from 'tippy.js';
import ChoicesCarousel from './module/carousel.js';
import * as verification from './module/verify_inputs.js';
import PageSlider from './module/page_slider.js';
import Infobar from './module/inofbar.js';
import * as choice_managers from './module/choice_manager.js';
window.$ = $; // just for tests

import crew from "../../data/crew.json"
import equipment from "../../data/equipment.json";
import flightpaths from "../../data/flightpaths.json";
import starships from "../../data/starships.json";

window.readOnlyData = {
    crew,
    equipment,
    flightpaths,
    starships
};

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

// ENTRYPOINT ----------------------------------------
$(function() {
    
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // TODO: automatic activation carousel by special class
    console.log('Sus');
    var first = new ChoicesCarousel($("#starshipCarouselControls")[0], {md: 3});
    var eq = new ChoicesCarousel($("#equipmentCarouselControls")[0], {md: 3});
    var flightPathCarousel = new ChoicesCarousel($("#flightpathCarouselControls")[0], {md: 4});
    var crewCarousel = new ChoicesCarousel($("#crewCarouselControls")[0], {md: 5});

    var pageSlider = new PageSlider('.section-header');
    var infobar = new Infobar('.js-info-bar');
    window.infobar = infobar;
    infobar.activatePagesliderGoHandling();

    const starshipManager = new choice_managers.StarshipChoiceManager({
        displayingSelector: '#starship',
        eventSelector: '.choice-click-handler-js[data-choice-name=starship]', 
        idAttr: 'data-choice-id',
        choices: window.readOnlyData.starships
    });

    const equipmentManager = new choice_managers.EquipmentChoiceManager({
        displayingSelector: '#equipment',
        eventSelector: '.choice-click-handler-js[data-choice-name=equipment]', 
        idAttr: 'data-choice-id',
        choices: window.readOnlyData.equipment
    });

    const flightpathManager = new choice_managers.FlightpathChoiceManager({
        displayingSelector: '#flightPath',
        eventSelector: '.choice-click-handler-js[data-choice-name=flightpath]', 
        idAttr: 'data-choice-id',
        choices: window.readOnlyData.flightpaths
    });

    const crewManager = new choice_managers.CrewChoiceManager({
        displayingSelector: '#js-crew-list',
        eventSelector: '.choice-click-handler-js[data-choice-name=crew-member]',
        idAttr: 'data-choice-id',
        choices: window.readOnlyData.crew
    });

    function updateStartBtnState() {
        const ready = starshipManager.selectedItems.length >= starshipManager.min &&
            equipmentManager.selectedItems.length >= equipmentManager.min &&
            flightpathManager.selectedItems.length >= flightpathManager.min &&
            crewManager.selectedItems.length >= crewManager.min;
        $startGameBtn.prop('disabled', !ready);
    }

    $(document).on('choice:change', updateStartBtnState);

    const savedSetupStr = localStorage.getItem('gameSetup');
    if (savedSetupStr) {
        try {
            const savedSetup = JSON.parse(savedSetupStr);
            if (savedSetup.name) {
                inputName.val(savedSetup.name);
                personName.text(savedSetup.name);
            }
            if (savedSetup.surname) {
                inputSurname.val(savedSetup.surname);
                personSurname.text(savedSetup.surname);
            }
            if (savedSetup.starshipId) {
                starshipManager.initializeSelection(savedSetup.starshipId);
            }
            if (savedSetup.equipmentId) {
                equipmentManager.initializeSelection(savedSetup.equipmentId);
            }
            if (savedSetup.flightpathId) {
                flightpathManager.initializeSelection(savedSetup.flightpathId);
            }
            if (Array.isArray(savedSetup.crewIds)) {
                crewManager.initializeSelection(savedSetup.crewIds);
            }
        } catch (e) {
            console.error('failed to load gameSetup', e);
        }
    }

    updateStartBtnState();
    // const shipManager = new SpaceshipChoiceManager(
    //     {
    //         maxChoices: 3,
    //         minChoices: 3,
            
    //     }
    //     window.readOnlyData.spaceships, 
    //     'data-attrname', 
    //     '.starshipitem'
    // );
    // shipManager.


    const BIND_DELAY = 400;
    let lastWheel = new Date();

    const $swiper = $('#swiper-js');
    const $commonSwiper = $('.swiper-js'); // next-btn in the bottom of each slide
    const $startGameBtn = $('#start-game-btn');

    const sectionCount = $('.section-outer').length;
    const SCROLL_MAX = (sectionCount * 100) - 100;
    const SCROLL_MIN = 0;
    // const INFO_BAR_HIDE_POS = -100;

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
            pageSlider.goNext();
        } else {
            alert('Введите корректное имя и фамилию. (Имя и фамилия должны быть от 3 до 18 символов и не содержать пробелов)');
        }
    });

    $commonSwiper.on("click", ()=>{
        pageSlider.goNext();
    });

    $startGameBtn.on('click', ()=>{
        const gameSetup = {
            name: inputName.val(),
            surname: inputSurname.val(),
            starshipId: starshipManager.selectedItems[0],
            equipmentId: equipmentManager.selectedItems[0],
            flightpathId: flightpathManager.selectedItems[0],
            crewIds: crewManager.selectedItems
        };
        localStorage.setItem('gameSetup', JSON.stringify(gameSetup));
        window.location.href = 'game.html';
    });
    // NEXT BTN HANDLING END

    // SCROLL HANDLING using pageSlider
    $(document).on('mousewheel DOMMouseScroll', (e)=>{
        let nowWheel = new Date();
        if(nowWheel.getTime() - lastWheel.getTime() > BIND_DELAY){
            lastWheel = new Date();
            
            if(e.originalEvent.wheelDelta > 0) {
                pageSlider.goBack();
            } else {
                pageSlider.goNext();
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

    // INFOBAR use jquery
    const $infoBarWrapper = $('.info-bar__wrapper');
    const $btnInfoBarOpen = $('.info-bar__toggle');

    // infobar for mobile
    $btnInfoBarOpen.on("click", ()=>{
        $btnInfoBarOpen.toggleClass('info-bar__toggle-arrow_up');
        $infoBarWrapper.toggleClass('info-bar_open');
    });

    // infobar links as anchors
    const $infoBarLinks =  $('.info-bar-link-js');
    $infoBarLinks.on('click', function() {
        let slidename = $(this).attr('data-slidename');
        pageSlider.slideTo(slidename);
        $btnInfoBarOpen.removeClass('info-bar__toggle-arrow_up');
        $infoBarWrapper.removeClass('info-bar_open');
    });
    // INFOBAR END
});

