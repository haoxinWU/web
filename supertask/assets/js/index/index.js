/**
 * Created by leon on 8/19/15.
 */
var index = {
    init: function () {
        //初始化首页的轮播图片
        index.functions.swiperInit();

        index.functions.checkRegister();

    },
    event: function () {

        //pages/gift-detail.html
        $$('div.pages').on('click','div.page[data-page=index] #gift-shop .row div.gift', function (e) {
            e.stopPropagation();
            var id = $$(this).attr('data-id');
            index.functions.loadGiftDetail(id,function(e){

            });
        });


    },
    functions: {
        //初始化首页广告图片，这里应该请求的
        swiperInit : function () {
            var indexSwiper = taskFramework.swiper('div.pages div.page[data-page=index] div.swiper-container', {
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
        /*跳转到用户信息页面*/
        loadUserInfo : function(name,callback){
            var context = {

            };
            if(name != null && ''!=name ){
                context.name = name;
            }
            mainView.router.loadPage({
                url : 'pages/user-info.html',
                context : context
            });
            callback();
        },
        checkRegister : function(){
            var name = $$('#ucenter div.user-name').text();
            if('' == name || null == name || undefined == name){
                taskFramework.confirm('您还没有等级成为推广员,点击确定进入登记页面,点击取消关闭本页面', function () {
                    //确定
                    index.functions.loadUserInfo(null,function(){
                        //回调函数
                    });
                }, function () {//取消

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
