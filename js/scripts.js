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
    const BIND_DELAY = 400;
    let lastWheel = new Date();
    let positionSlide = 0;
    const $section = $('.section-header');
    const $swiper = $('#swiper-js');
    const $commonSwiper = $('.swiper-js');
    const sectionCount = $('.section-outer').length;
    const SCROLL_MAX = (sectionCount * 100) - 100;
    const SCROLL_MIN = 0;

    const inputName = $('#name-js');
    const inputSurname = $('#surname-js');
    const personName = $('.js-person-name');
    const personSurname = $('.js-person-surname');
    $swiper.bind('click',(e)=>{
        personName.text(inputName.val());
        personSurname.text(inputSurname.val());
        if(positionSlide > -SCROLL_MAX){
            positionSlide -=100;
        }
        changePositionSlide($section, positionSlide);
    });
    $commonSwiper.click(()=>{
        if(positionSlide > -SCROLL_MAX){
            positionSlide -=100;
        }
        changePositionSlide($section, positionSlide);
    });

    $(document).bind('mousewheel DOMMouseScroll', (e)=>{
        let nowWheel = new Date();
        if(nowWheel.getTime() - lastWheel.getTime() > BIND_DELAY){
            lastWheel = new Date();
            if(e.originalEvent.wheelDelta > 0){
                if(positionSlide < SCROLL_MIN){
                    positionSlide +=100;
                }
                changePositionSlide($section, positionSlide);
            }else{
                if(positionSlide > -SCROLL_MAX){
                    positionSlide -=100;
                }
                changePositionSlide($section, positionSlide);
            }
        }
    });
    // const btnSwiper = $('#swiper-js');
    
    checkboxLimitation('input[name=crew-member]', 5);
    checkboxChangeInfo('input[name=starship]', '#starship');
    checkboxChangeInfo('input[name=item-equipment]', '#equipment');
    checkboxChangeInfo('input[name=flightPath]', '#flightPath');
    
})();