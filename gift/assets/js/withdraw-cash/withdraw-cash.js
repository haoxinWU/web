/**
 * Created by leon on 8/27/15.
 */
var cash = {
    init: function () {


    },
    event: function () {

        /**
         * 提现提交按钮
         */
        $$('div.pages').on(clickEvent,'div.page[data-page=withdraw-cash] a.submit-tixian', function (e) {
            cash.functions.cash_get(function () {
                var url = $$('html').attr('data-user-home');
                mainView.router.load({
                    url : url
                })

            });
        })

    },
    functions: {
        /**
         * 提现方法
         */
        cash_get : function (callback) {
            var url = $$('html').attr('data-cash-get');
            var post_data = {
                type : $$('select[name=type]').val(),
                account : $$('input[name=account]').val(),
                bank_name : $$('input[name=bank_name]').val(),
                name : $$('input[name=name]').val(),
                mobile : $$('input[name=mobile]').val()
            };
            cash.functions.check_cash_get_input(post_data, function () {
                $$.post(url, post_data, function(e){
                    var json = JSON.parse(e);
                    mainFramework.alert(json.message,'', function () {
                        callback();
                    });
                })
            });

        },
        /**
         * 提现
         * @param callback
         */
        check_cash_get_input : function(post_data,callback){
            if(post_data.type == 3){
                if(post_data.bank_name == '' || post_data.bank_name == null ){
                    mainFramework.alert('开户行名称不能为空');
                    return ;
                }
            }
            if(post_data.type != 1){
                if(post_data.account == '' || post_data.account == null){
                    mainFramework.alert('提款账户不能为空');
                    return ;
                }
            }
            if(post_data.name == '' || post_data.name == null){
                mainFramework.alert('请输入真实姓名');
                return ;
            }
            if(post_data.mobile == '' || post_data.mobile == null){
                mainFramework.alert('请输入您的手机号码');
                return ;
            }
            callback();
        }


    }
};
/*初始化页面*/
$(function(e){
    cash.init();
    cash.event();
})