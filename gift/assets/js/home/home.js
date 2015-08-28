/**
 * Created by leon on 8/28/15.
 */
var home={
    init : function() {
        /**
         * 校验用户是否关注
         */
        home.functions.follow_check(function () {
            //成功什么都不做 说明关注着
        }, function (follow_url) {
            window.location.href = follow_url;
        });
    },
    event : function() {

    },
    functions : {
        /**
         * 关注检测
         * @param success_callback
         * @param error_callback
         */
        follow_check : function (success_callback, error_callback) {
            var openid = $$('html').data('openid');
            var follow_url = $$('html').data('follow-url');
            if(openid == '' || openid == null || openid == undefined){
                mainFramework.confirm('您没有关注本微信平台,点击确定进入关注引导页面', function () {
                    error_callback(follow_url);
                });
            }else{
                success_callback();
            }
        },
    }
};
$(function () {
    home.init();
    home.event();
})