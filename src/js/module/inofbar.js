import $ from "jquery";
import * as constants from "../constants.js";

function infoBarHide($selector, CONST_POS, pos) {
    // hide bar on a magic position
    console.log(pos);
    if (pos > CONST_POS || pos < -400){
        $selector.animate({'top':'-120px'}, 700, 'swing');
    } else{
        $selector.animate({'top':'0'}, 700, 'swing');
    }
}