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
            //1微信红包 2充值 3实物礼品 4自领礼品
            var btn = $$(this);
            var mode = btn.data('mode');
            giftDetail.functions.buyButtonClick(mode);
        });

    },
    functions : {
        buyButtonClick : function(mode){
            var url = "pages/gift-buy-form/gift-buy-default.html";
            if(mode == 1){
                url = "pages/gift-buy-form/gift-buy-wechat-money.html";
            }else if(mode == 2){
                url = "pages/gift-buy-form/gift-buy-mobile-fee.html";
            }else if(mode == 3){
                url = "pages/gift-buy-form/gift-buy-default.html";
            }else if(mode == 4){
                url = "pages/gift-buy-form/gift-buy-ziling.html";
            }
            mainView.router.loadPage({
                url : url,
            });
        },

    }
};
mainFramework.onPageBeforeInit('gift-detail',function(e){
    giftDetail.init();
    giftDetail.event();
});
