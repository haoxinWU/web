/**
 * Created by leon on 15/10/15.
 */
var index = {

    init : function(){

    },
    event : function () {
        $('.start-button').on('click', function () {
            $(this).parents('.option').hide();
            $('.footer').show();
            $('.question.option').show();
        })
    },
    
    functions : {

    }
};
$(function () {
    index.init();
    index.event();
})