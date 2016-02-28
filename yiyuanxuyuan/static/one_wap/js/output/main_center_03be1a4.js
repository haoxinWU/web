!
    function a(e, t, o) {
        function n(d, r) {
            if (!t[d]) {
                if (!e[d]) {
                    var s = "function" == typeof require && require;
                    if (!r && s) return s(d, !0);
                    if (i) return i(d, !0);
                    var l = new Error("Cannot find module '" + d + "'");
                    throw l.code = "MODULE_NOT_FOUND",
                        l
                }
                var c = t[d] = {
                    exports: {}
                };
                e[d][0].call(c.exports,
                    function(a) {
                        var t = e[d][1][a];
                        return n(t ? t: a)
                    },
                    c, c.exports, a, e, t, o)
            }
            return t[d].exports
        }
        for (var i = "function" == typeof require && require,
                 d = 0; d < o.length; d++) n(o[d]);
        return n
    } ({
            1 : [function(a) {
                var e = new _alert;
                e.init();
                var t = new _loading;
                t.init(),
                    $(function() {
                        function o(a) {
                            switch (a) {
                                case "djsm":
                                    $("article").hide(),
                                        $(".level_intro").show(),
                                        $("header h1").text("等级说明"),
                                        $("header #back").text("返回").attr("href", "javascript:history.go(-1)");
                                    break;
                                case "crowdfundingall":
                                    $(".crowdfundingallList").html(""),
                                        $("article").hide(),
                                        $(".crowdfundingallList").show(),
                                        $("header h1").text("全部许愿号码"),
                                        $("header #back").text("返回").attr("href", "javascript:history.go(-1)");
                                    var e = h(decodeURI(window.location.href)),
                                        o = "";
                                    o += "<h1>" + e.name + "</h1>",
                                        o += "<h2>" + e.join + "</h2>",
                                        $(u(e.start, e.num)).each(function(a, e) {
                                            o += "<i>" + e + "</i>"
                                        }),
                                        $(".crowdfundingallList").append(o);
                                    break;
                                case "ticketall":
                                    $(".lottorCardList ul").html(""),
                                        $("article").hide(),
                                        $(".lottorCardList").show(),
                                        $("header h1").text("全部赠券"),
                                        $("header #back").text("返回").attr("href", "javascript:history.go(-1)");
                                    var i = h(decodeURI(window.location.href));
                                    n(i.pid, 0, i.oid);
                                    break;
                                default:
                                    $("article").hide(),
                                        $(".center_goods").show(),
                                        $("header h1").text("个人中心"),
                                        $("header #back").text("返回首页").attr("href", "/")
                            }
                            t.hide()
                        }
                        function n(a, e, t) {
                            $.post("/product/couponlist", {
                                    product_id: a,
                                    p: e,
                                    order_id: t
                                },
                                function(a) {
                                    var a = $.parseJSON(a),
                                        e = "";
                                    $(a.data.list).each(function(a, t) {
                                        e += "<li>" + t.coupon_name + "&nbsp;<i>" + t.coupon_code + "</i></li>"
                                    }),
                                        $(".lottorCardList ul").append(e),
                                    a.data.pn * (a.data.p + 1) < a.data.total && $(".lottorCardList ul").append('<a href="javascript:void(0)" id="ticketallMore">查看更多</a>')
                                })
                        }
                        function i(a) {
                            for (var e in a) $(a[e]).each(function(a, e) {
                                s(e)
                            })
                        }
                        function d(a) {
                            return g_total > 10 * a ? !0 : !1
                        }
                        function r(a, o, n, i) {
                            var d = a,
                                r = o,
                                s = i ? i: "";
                            t.show(),
                                $.post("/wappay/wapcontinue", {
                                        order_id: d,
                                        token: r,
                                        source_flag: "2",
                                        period: s
                                    },
                                    function(a) {
                                        t.hide();
                                        var o = JSON.parse(a);
                                        if ("0" == o.errno) {
                                            var i = h(o.data).page_url,
                                                d = o.data;
                                            parseInt(n) > 0 ? window.location.href = "https://baifubao.baidu.com/jump?uri=/api/0/pay/0/wapdirect/0&" + d: _.indexOf("Baidu") >= 0 ? f(d, i, _) : window.location.href = "https://baifubao.baidu.com/jump?uri=/api/0/pay/0/wapdirect/0&" + d
                                        } else if ("86312" == o.errno) {
                                            var r = parseInt(n) - parseInt(bzf_total);
                                            if (r > 0) {
                                                var s = "兑换仅差" + r + "百赚分，赶紧赚取！";
                                                e.show(s, "知道了",
                                                    function() {})
                                            } else e.show("请刷新页面", "确定",
                                                function() {
                                                    window.location.reload()
                                                })
                                        } else if ("86407" == o.errno) {
                                            var l = encodeURIComponent("https://www.baifubao.com"),
                                                c = encodeURIComponent(window.location.href),
                                                p = encodeURIComponent("https://baifubao.baidu.com/jump?uri=" + c + "&domain=" + l),
                                                u = "http://wappass.baidu.com/passport/?login&tpl=bp&adapter=1&regLink=1&u=" + p;
                                            window.location = u
                                        } else e.show(o.msg, "确定",
                                            function() {
                                                window.location.reload()
                                            })
                                    })
                        }
                        function s(a) {
                            var e = a.small_pic,
                                t = a.product_id,
                                o = a.product_name,
                                n = "&yen;" + a.price / 100,
                                i = a.product_category,
                                d = c(a.status, i),
                                r = a.status,
                                s = a.product_type,
                                p = a.order_id,
                                f = a.create_time,
                                h = a.token,
                                _ = "/wapproduct/wapdetail?product_id=" + t,
                                b = a.ext_info.expire,
                                w = "&yen;" + a.total_amount / 100,
                                v = a.phone,
                                g = a.coupon ? a.coupon: "",
                                x = a.extension ? a.extension: "",
                                m = a.ext_info.vproduct_title,
                                k = a.ext_info.vproduct_desc,
                                y = a.exchange_status,
                                C = parseInt(a.ext_info.crowdfunding_current_period),
                                j = parseInt(a.ext_info_order.crowdfunding_period),
                                I = parseInt(a.ext_info.crowdfunding_current_period),
                                L = parseInt(a.ext_info.crowdfunding_period_user),
                                O = parseInt(a.ext_info.crowdfunding_current_period_number),
                                U = parseInt(a.ext_info.crowdfunding_total_period),
                                D = a.lottery ? a.lottery: "",
                                M = "",
                                R = a.crowdfunding_code ? a.crowdfunding_code: "",
                                z = a.order_count ? a.order_count: "",
                                S = "";
                            if (R && z) {
                                var N = 0,
                                    B = "";
                                z && z - 1 > 12 ? (N = 12, B = '<a href="javascript:void(0)" id="crowdfundingallMore">查看更多我的许愿号码</a>') : N = z,
                                    $(u(R, N)).each(function(a, e) {
                                        S += "<i>" + e + "</i>"
                                    }),
                                    S += B
                            }
                            var E = "--",
                                q = "--",
                                J = "--",
                                T = "--",
                                F = "--";
                            D ? (a.lottery.lottery_coupon ? (M = D.lottery_coupon, E = M.crowdfunding_code ? M.crowdfunding_code: "--", q = M.user_name ? M.user_name: "--", J = M.order_count ? M.order_count: "--", T = M.lotteryCode ? M.lotteryCode: "--") : E = "0", F = D.insert_time ? D.insert_time: "--") : E = "0";
                            var P = a.ext_info_order.bzf_score;
                            a.ext_info_order && a.ext_info_order.bzf_score && a.ext_info_order.bzf_score > 0 && (n += "+" + a.ext_info_order.bzf_score + "百赚分");
                            var A = "";
                            if (7 == i) {
                                var Z, G, H, K, Q, V, W = d;
                                j != C ? (Z = "100%", G = L, H = 0) : (Z = O / L * 100 + "%", G = L, H = L - O),
                                    1 == r ? b ? (K = "", Q = "", W = "活动结束", V = "") : C != U + 1 ? (K = "center_pay", Q = "付款", V = "", W += "<i>" + w + "</i>") : (K = "", Q = "", W = "活动结束", V = "") : 2 == r ? (K = "center_look", Q = "展开订单", j != C ? "0" == E || "--" == E ? (W = "开奖中", V = '<div class="de3"><dl>') : (W = R != E ? "已揭晓（未中奖）": "恭喜中奖", V = '<div class="de3"><dl>                             <dd><label>获奖者：</label><span>' + q + "(本次参与" + J + "人次)</span></dd>                             <dd><label>幸运号码：</label><span>" + T + "</span></dd>                             <dd><label>揭晓时间：</label><span>" + F + "</span></dd>") : (W = b ? "抽奖取消，退款中": "等待开奖<a href=/waporder/wapconfirm?product_id=" + t + ">追加</a>", V = '<div class="de3"><dl>'), V += '<dd><label>本次参与：</label><span  class="join"><b>' + z + '</b>人次</span></dd>                                <dd><label class="xynum" data-n="' + R + '">许愿号码：</label><span>' + S + '</span></dd>                                <dd><label>赠券：</label><span class="coupon_card" data-pid=' + t + " data-oid=" + p + ">一共获得<b>" + z + '</b>张赠券<i class="look">查看&gt;</i></span></dd>                            </dl></div>') : (K = "", Q = "", V = "", b && "0" == E && (W = "活动结束，" + W), (z || R) && (K = "center_look", Q = "展开订单", V = '<div class="de3"><dl>                                <dd><label>本次参与：</label><span class="join"><b>' + z + '</b>人次</span></dd>                                <dd><label class="xynum" data-n="' + R + '">许愿号码：</label><span>' + S + '</span></dd>                                <dd><label>赠券：</label><span class="coupon_card" data-pid=' + t + " data-oid=" + p + ">一共获得<b>" + z + '</b>张赠券<i class="look">查看&gt;</i></span></dd>                            </dl></div>')),
                                    A += '<li id="' + p + '">' + l({
                                            producturl: _,
                                            pic: e,
                                            crowd_current_order: j,
                                            name: o,
                                            _need: G,
                                            _left: H,
                                            _width: Z,
                                            price: a.price / 100,
                                            crowd_my_no: z,
                                            isExpired: a.ext_info.crowdfunding_current_period > a.ext_info_order.crowdfunding_period
                                        }) + '<div class="de2 clearfix">                                <span><b>' + W + '</b></span>                            <a href="javascript:void(0)" class="' + K + '" data-id="' + p + '" data-token="' + h + '" data-bzf="' + P + '" data-period="' + I + '">' + Q + "</a>                        </div>                        " + V + "                        </li>"
                            } else {
                                var K, Q, X = "";
                                if (1 == r) K = "center_pay",
                                    Q = "付款";
                                else {
                                    if (K = "center_look", Q = "展开订单", X = '<div class="de3">                                <dl>                                    <dd><label>订单编号：</label><span>' + p + "</span></dd>                                    <dd><label>购买时间：</label><span>" + f + "</span></dd>", 1 == s) {
                                        if (X += "<dd><label>收货信息：</label><span>" + v + "</span></dd>", g && $(g).each(function(a, e) {
                                                X += e.mobile_url ? '<dd class="coupon"><label><a href="' + e.mobile_url + e.code + '">' + e.name + "</a>：</label><span>" + e.code + "</span></dd>": '<dd class="coupon"><label>' + e.name + "：</label><span>" + e.code + "</span></dd>"
                                            }), (5 == i || 6 == i) && (X += "<dd><label>" + m + "：</label><span>" + k + "</span></dd>"), 6 == i) {
                                            var Y;
                                            switch (y) {
                                                case "0":
                                                    Y = "未充值";
                                                    break;
                                                case "1":
                                                    Y = "充值成功";
                                                    break;
                                                case "2":
                                                    Y = "充值失败";
                                                    break;
                                                case "3":
                                                    Y = "充值中..."
                                            }
                                            X += "<dd><label>充值状态：</label><span>" + Y + "</span></dd>"
                                        }
                                    } else x && ((2 == r || 7 == r) && (X += "<dd><label>收货信息：</label><span>" + x.user_name + "&nbsp;" + x.phone + "</span></dd>                                           <dd><label>收货地址：</label><span>" + x.address + "</span></dd> "), 7 == r && (X += "<dd><label>物流信息：</label><span>" + x.express_company + "</span></dd>                                           <dd><label>快递单号：</label><span>" + x.express_postid + "</span></dd> "));
                                    X += "</dl></div>"
                                }
                                A += '<li id="' + p + '">                    <div class="de1 clearfix">                        <a href="' + _ + '">                        <img src="' + e + '">                        <h2>' + o + "</h2>                        <p>" + n + '</p>                        </a>                    </div>                    <div class="de2 clearfix">                        <span>订单状态：<b>' + d + '</b></span>                        <a href="javascript:void(0)" class="' + K + '" data-id="' + p + '" data-token="' + h + '" data-bzf="' + P + '"  data-period="' + j + '">' + Q + "</a>                    </div>                    " + X + "                    </li>"
                            }
                            $(".listDtail ul").append(A)
                        }
                        function l(a) {
                            var e = ['<div class="de4 clearfix">', '	<a href="{producturl}">', '		<img src="{pic}">', "		<h2>(第{crowd_current_order}期){name}</h2>"];
                            return a._left ? e.push.apply(e, ['<span><strong style="width:{_width}"></strong></span>', "<p>总需要{_need}人次/剩余<b>{_left}</b>人次</p>"]) : a.isExpired && (a.price = a.price * a.crowd_my_no, e.push("<p><strong>&yen;{price}</strong></p>")),
                                e.push.apply(e, ["	</a>", "</div>"]),
                                e.join("").replace(/{(.*?)}/gim,
                                    function(e, t) {
                                        return a[t]
                                    })
                        }
                        var c = a("./returnStatus"),
                            p = a("./hash"),
                            u = a("./numplus1"),
                            f = a("./dopayCenter"),
                            h = a("./departUrl"),
                            _ = a("./deviceClass"),
                            b = "",
                            w = 1;
                        if (t.show(), window.addEventListener("hashchange",
                                function() {
                                    b = p(),
                                        o(b)
                                }), $("#ownBZF").on("click",
                                function(a) {
                                    a.stopPropagation()
                                }), $("header").on("click", "#logOut",
                                function() {
                                    e.show("确定退出当前账号", "确定",
                                        function() {
                                            t.show("退出中"),
                                                window.location = "http://wappass.baidu.com/passport/?logout&tpl=bp&u=" + encodeURIComponent("https://1.baidu.com")
                                        },
                                        "取消", null)
                                }), $.getJSON("https://www.baifubao.com/portrait/0/get_portrait/0?callback=?",
                                function(a) {
                                    a.head_url && ($(".center_user img").attr("src", a.head_url), $(".level_intro img").attr("src", a.head_url))
                                }), $(".center_user_info").on("click",
                                function() {
                                    window.location.hash = "djsm"
                                }), $(".listDtail").on("click", ".coupon_card",
                                function() {
                                    window.scrollTo(0, 1),
                                        $(".lottorCardList").data("pid", $(this).data("pid")),
                                        $(".lottorCardList").data("page", 0),
                                        $(".lottorCardList").data("oid", $(this).data("oid")),
                                        window.location.hash = encodeURI("ticketall?type=1&pid=" + $(this).data("pid") + "&p=0&oid=" + $(this).data("oid"))
                                }), $(".lottorCardList").on("click", "#ticketallMore",
                                function() {
                                    $(this).remove(),
                                        $(".lottorCardList").data("page", $(".lottorCardList").data("page") + 1);
                                    var a = $(".lottorCardList").data("pid"),
                                        e = $(".lottorCardList").data("oid"),
                                        t = $(".lottorCardList").data("page");
                                    n(a, t, e)
                                }), $(".listDtail").on("click", "#crowdfundingallMore",
                                function() {
                                    window.scrollTo(0, 1);
                                    var a = $(this).closest("li").find(".de4 h2").text(),
                                        e = "本期参与" + $(this).closest(".de3").find(".join").text(),
                                        t = $(this).closest(".de3").find(".xynum").data("n"),
                                        o = $(this).closest(".de3").find(".join b").text();
                                    window.location.hash = encodeURI("crowdfundingall?type=2&name=" + a + "&join=" + e + "&start=" + t + "&num=" + o)
                                }), $(".listDtail").on("click", ".center_look",
                                function() {
                                    $(this).toggleClass("active"),
                                        $(this).closest("li").find(".de3").toggle()
                                }), $(".listDtail").on("click", ".center_pay",
                                function() {
                                    r($(this).data("id"), $(this).data("token"), $(this).data("bzf"), $(this).data("period"))
                                }), $(".listDtail").on("click", "#loadMore",
                                function() {
                                    $(this).text("加载中..."),
                                        w++,
                                        $.getJSON("mock/orderlist.json?p=" + (w - 1),
                                            function(a) {
                                                if (0 != a.errno) e.show(a.msg);
                                                else {
                                                    $("#loadMore").remove();
                                                    var t = a.data.list;
                                                    i(t),
                                                    d(w) && $(".listDtail").append('<a id="loadMore">加载更多</a>')
                                                }
                                            })
                                }), data) i(data);
                        else {
                            var v = "您还未下过任何订单哦~",
                                g = "立即购物";
                            $(".center_goods .listDtail").html('<div class="nolist"><h2>' + v + '</h2><a href="/">' + g + "</a></div>")
                        }
                        d(w) && $(".listDtail").append('<a id="loadMore">加载更多</a>'),
                            b = p(),
                            o(b)
                    })
            },
                {
                    "./departUrl": 2,
                    "./deviceClass": 3,
                    "./dopayCenter": 4,
                    "./hash": 5,
                    "./numplus1": 6,
                    "./returnStatus": 7
                }],
            2 : [function(a, e) {
                function t(a) {
                    a = a.slice(a.indexOf("?") + 1).split("&");
                    for (var e, t = {},
                             o = function(a) {
                                 try {
                                     return window.decodeURIComponent(a)
                                 } catch(e) {
                                     return a
                                 }
                             },
                             n = a.length - 1; n >= 0; n--) e = a[n].split("="),
                        t[o(e[0])] = o(e[1]);
                    return t
                }
                e.exports = t
            },
                {}],
            3 : [function(a, e) {
                var t = navigator.userAgent.toLowerCase(),
                    o = function(a) {
                        var e = "";
                        return /android/i.test(a) ? (e = "android", (/baiduboxapp/i.test(a) || /baiduwallet/i.test(a)) && (e = "Baidu_android")) : /iphone|ipad|ipod/i.test(a) ? (e = "ios", (/baiduboxapp/i.test(a) || /baiduwallet/i.test(a)) && (e = "Baidu_ios")) : ((/baiduboxapp/i.test(a) || /baiduwallet/i.test(a)) && (e = "Baidu_other"), e = "other"),
                            e
                    };
                e.exports = o(t)
            },
                {}],
            4 : [function(a, e) {
                function t(a, e) {
                    n = e;
                    var t = !0,
                        i = function(a) {
                            o(a)
                        },
                        d = function(a) {
                            o(a)
                        },
                        r = {};
                    r.orderInfo = a,
                        r.showdDialog = t,
                        r.onsuccess = i,
                        r.onfail = d,
                        clouda.mbaas.pay.doPay(r)
                }
                function o(a) {
                    function e() {
                        for (var e = 0,
                                 t = a.length; t > e; e++) {
                            var o = a[e].split("={");
                            if (2 == o.length && "notify" == o[0]) {
                                var i = n + "?" + o[1];
                                i = i.substring(0, i.length - 1),
                                    window.location = i
                            }
                        }
                    }
                    if (a.length > 0) {
                        a = a.substring(0, a.length - 1),
                            a = a.split("};");
                        for (var t = 0,
                                 o = a.length; o > t; ++t) {
                            var i = a[t].split("={");
                            if (2 == i.length && "statecode" == i[0]) switch (parseInt(i[1])) {
                                case 0:
                                    return void now_box.show("支付成功", "确定",
                                        function() {
                                            e()
                                        });
                                case 1:
                                    return void now_box.show("支付中");
                                case 2:
                                    return void now_box.show("支付已经取消");
                                case 3:
                                    return void now_box.show("很抱歉，不支持此种支付方式");
                                case 4:
                                    return void now_box.show("很抱歉，支付失败");
                                case 5:
                                    return void now_box.show("登录失败")
                            }
                        }
                    }
                }
                var n;
                e.exports = t
            },
                {}],
            5 : [function(a, e) {
                function t() {
                    var a, e = window.location.hash;
                    return e.indexOf("djsm") >= 0 && (a = "djsm"),
                    e.indexOf("crowdfundingall") >= 0 && (a = "crowdfundingall"),
                    e.indexOf("ticketall") >= 0 && (a = "ticketall"),
                    "" == e && (a = "index"),
                        a
                }
                e.exports = t
            },
                {}],
            6 : [function(a, e) {
                function t(a, e) {
                    var t = a.slice(a.length - 8, a.length),
                        o = parseInt(t, 10),
                        n = a.slice(0, a.length - 8),
                        i = [],
                        d = 0;
                    for (d; e > d; d++) {
                        var r = (o + d).toString(),
                            s = 8 - r.length,
                            l = "",
                            c = 0;
                        for (c; s > c; c++) l += "0";
                        l += r,
                            i.push(n + l)
                    }
                    return i
                }
                e.exports = t
            },
                {}],
            7 : [function(a, e) {
                function t(a, e) {
                    var t;
                    switch (a) {
                        case "1":
                            t = "未支付";
                            break;
                        case "2":
                            t = "2" == e ? "参与成功": "支付成功";
                            break;
                        case "3":
                            t = "申请退款";
                            break;
                        case "4":
                            t = "退款中";
                            break;
                        case "5":
                            t = "退款成功";
                            break;
                        case "6":
                            t = "已取消";
                            break;
                        case "7":
                            t = "已发货";
                            break;
                        case "8":
                            t = "退款失败"
                    }
                    return t
                }
                e.exports = t
            },
                {}]
        },
        {},
        [1]);