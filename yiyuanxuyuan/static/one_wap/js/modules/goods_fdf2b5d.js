"use strict";
Vue.ready(function(t) {
    function n(t) {
        return t = JSON.parse(JSON.stringify(t)),
            t.sct = BDP.os.android,
            t.btnAction = null,
            t.tabConfig = {
                1 : {
                    url: "mock/crowdfundinglottery.json",
                    type: "crowdfundinglottery",
                    pageNumber: 0,
                    period: "",
                    status: "ready"
                },
                2 : {
                    url: "mock/crowdfunding",
                    type: "crowdfunding",
                    pageNumber: 0,
                    period: 0,
                    status: "ready"
                }
            },
            t.pageTitle = "1" === t.is_fountain ? "优惠券详情": "商品详情",
            t.crowdfunding_current_period = t.crowdfunding_current_period || 1,
            t.left_time = function(t) {
                if (!t) return 0;
                var n = t.match(/\d+(\.\d+)?/g).map(function(t) {
                        return parseInt(t, 10)
                    }),
                    e = {
                        1 : function() {
                            return n[0]
                        },
                        2 : function() {
                            return 60 * n[0] + n[1]
                        },
                        3 : function() {
                            return 3600 * n[0] + 60 * n[1] + n[2]
                        },
                        4 : function() {
                            return 86400 * n[0] + 3600 * n[1] + 60 * n[2] + n[3]
                        }
                    };
                return e[n.length]()
            } (t.left_time),
            BDP.addRule("map", t.isInMap),
            t.envLightapp = BDP.safe(),
            t
    }
    function e(t) {
        var n = d.body,
            e = d.documentElement.scrollHeight - d.documentElement.clientHeight - n.scrollTop;
        return (t || 0) > e || 0 == e || d.documentElement.scrollHeight < d.documentElement.clientHeight
    }
    function i(n, e, i, o) {
        var r = jDialog.loading(o);
        t.getJSON(n, e,
            function(t) {
                i.call(this, t),
                r.wrapper && r.remove()
            })
    }
    var o, r, a, u, c = {
            isSupportLocalStorage: function() {
                var t = !0,
                    n = localStorage;
                try {
                    n.setItem("__1baidu_test__", 1),
                        n.removeItem("__1baidu_test__")
                } catch(e) {
                    t = !1
                }
                return t
            } (),
            getData: function(t) {
                return this.isSupportLocalStorage ? localStorage.getItem(t) : null
            },
            setData: function(t, n) {
                this.isSupportLocalStorage && localStorage.setItem(t, n)
            }
        },
        l = window,
        d = document,
        p = t.$,
        s = null,
        f = {
            define: function(n, e) {
                return t.util.isPlainObject(n) ? t.util.extend(this, n) : this[n] = e,
                    this
            },
            run: function(n, e) {
                return Array.isArray(n) ? t.util.each(n,
                    function(t) {
                        f.run(t, e)
                    }) : (console.log("[ Execute command: ]", n), f[n] && f[n].apply(e || l, [].concat(Array.prototype.slice.call(arguments, 2))))
            }
        };
    u = n(l.ONEBAIDU),
        l.ONEBAIDU = null,
        r = "/waporder/wapconfirm?product_id=" + u.product_id,
        a = u.tabConfig,
        t.filter("btnTextFilter",
            function(t) {
                var n = {
                    1 : function() {
                        return "活动尚未开始"
                    },
                    2 : function() {
                        if (u.is_fountain) return u.btnAction = "btnActionFountain",
                            "免费领取";
                        var t = "";
                        return "7" === u.category ? parseInt(u.crowdfunding_current_period) > parseInt(u.crowdfunding_total_period) ? t = "许愿结束": (t = "立即许愿", u.btnAction = "btnActionNormal") : (t = "2" === u.category_type || "3" === u.category_type ? "立即抽奖": "立即享有", u.btnAction = "btnActionNormal"),
                            t
                    },
                    3 : function() {
                        return "活动已结束"
                    },
                    4 : function() {
                        return "已卖光"
                    },
                    5 : function() {
                        return "预览中"
                    },
                    6 : function() {
                        return "已下架"
                    }
                };
                return n[t].call(this)
            }),
        t.filter("priceFilter",
            function() {
                return "0" !== u.price ? "&yen;<b>" + u.price / 100 + "</b><strong>会员福利价</strong>": "&yen;<b>0</b><strong>免费获取</strong>"
            }),
        t.filter("timerFilter",
            function(t) {
                return u.left_time <= 0 ? (clearInterval(s), "剩余<b>--</b>天<b>--</b>时<b>--</b>分<b>--</b>秒") : "剩余<b>" + Math.floor(t / 86400) % 30 + "</b>天<b>" + Math.floor(t / 3600) % 24 + "</b>时<b>" + Math.floor(t / 60) % 60 + "</b>分<b>" + t % 60 + "</b>秒"
            }),
        t.filter("parseMapUrlFilter",
            function(n) {
                return "http://co.baifubao.com/content/mywallet/h5/1_baidu/map.html?" + t.util.param({
                        location: n.location,
                        title: n.storename,
                        content: n.address
                    })
            }),
        t.filter("parseMerchantListUrlFilter",
            function() {
                return "/static/one_wap/html/shops.html?" + t.util.param({
                        product_id: u.product_id,
                        sct: u.sct,
                        activity_no: u.activity_no
                    })
            }),
        t.filter("loadedTipFilter",
            function(t) {
                return "loading" == t.status ? "数据加载中...": "loaded" == t.status ? "没有更多数据了": ""
            }),
        f.define("btnActionNormal",
            function() {
                return f.run(u.user_allow)
            }),
        f.define({
            1 : function() {
                "7" === u.category ? l.location.href = r: f.run("checker")
            },
            2 : function() {
                "2" === u.user_level ? jDialog.error("仅限新人购买！") : f.run("checker")
            },
            3 : function() {
                "1" === u.user_level ? jDialog.error("仅限老用户购买！") : f.run("checker")
            },
            4 : function() {
                return f.run("checker")
            }
        }),
        f.define("checker",
            function() {
                i("/order/unpaynum", {
                        product_id: u.product_id
                    },
                    function(t) {
                        return 0 != t.errno ? 86407 == t.errno ? f.run("login") : jDialog.error(t.msg) : t.data.paymore ? t.data.unpay ? jDialog("还有未支付订单").addButton("重新下单",
                            function() {
                                l.location.href = r
                            }) : l.location.href = r: jDialog.error("你已经达到最大购买数量限制！")
                    },
                    "检查中...")
            }),
        f.define("login",
            function(t) {
                if (BDP.safe("map")) return jDialog.alert("请返回 <strong>[设置]</strong> ，退出第三方登录，使用百度账号登录！");
                var n = "http://wappass.baidu.com/passport/?login&tpl=bp&adapter=1&sms=1&regLink=1&u=",
                    e = "https://baifubao.baidu.com/jump?uri=" + (t || l.location.href);
                BDP.login(null, e) || (l.location.href = n + encodeURIComponent(e))
            }),
        f.define("btnActionFountain",
            function() {
                var n = {
                        product_id: u.product_id,
                        mt: u.mt
                    },
                    e = "https://1.baidu.com/wapproduct/wapfountain?" + t.util.param(n);
                i("/wapproduct/wapparticipate", n,
                    function(t) {
                        return "0" != t.errno ? "86407" == t.errno ? f.run("login", null, e) : jDialog.error(t.msg) : void(l.location.href = e)
                    },
                    "检查中...")
            }),
        f.define("getListData",
            function(n, e) {
                var i = a[n];
                0 != n && "loading" !== i.status && "loaded" !== i.status && (i.status = "loading", t.getJSON(i.url, {
                        product_id: u.product_id,
                        p: i.pageNumber,
                        period: i.period
                    },
                    function(n) {
                        return 0 != n.errno ? jDialog.error(n.msg) : n.data ? (t.util.each(n.data.list,
                            function(t) {
                                u[i.type].push(t)
                            }), i.pageNumber++, i.status = n.data.pn * n.data.p >= n.data.total || n.data.list.length < 10 ? "loaded": "ready", void(e && e())) : (i.status = "loaded", e && e())
                    }))
            }),
        f.define("initD1",
            function(t) {
                f.run("getListData", null, t,
                    function() {
                        delete f["initD" + t]
                    })
            }),
        f.define("initD2",
            function(t) {
                f.run("getListData", null, t,
                    function() {
                        delete f["initD" + t]
                    })
            }),
        f.define("share",
            function(t) {
                var n = "我在百度钱包看中了“" + u.product_name + "”，小伙伴们快来参与吧~";
                BDP.setConfig({
                    ak: "ROSFECIoxu63pwG43sISKUrb",
                    share: {
                        $id: "shareBtn",
                        linkUrl: l.location.href,
                        imageUrl: u.head_picurl[0],
                        content: n,
                        title: n,
                        onload: function(n) {
                            n(),
                            t && t()
                        },
                        envLightapp: !1
                    }
                }).share()
            }),
        f.define("initTimeCountDown",
            function() {
                0 !== u.left_time && (s = setInterval(function() {
                        u.left_time -= 1
                    },
                    1e3))
            }),
        f.define("initKuang",
            function() {
                "1" == u.is_login && u.pass_phone && c.setData("__pass_phone__", u.pass_phone),
                    BDP.setConfig("login", {
                        login_type: "sms"
                    }),
                c.getData("__pass_phone__") && BDP.setConfig("login", {
                    mobile: c.getData("__pass_phone__")
                })
            }),
        f.define("initSwiper",
            function() {
                p("#imgInfo").height(.666 * p("#wrapper").width()),
                !("1" === u.is_fountain) && t.loadFile("static/one_wap/js/vendor/idangerous.swiper_fc89bdd.js",
                    function() {
                        new Swiper(".swiper-container", {
                            lazyLoading: !0,
                            onSlideChangeEnd: function(t) {
                                u.picUrlSelectedIndex = t.activeIndex + 1
                            }
                        })
                    })
            }),
        f.define("pageFinish",
            function() {
                p("#loading").hide(),
                    p("#wrapper").css("opacity", "1"),
                    l.scrollTo(0, 1)
            }),
        f.define("bindEvent",
            function() {
                function t() {
                    if (e(300) && 0 == u.tabindex) {
                        var n = "h5DescriptionBackup",
                            i = "h5_description";
                        u[i].push.apply(u[i], u[n]),
                            delete u[n],
                            a.off("touchmove", t)
                    }
                }
                function n() {
                    var t = jDialog.loading("分享组件加载中...");
                    f.run("share", null,
                        function() {
                            t.remove()
                        }),
                        r.off("click", n)
                }
                function i() {
                    e(300) && 0 !== u.tabindex && setTimeout(function() {
                            f.run("getListData", null, u.tabindex)
                        },
                        50)
                }
                var o = p("#back2top"),
                    r = p("#shareBtn"),
                    a = p(d);
                a.on("touchmove",
                    function() {
                        o[d.body.scrollTop > 50 ? "show": "hide"]()
                    }),
                    o.on("click",
                        function() {
                            l.scrollTo(0, 1),
                                o.hide()
                        }),
                    a.on("touchmove", t),
                    r.on("click", n),
                7 == u.category && a.on("touchmove", i)
            }),
        f.define("fountainParticipatedPrompt",
            function() {
                jDialog('<div class="text-center" style="padding:10px 0;">你已领取过此优惠券，可立即查看</div>').width(250).addClass("dialog-rounder").addButton("查看我的优惠券",
                    function() {
                        l.location.href = "https://wallet.baidu.com/yqcard/content/mywallet/h5/sdk_page/sdk_quan_manager.html"
                    }).title('提示<span data-dialog-action="destory" style="position: absolute;right: 1em;">关闭</a>').delButton(1).getHeader().style.position = "relative"
            }),
        f.define("buildMerchant",
            function() {
                function n() {
                    t.getJSON("/wapproduct/wapmerchant", {
                            pn: 1,
                            ps: 1,
                            latlng: e,
                            sct: u.sct,
                            activity_no: u.activity_no
                        },
                        function(t) {
                            u.merchant = 0 != t.errno ? null: t.data.merchant[0]
                        })
                }
                var e = "";
                n();
                try {
                    navigator.geolocation.getCurrentPosition(function(t) {
                            var i = t.coords;
                            e = i.latitude + "," + i.longitude,
                                n()
                        },
                        n)
                } catch(i) {
                    n()
                }
            });
    var g = "本次活动仅限从未体验过会员的用户参加哦，去会员吧看看还有什么精彩活动吧~";
    f.define("tiebaParticipatePrompt",
        function() {
            jDialog.alert(g,
                function() {
                    l.location.href = u.tieba_url
                })
        }),
        o = new t({
            el: "#wrapper",
            data: u,
            methods: {
                transform: function() { ! (null == u.btnAction) && f.run(u.btnAction, this)
                },
                switcher: function(t) {
                    return u.tabindex = t,
                        f.run("initD" + t, null, t)
                },
                triggerAnnouncement: function() {
                    u.announcement_url && (l.location.href = u.announcement_url)
                }
            }
        }),
        o.$watch("crowdfunding",
            function(t, n) {
                var e = 0,
                    i = "";
                return n.map(function(t) {
                    t.period == e ? t.$add("hideTitle", !0) : e = t.period;
                    var n = t.create_time.split(" ")[0];
                    return n == i ? t.$add("hideTime", !0) : i = n,
                        t
                })
            });
    var h = [];
    "1" == u.is_fountain && h.push("buildMerchant"),
    "1" == u.fountain_coupon_participate && (h.push("fountainParticipatedPrompt"), o.btnAction = null),
    u.envLightapp && h.push("initKuang"),
    "7" != u.category && "1" !== u.is_fountain && h.push("initTimeCountDown"),
    "8" === u.category && "1" === u.tieba_member && (h.push("tiebaParticipatePrompt"), o.btnAction = null),
        h.push.apply(h, ["initSwiper", "pageFinish", "bindEvent"]),
        f.run(h)
});