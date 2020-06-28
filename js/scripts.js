(function(){
    const changePositionSlide = ($object, newPos)=>{
        $object.animate({marginTop: `${newPos}vh`}, 500,'swing');
    };
    function checkboxLimitation(checkboxSelector, num){
        const $crewMembers = $(checkboxSelector);
        $crewMembers.change(()=>{
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
        $(checkboxSelector).change(()=>{
            $(infoSelector).text($(`${checkboxSelector}:checked`).attr('value'));
        });
    }
    function isACorrectInput($inputSelector){
        let regularExp = /^.{3,18}$/i;
        let regularExp2 = /\s/;
        let str = $inputSelector.val();
        return regularExp.test(str) && (!regularExp2.test(str));
    }
    function btnAddSwiperEvent($container, $btnBack, $btnNext){
        $btnBack.on('click',(e)=>{
            $container.animate({left:'+=250'}, 400, 'swing');
            console.log('hi back');
        });
        $btnNext.on('click',(e)=>{
            $container.animate({left:'-=250'}, 400, 'swing');
            console.log('hi next');
        });
    }
    const infoBarHide = ($selector, CONST_POS, pos)=>{
        console.log(pos);
        if (pos > CONST_POS || pos < -400){
            $selector.animate({'top':'-115px'}, 700, 'swing');
            console.log('yes');
        } else{
            $selector.animate({'top':'0'}, 700, 'swing');
            console.log('no');
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
    inputName.bind('input',(e)=>{
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
    inputSurname.bind('input',()=>{
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
    $swiper.bind('click',(e)=>{
        if(isCorrectInputSurame && isCorrectInputName){
            personName.text(inputName.val());
            personSurname.text(inputSurname.val());
            if(positionSlide > -SCROLL_MAX){
                positionSlide -=100;
                infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
                changePositionSlide($section, positionSlide);
            }
        } else {
            alert('Введите корректное имя и фамилию иначе вас посетит паранойя. (Имя и фамилия должны быть от 3 до 18 символов и не содержать пробелов)');
        }
    });
    $commonSwiper.click(()=>{
        if(positionSlide > -SCROLL_MAX){
            positionSlide -=100;
            infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
            changePositionSlide($section, positionSlide);
        }
    });
    $(document).bind('mousewheel DOMMouseScroll', (e)=>{
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
    $checkboxCrewMember.bind('click', function(e){
        const id = $(this).prop('id');
        const title = $(this).prop('value');
        console.log($(this).attr('data-url-image'));

        if($(this).prop('checked')){
            $('<li></li>',{
                title: title,
                click: (e)=>{console.log(title)},
                class: 'info-bar__crew-list-item',
                id: id + "in-list"
            }).css({
                'backgroundImage': "url('./" + $(this).attr('data-url-image') + "')"
            }).appendTo($('#js-crew-list'));
            console.log('ok');
        }else{
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
    $btnInfoBarOpen.click(()=>{
        $btnInfoBarOpen.toggleClass('info-bar__toggle-arrow_up');
        $infoBarWrapper.toggleClass('info-bar_open');
    });
    
    const $starshipContainer = $('#starship-container-js');
    const $btnBackStarship = $('#btn-back-starship-js');
    const $btnNextStarship = $('#btn-next-starship-js');
    btnAddSwiperEvent($starshipContainer, $btnBackStarship, $btnNextStarship);
    const $equipmentContainer = $('#equipment-container-js');
    const $btnBackEquipment = $('#btn-back-equipment-js');
    const $btnNextEquipment = $('#btn-next-equipment-js');
    btnAddSwiperEvent($equipmentContainer, $btnBackEquipment, $btnNextEquipment);
    const $crewContainer = $('#crew-container-js');
    const $btnBackCrew = $('#btn-back-crew-js');
    const $btnNextCrew = $('#btn-next-crew-js');
    btnAddSwiperEvent($crewContainer, $btnBackCrew, $btnNextCrew);
    const $flightPathContainer = $('#flightPath-container-js');
    const $btnBackFlightPath = $('#btn-back-flightPath-js');
    const $btnNextFlightPath = $('#btn-next-flightPath-js');
    btnAddSwiperEvent($flightPathContainer, $btnBackFlightPath, $btnNextFlightPath);

    const $infoBarLinks =  $('.info-bar-link-js');
    $infoBarLinks.bind('click', function(){
        positionSlide = $(this).attr('data-index-translate');
        changePositionSlide($section, positionSlide);
        infoBarHide($infoBar, INFO_BAR_HIDE_POS, positionSlide);
        $btnInfoBarOpen.toggleClass('info-bar__toggle-arrow_up');
        $infoBarWrapper.toggleClass('info-bar_open');
    });
})();