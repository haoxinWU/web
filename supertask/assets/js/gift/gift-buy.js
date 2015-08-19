/**
 * Created by leon on 8/19/15.
 */
var giftBuy = {
    init  : function () {

    },
    event : function(){
        $$('div.pages').on('click','div.page[data-page=gift-buy] a.ok-get-gift', function (e) {
            var jsonData = taskFramework.formToJSON('#buy-gift-user-info');

            giftBuy.functions.buyGift(jsonData,function(e){
                taskFramework.alert('halleo');
            });
        });
    },
    functions : {
        //确认领取
        buyGift : function (data,callback) {
            var url = '#';
            var postData = data;
            $$.post(url, postData, function (e) {
                callback();
            });
        }
    }
};
taskFramework.onPageBeforeInit('gift-buy',function(e){
    giftBuy.init();
    giftBuy.event();
});