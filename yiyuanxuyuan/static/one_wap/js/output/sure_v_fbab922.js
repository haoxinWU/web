function checkStatus(a) {
    a > min_num ? $("#Creduce").removeClass("disable") : $("#Creduce").addClass("disable"),
        max_num > a ? $("#Cadd").removeClass("disable") : $("#Cadd").addClass("disable")
}
function checkInput(a) {
    console.log(a);
    var t = !0;
    return a && min_num > a && (jDialog.alert("亲，最少购买一份哦"), $(".calculator input").val(1), $("#payMoney").html("&yen;" + 1 * now_price), t = !1),
    a && a > max_num && (jDialog.alert("当前最多购买" + max_num + "个"), $(".calculator input").val(max_num), $("#payMoney").html("&yen;" + max_num * now_price), t = !1),
    "" == a && (jDialog.alert("请输入数字,且最少购买一份"), $(".calculator input").val(1), $("#payMoney").html("&yen;" + 1 * now_price), t = !1),
    checkNum(a) || (jDialog.alert("请输入数字"), $(".calculator input").val(1), $("#payMoney").html("&yen;" + 1 * now_price), t = !1),
        checkStatus($(".calculator input").val()),
        t
}
function checkNum(a) {
    var t = "^[0-9]*$",
        n = new RegExp(t);
    return n.test(a)
}
function deparam(a) {
    a = a.slice(a.indexOf("?") + 1).split("&");
    for (var t, n = {},
             e = function(a) {
                 try {
                     return window.decodeURIComponent(a)
                 } catch(t) {
                     return a
                 }
             },
             o = a.length - 1; o >= 0; o--) t = a[o].split("="),
        n[e(t[0])] = e(t[1]);
    return n
}
function payResult(a) {
    function t() {
        for (var t = 0,
                 n = a.length; n > t; t++) {
            var e = a[t].split("={");
            if (2 == e.length && "notify" == e[0]) {
                var o = PageURL + "?" + e[1];
                o = o.substring(0, o.length - 1),
                    window.location = o
            }
        }
    }
    if (a.length > 0) {
        a = a.substring(0, a.length - 1),
            a = a.split("};");
        for (var n = 0,
                 e = a.length; e > n; ++n) {
            var o = a[n].split("={");
            if (2 == o.length && "statecode" == o[0]) switch (parseInt(o[1])) {
                case 0:
                    return void t();
                case 1:
                    return void jDialog.alert("支付中");
                case 2:
                    return void jDialog.alert("支付已经取消");
                case 3:
                    return void jDialog.alert("很抱歉，不支持此种支付方式");
                case 4:
                    return void jDialog.alert("很抱歉，支付失败");
                case 5:
                    return void jDialog.alert("登录失败")
            }
        }
    }
}
function closeWindow() {
    window.opener = null,
        window.open("", "_self"),
        window.close()
}
$("#a_Back").attr("href", "/wapproduct/wapdetail?" + location.search.substr(1)),
    $("#title_back").on("click",
        function() {
            $("#scroll_main").removeClass("scroll-right"),
                $("#save_input").val("")
        }),
    $(".part1_sc1_unem_3_2").eq(0).on("click",
        function() {
            $("#scroll_main").addClass("scroll-right")
        }),
    $(".part1_sc1_em").eq(0).on("click",
        function() {
            $("#scroll_main").addClass("scroll-right")
        }),
    $("#save_phone").on("click",
        function() {
            $("#save_input").val().match(/^1[34578]\d{9}$/) ? (em_sign = !1, $("#scroll_main").removeClass("scroll-right"), $(".part1_sc1_unem_3_1").eq(0).html($("#save_input").val()), $(".part1_sc1_unem_3_1").eq(0).attr("data-myphone", $("#save_input").val()), $(".part1_sc1_em").eq(0).hide(), $(".part1_sc1_unem").eq(0).show(), $("#save_input").val("")) : "" == $("#save_input").val() ? jDialog.alert("手机号不能为空") : (jDialog.alert("手机号格式不对，请重新输入"), $("#save_input").val(""))
        }),
    $(function() {
        setTimeout(function() {
                window.scrollTo(0, 1)
            },
            100),
            $(".calculator input").val("1")
    });
var max_num = $(".calculator input").data("max"),
    min_num = $(".calculator input").data("min"),
    now_price = $(".calculator").length > 0 ? $(".calculator input").data("price") : 0,
    now_num = $(".calculator input").val(),
    isFocus = 0,
    SIGN = !0;
checkStatus(1),
    $("#Cadd").on("tap",
        function() {
            return $(this).hasClass("disable") ? !1 : ($(".calculator input").val(parseInt($(".calculator input").val()) + 1), $("#payMoney").html("&yen;" + $(".calculator input").val() * now_price), void checkInput($(".calculator input").val()))
        }),
    $("#Creduce").on("tap",
        function() {
            return $(this).hasClass("disable") ? !1 : ($(".calculator input").val(parseInt($(".calculator input").val()) - 1), $("#payMoney").html("&yen;" + $(".calculator input").val() * now_price), void checkInput($(".calculator input").val()))
        }),
    $(".calculator input").on("tap",
        function() {
            $(this).focus()
        }).on("blur",
        function() {
            var a = checkInput($(".calculator input").val());
            a ? $("#payMoney").html("&yen;" + $(".calculator input").val() * now_price) : SIGN = a
        });
var PageURL, $loading;
$("#sure_btn").on("click",
    function() {
        function a(a, t) {
            var n = a || 1,
                e = t || 1;
            $.post("mock/wapcommit.json", {
                    period: e,
                    product_id: product_id,
                    phone: $(".part1_sc1_unem_3_1").eq(0).data("myphone"),
                    token: token,
                    number: n,
                    source_flag: 2
                },
                function(a) {
                    $loading.remove();
                    var t = JSON.parse(a);
                    if ("0" == t.errno) if (t.data.is_lottery) jDialog("参与成功，您的抽奖号是：" + t.data.coupon[0].code).addButton("立即查看",
                        function() {
                            window.location = "/wapuser/wapcenter"
                        });
                    else {
                        var n = t.data.url;
                        _BZF > 0 && "4" == _user_allow && parseInt(_user_level) > 1 ? window.location.href = "https://baifubao.baidu.com/jump?uri=/api/0/pay/0/wapdirect/0&" + n: (BDP.setConfig({
                            pay: {
                                params: n
                            }
                        }), PageURL = deparam(t.data.url).page_url, BDP.pay() || (window.location.href = "https://baifubao.baidu.com/jump?uri=/api/0/pay/0/wapdirect/0&" + n))
                    } else if ("86407" == t.errno) {
                        var e = encodeURIComponent("https://www.baifubao.com"),
                            o = encodeURIComponent(window.location.href),
                            l = encodeURIComponent("https://baifubao.baidu.com/jump?uri=" + o + "&domain=" + e),
                            i = "http://wappass.baidu.com/passport/?login&tpl=bp&adapter=1&regLink=1&u=" + l;
                        window.location = i
                    } else jDialog.alert(t.msg)
                })
        }
        if (!SIGN) return SIGN = !0,
            !1;
        if (em_sign) jDialog.alert("请添加手机号码");
        else if ($loading = jDialog.loading(), 6 == category) $.ajax({
            type: "GET",
            url: "/api/checkmobile",
            data: {
                phone: $(".part1_sc1_unem_3_1").eq(0).data("myphone"),
                product_id: product_id
            },
            dataType: "json",
            success: function(t) {
                0 == t.errno ? a() : jDialog.alert("该手机号段不支持！")
            }
        });
        else if (7 == category) {
            var t = $(".calculator input").val();
            a(t, _period)
        } else a()
    }),
    BDP.safe(function() {
        var a = function() {};
        BDP.setConfig("ak", "vQI5VWFXO98dZckcxwPkWzWP").setConfig("pay", {
            onBefore: function() {
                clouda.lightapp("vQI5VWFXO98dZckcxwPkWzWP"),
                    clouda.mbaas.pay.init("3400000001", {
                        onsuccess: a,
                        onfail: a
                    })
            },
            onsuccess: function(a) {
                payResult(a)
            },
            onfail: function(a) {
                payResult(a)
            }
        })
    });