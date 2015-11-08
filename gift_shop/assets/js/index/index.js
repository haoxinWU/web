/**
 * Created by leon on 8/19/15.
 */
var index = {
    init: function () {
        //初始化首页的轮播图片
        index.functions.swiperInit();
        index.functions.checkLoadGo();

    },
    event: function () {

        //pages/gift-detail.html
        $$('div.pages').on('click','div.page[data-page=index] #gift-shop .row div.gift', function (e) {
            e.stopPropagation();
            var id = $$(this).attr('data-id');
            index.functions.loadGiftDetail(id,function(e){

            });
        });

        $$('div.pages').on('click','div.page[data-page=index] .toolbar-tab .right', function () {
            mainFramework.showIndicator();
            mainView.router.loadPage({
                url : 'pages/my-gifts.html',
                context : {

                }
            });
            mainFramework.hideIndicator();
        });

    },
    functions: {
        //初始化首页广告图片，这里应该请求的
        swiperInit : function () {
            var indexSwiper = mainFramework.swiper('div.pages div.page[data-page=index] div.swiper-container', {
                pagination: '.swiper-pagination'
            });
        },

        loadGiftDetail : function(id,callback){
            //请求id为id的url
            mainView.router.loadPage({
                url : 'pages/gift-detail.html'
            });
            callback(this);
        },

        //检测是否礼品信息
        checkLoadGo : function(){
            var goParam = getQueryString("go");
            if(goParam == 'gift_detail'){
                mainFramework.showIndicator();
                myGifts.functions.loadMyGiftOrderDetail(getQueryString('id'), function (json,url) {
                    mainFramework.hideIndicator();
                    mainView.router.loadPage({
                        url : url,
                        context : {
                            'gift_order' : json.data
                        }
                    });
                });
            }
        }
    }
}
/*初始化页面*/
$(function(e){
    index.init();
    index.event();
})
