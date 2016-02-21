var regModule = {

    init : function () {
        regModule.event();
        
    },

    event : function () {
        $("#reg").on('click', function (e) {
            e.stopPropagation();
            var btn = $(this);
            btn.attr('disabled',"true");
            var user = {
                username : $("input[name=username]").val(),
                realname : $("input[name=realname]").val(),
                password : $("input[name=password]").val(),
                passwordR : $("input[name=passwordR]").val(),
                mobile : $("input[name=mobile]").val(),
                email : $("input[name=email]").val(),
            };
            regModule.reg(user, function (data) {
                btn.removeAttr('disabled');
                if(data.code != 200){
                    $.smkAlert({
                        text: data.msg,
                        type: 'danger'
                    });
                }else{
                    $.smkAlert({
                        text: "注册成功,马上带您进入登录页面",
                        type: 'success'
                    });
                    setTimeout(function () {
                        window.location.href = "/login.html";
                    },2000);
                }
            });
        })
    },

    reg : function (user , success) {
        if(StringUtils.isEmpty(user.username)){
            return success(response.error("用户名不能为空"));
        }
        if(StringUtils.isEmpty(user.password)){
            return success(response.error("密码不能为空"));
        }
        if(user.password != user.passwordR){
            return success(response.error("两次密码输入不一致"));
        }
        if(StringUtils.isEmpty(user.mobile)){
            return success(response.error("手机号码不能为空"));
        }
        $.post(app.urls.reg, user, function (data) {
            return success(data);
        });
    }


};