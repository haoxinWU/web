/**
 * Created by leon on 15/9/24.
 */

var optionCommon = {
    init : function () {
        
    },
    event : function(){
        $$('div.pages').on(clickEvent,'.ask-for-help .ask-button', function () {
            mainView.router.load({
               url : 'pages/common/ask-success.html'
            });
        });
    },
    functions : {

    }
}
$(function () {
    optionCommon.init();
    optionCommon.event();
});