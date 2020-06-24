(function(){
    const changePositionSlide = ($object, newPos)=>{
        // $object.css({marginTop: `${newPos}vh`});
        $object.animate({marginTop: `${newPos}vh`}, 500,'swing');
    };
    let positionSlide = 0;
    let $section = $('.section-header');
    let $swiper = $('.swiper-js');
    $swiper.bind('click', (e)=>{
        if(positionSlide > -500){
            positionSlide -=100;
        }
        changePositionSlide($section, positionSlide);
        // section.offset({top: -1000, left: 0});
        
    });
    $(document).bind('mousewheel DOMMouseScroll', (e)=>{
        console.log(e.originalEvent.wheelDelta);
        if(e.originalEvent.wheelDelta > 0){
            if(positionSlide < 0){
                positionSlide +=100;
            }
            changePositionSlide($section, positionSlide);
            
        }else{
            if(positionSlide > -500){
                positionSlide -=100;
            }
            changePositionSlide($section, positionSlide);
            
        }
    });
})();