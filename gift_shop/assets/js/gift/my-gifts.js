/**
 * Created by leon on 15/10/14.
 */
var myGifts = {
    init  : function () {

    },
    event : function(){
        /**
         * 点击我的礼品item事件
         */
        $$('div.pages').on('click','#my-gifts a.gift-order-link', function () {
            var btn = $$(this);
            mainFramework.showIndicator();
            var url = $$('html').data('my-gift-order-detail');
            var postData = {
                'id' : btn.data('id')
            };
            $$.post(url,postData, function (e) {
                mainFramework.hideIndicator();
                var json = JSON.parse(e);
                if(json.status == 200){
                    var url = 'pages/gift-order-detail/my-gift-order-detail.html';
                    if(json.data.mode == 1){
                        url = 'pages/gift-order-detail/my-gift-order-detail-hongbao.html';
                    }else if(json.data.mode == 2){
                        url = 'pages/gift-order-detail/my-gift-order-detail-mobile-fee.html';
                    }else if(json.data.mode == 3){
                        url = 'pages/gift-order-detail/my-gift-order-detail.html';
                    }else if(json.data.mode == 4){
                        url = 'pages/gift-order-detail/my-gift-order-detail-ziling.html';
                    }

                    mainView.router.loadPage({
                        url : url,
                        context : {
                            'gift_order' : json.data
                        }
                    });
                }
            });
        });
    },
    functions : {

    }
};
//$(function () {
//    myGifts.init();
//    myGifts.event();
//})
mainFramework.onPageBeforeInit('my-gifts',function(){
    myGifts.init();
    myGifts.event();
});