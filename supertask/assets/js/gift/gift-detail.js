/**
 * Created by leon on 8/19/15.
 */
var giftDetail = {
    init : function(){

    },

    event : function () {
        /*确认兑换按钮*/
        $$('div.pages').on('click','div.page[data-page=gift-detail] div.toolbar button', function (e) {
            e.stopPropagation();
            giftDetail.functions.buyButtonClick();
        });

    },
    functions : {
        buyButtonClick : function(){
            mainView.router.loadPage({
                url : 'pages/gift-buy.html'
            });
        },

    }
};
taskFramework.onPageBeforeInit('gift-detail',function(e){
    giftDetail.init();
    giftDetail.event();
});
