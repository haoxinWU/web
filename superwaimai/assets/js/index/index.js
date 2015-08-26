/**
 * Created by leon on 8/19/15.
 */
var index = {
    init: function () {
        //初始化首页的轮播图片
        index.functions.swiperInit();

    },
    event: function () {
        /*工具栏点击事件 当工具栏点击的时候，对应的标题要切换*/
        $$('div.pages div.toolbar-fixed').on(clickEvent,'a.tab-link[data-title]', function () {
            var btn = $$(this);
            var title = btn.attr('data-title');
            $$('title').text(title);
            $$('.views .view div.navbar div.center').text(title);
        });

        /**
         * 点击商铺，加载点餐页面
         */
        $$('div.pages div.page[data-page=index]').on(clickEvent,'li.shop-item', function () {
            var btn = $$(this);
            var id = btn.attr('data-id');
            mainView.router.loadPage({
                url : 'pages/restaurant.html'
            });
        })
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
