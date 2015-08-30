/**
 * Created by leon on 8/19/15.
 */
var index = {
    init: function () {
        /**
         * 校验用户是否关注
         */
        index.functions.follow_check(function () {
            //成功什么都不做 说明关注着
        }, function (follow_url) {
            window.location.href = follow_url;
        });
    },
    event: function () {

        /**
         * 领取礼品提交按钮
         */
        $$('div.pages').on(clickEvent,'div.page[data-page=index] a.success-get-gift', function (e) {
            mainFramework.showPreloader('提交中...');
            index.functions.get_gift(function (json) {
                mainFramework.hidePreloader();
                if(json.data == null ){
                    mainFramework.alert(json.message);
                }else{
                    mainFramework.confirm(json.message, function () {
                        window.location.href = json.data.redirect;
                    })
                }
            }, function (result) {
                mainFramework.hidePreloader();
                mainFramework.alert(result);
            });
        });

        /**
         * 城市联动选择 省份
         */
        $$('div.pages').on('change', 'div.page[data-page=index] select[name=province]', function () {
            var btn = $$(this);
            var city_id = btn.val();
            var city_type = 2;//城市
            index.functions.city_change(city_id,city_type,function (city_list) {
                var city_select = $$('div.page[data-page=index] select[name=city]');
                var disc_select = $$('div.page[data-page=index] select[name=disc]');
                //切换城市
                if(city_list != null && city_list.length > 0){
                    var options = "";
                    for(var i = 0; i<city_list.length; i++){
                        var city = city_list[i];
                        options = options + '<option value="'+city.id+'">'+city.addr+'</option>';
                    }
                    city_select.children().remove();
                    city_select.append(options);
                    city_select.removeClass('hide');
                    var default_option = city_select.children('option');
                    var two_city_id = default_option.val();
                    var new_city_type = 3;//区县

                    index.functions.city_change(two_city_id,new_city_type, function (city_list) {
                        if(city_list != null && city_list.length > 0){
                            var new_options = "";
                            for(var i = 0; i<city_list.length; i++){
                                var city = city_list[i];
                                new_options = new_options + '<option value="'+city.id+'">'+city.addr+'</option>';
                            }
                            disc_select.children().remove();
                            disc_select.append(new_options);
                            disc_select.removeClass('hide');
                        }else{
                            disc_select.addClass('hide');
                        }
                    });
                }else{
                    city_select.addClass('hide');
                    disc_select.addClass('hide');
                }

            });
        });
        /**
         * 城市联动选择 城市
         */
        $$('div.pages').on('change', 'div.page[data-page=index] select[name=city]', function () {
            var btn = $$(this);
            var city_id = btn.val();
            var city_type = 3;//区县
            index.functions.city_change(city_id,city_type,function (city_list) {
                //city_list肯定是有值的,展示城市
                var city_select = $$('div.page[data-page=index] select[name=disc]');
                var disc_select = $$('div.page[data-page=index] select[name=disc]');
                if(city_list != null && city_list.length > 0){
                    var options = "";
                    for(var i = 0; i<city_list.length; i++){
                        var city = city_list[i];
                        options = options + '<option value="'+city.id+'">'+city.addr+'</option>';
                    }
                    city_select.children().remove();
                    city_select.append(options);
                    city_select.removeClass('hide');
                }else{
                    city_select.addClass('hide');
                    disc_select.addClass('hide');
                }
            });
        });
    },

    functions: {

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
        /**
         * 联动 省份切换
         * @param callback
         */
        city_change : function (city_id, city_type,callback) {
            var url = $$('html').data('city-change');
            var post_data = {
                city_id : city_id,
                city_type : city_type
            };
            $$.post(url, post_data, function (e) {
                var json = JSON.parse(e);
                //成功的话执行callback
                if(json.status == 200 && json.data != null){
                    callback(json.data);
                }
            });
        },
        /**
         * 礼品获取按钮
         * @param e
         */
        get_gift : function(callback,error_callback){
            var url = $$('html').attr('data-get-gift-url');
            var post_data = {
                gift_id :$$('html').data('gift-id'),
                name : $$('input[name=name]').val(),
                mobile : $$('input[name=mobile]').val(),
                city : $$('select[name=disc]').val(),
                address : $$('input[name=address]').val(),
                pay_method : $$('select[name=pay_method]').val(),//1 微信支付 2. 货到付款

            };
            var share_id = $$('html').data('share-id');
            if(share_id != '' && share_id != null && share_id != undefined){
                post_data.share_id = share_id;
            }
            index.functions.get_gift_post_check(post_data, function () {
                $$.post(url, post_data, function (e) {
                    var json = JSON.parse(e);
                    callback(json);
                })
            },error_callback);
        },
        /**
         * 数据检测
         * @param post_data
         * @param callback
         */
        get_gift_post_check : function (post_data, callback,error_callback) {
            if(post_data.name == '' || post_data.name == null){
                error_callback('姓名不能为空');
                return ;
            }
            if(post_data.mobile == '' || post_data.mobile == null){
                error_callback('手机号码不能为空');
                return ;
            }

            if(post_data.city == '' || post_data.city == null || post_data.city == undefined){
                error_callback('请选择您的地址');
                return ;
            }
            if(post_data.address == '' || post_data.address == null){
                error_callback('请输入您的详细地址');
                return ;
            }

            //1 微信支付 2 货到付款
            if(post_data.pay_method == 1 ){
                //在线支付运费
            }else if(post_data.pay_method == 2){
                //货到付款

            }
            callback();
        }



    }
}
/*初始化页面*/
$(function(e){
    index.init();
    index.event();
})
