/**
 * Created by leon on 8/19/15.
 */
var index = {
    init: function () {
        //初始化首页的轮播图片
        index.functions.swiperInit();

    },
    event: function () {


    },
    functions: {
        //初始化首页广告图片，这里应该请求的
        swiperInit : function () {
            var indexSwiper = mainFramework.swiper('div.pages div.page[data-page=index] div.swiper-container', {
                pagination: '.swiper-pagination'
            });
        },
    }
}
/*初始化页面*/
$(function(e){
    index.init();
    index.event();
})
