/**
 * Created by leon on 8/19/15.
 */
var index = {
    init: function () {
        //初始化首页的轮播图片
        index.functions.swiperInit();

    },
    event: function () {
        //点击装系统
        $$('div.pages div.page[data-page=index]').on(clickEvent,'.fix-os', function () {
            mainFramework.showPreloader("加载中...");
            var loadUrl = $$(this).data('target-page');
            index.functions.loadOsList(function (json) {
                //mainFramework.hidePreloader();
                mainView.router.loadPage({
                    url : loadUrl,
                    context : json.data
                });
            }, function (json) {
                
            });
        });

        //点击清灰尘
        $('div.pages div.page[data-page=index]').on(clickEvent,'.wash-computer', function () {
            mainFramework.showPreloader("加载中...");
            var loadUrl = $$(this).data('target-page');
            index.functions.loadWashComputerOption(function (json) {
                //mainFramework.hidePreloader();
                mainView.router.loadPage({
                    url : loadUrl,
                    context : json.data
                });
            }, function (json) {

            });
        });

        //点击修电脑
        $('div.pages div.page[data-page=index]').on(clickEvent,'.fix-computer-issue', function () {
            mainFramework.showPreloader("加载中...");
            var loadUrl = $$(this).data('target-page');
            index.functions.loadWashComputerOption(function (json) {
                //mainFramework.hidePreloader();
                mainView.router.loadPage({
                    url : loadUrl,
                    context : json.data
                });
            }, function (json) {

            });
        });

    },
    functions: {
        //初始化首页广告图片，这里应该请求的
        swiperInit : function () {
            var indexSwiper = mainFramework.swiper('div.pages div.page[data-page=index] div.swiper-container', {
                pagination: '.swiper-pagination'
            });
        },

        /**
         * 获取所有的系统列表
         * @param successCallback
         * @param errorCallback
         */
        loadOsList : function (successCallback,errorCallback) {
            var url = $$('html').data('load-os-list-url');
            var postData = null;
            $$.post(url,postData, function (e) {
                var json = JSON.parse(e);
                if(json.status == 200){
                    successCallback(json);
                }else{
                    errorCallback(json);
                }
            });
        },

        /**
         * 加载清理电脑的配置数据
         * @param successCallback
         * @param errorCallback
         */
        loadWashComputerOption : function(successCallback,errorCallback){
            var url = $$('html').data('load-wash-computer-url');
            var postData = null;
            $$.post(url,postData, function (e) {
                var json = JSON.parse(e);
                if(json.status == 200){
                    successCallback(json);
                }else{
                    errorCallback(json);
                }
            });
        },
        /**
         * 加载问题列表
         * @param successCallback
         * @param errorCallback
         */
        loadComputerIssueList : function (successCallback, errorCallback) {
            var url = $$('html').data('load-computer-issue-url');
            var postData = null;
            $$.post(url,postData, function (e) {
                var json = JSON.parse(e);
                if(json.status == 200){
                    successCallback(json);
                }else{
                    errorCallback(json);
                }
            });
        }
    }
}
/*初始化页面*/
$(function(e){
    index.init();
    index.event();
})
