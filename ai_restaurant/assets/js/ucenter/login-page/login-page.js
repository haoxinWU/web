/**
 * Created by leon on 15/9/22.
 */
var loginPage = {
    init : function () {
        
    },
    event : function () {
        //发送验证码
        $$('div.pages').on(clickEvent,'div.page[data-page=login-page] a.get-sms-code', function () {
            var btn = $$(this);
            if(!btn.hasClass('waiting')){
                btn.addClass('waiting');
                var startTime = 10;
                var unit = '秒';
                btn.text(startTime+unit);
                loginPage.functions.smsCodeWating(10,btn);
            }
        });
    },
    functions : {

        smsCodeWating : function (wattingMillion,btn) {
            setTimeout(function () {
                wattingMillion = wattingMillion - 1;
                btn.text(wattingMillion + '秒');
                if(wattingMillion > 0){
                    loginPage.functions.smsCodeWating(wattingMillion,btn);
                }else{
                    if(wattingMillion == 0){
                        btn.removeClass('waiting');
                        btn.text('获取验证码');
                    }
                }
            },1000);
        },
        sendMessage : function(e){
            var url = '请求';
            var postData = {

            };
            $$.post(url ,postData, function (e) {
                
            });
        }
    }
}
/*初始化页面*/
$(function(e){
    loginPage.init();
    loginPage.event();
})