import $ from "jquery";

export function isACorrectInput($inputSelector){
    let regularExp = /^.{3,18}$/i;
    let regularExp2 = /\s/;
    let str = $inputSelector.val();
    return regularExp.test(str) && (!regularExp2.test(str));
}

export function verifyInputs(values=null) {
    const inputName = $('#input-name-js');
    inputName.on('input', (e)=>{
        if (isACorrectInput(inputName)) {
            inputName.removeClass('border-focus-danger');
            inputName.removeClass('border-focus-normal');
            inputName.addClass('border-focus-success');
            window.isCorrectInputName = true;
        } else {
            inputName.removeClass('border-focus-success');
            inputName.removeClass('border-focus-normal');
            inputName.addClass('border-focus-danger');
            window.isCorrectInputName = false;
        }
    });
    const inputSurname = $('#input-surname-js');
    inputSurname.on('input',()=>{
        if(isACorrectInput(inputSurname)) {
            console.log('surname is correct');
            inputSurname.removeClass('border-focus-danger');
            inputSurname.removeClass('border-focus-normal');
            inputSurname.addClass('border-focus-success');
            window.isCorrectInputSurname = true;
        } else {
            console.log('surname is incorrect');
            inputSurname.removeClass('border-focus-success');
            inputSurname.removeClass('border-focus-normal');
            inputSurname.addClass('border-focus-danger');
            window.isCorrectInputSurname = false;
        }
    });
}