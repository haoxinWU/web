var login = {
    init : function () {
        login.event();
        login.checkLogin(function (data) {
            $.smkAlert({
                text: "登陆成功,1秒后带您进入管理后台",
                type: 'success'
            });
            setTimeout(function () {
                window.location.href = app.urls.adminHome;
            },1000);
        });
    },

    event : function () {
        $("#login").on('click', function (e) {
            e.stopPropagation();
            var btn = $(this);
            btn.attr('disabled',"true");
            var username = $("#username").val();
            var password = $("#password").val();
            var user = {
                username : username,
                password : password
            };
            login.login(user, function (data) {
                btn.removeAttr('disabled');
                if(data.code != 200){
                    return $.smkAlert({
                        text: data.msg,
                        type: 'danger'
                    });
                }else{
                    $.smkAlert({
                        text: "登录成功,1秒后转入后台主页...",
                        type: 'success'
                    });
                    setTimeout(function () {
                        window.location.href = app.urls.adminHome;
                    },1000);
                }
            });
        })
    },
    
    checkLogin : function (success) {
        $.get(app.urls.checkLogin, function (data) {
            if(data.code == 200){
                success(data);
            }else{
                //error(data);
            }
        });
    },

    login : function (user , success) {
        if(StringUtils.isEmpty(user.username)){
            return success(response.error("用户名不能为空"));
        }
        if(StringUtils.isEmpty(user.password)){
            return success(response.error("密码不能为空"));
        }
        $.post(app.urls.login, user, function (data) {
            success(data);
        });
    }

};
