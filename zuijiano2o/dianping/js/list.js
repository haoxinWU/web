!
    function() {
        function a(a, i) {
            for (var e in i) a[e] = i[e];
            return a
        }
        var i = "iscroll@~5.0.9",
            e = "list-nav@~1.0.0",
            n = "zepto@^1.2.1",
            r = "cookie@~0.1.0",
            o = "mobile-common@~0.2.9",
            t = "huatuo@^1.0.6",
            d = "base-op-url@^1.1.3",
            s = "whereami@~0.2.1",
            c = "app-m-dianping-list@1.3.22/js/dynamic_load.js",
            p = "app-m-dianping-list@1.3.22/js/loadmore.js",
            l = "wepp-module-toast@~0.3.0",
            v = "app-m-dianping-list@1.3.22/index.js",
            u = [i],
            f = {
                iscroll: i
            },
            m = f;
        define(v, [e, n, r, o, t, d, s, c],
            function(a, i, e, n, r) {
                function o(a, i) {
                    var e = T('<nav class="list-nav "></nav>');
                    y.after(e);
                    var n, r = (T('<div class="cat Fix"> <a href="javascript:void(0)" class="item J_trigger">' + i.nav1 + '<i class="drop"></i></a> <a href="javascript:void(0)" class="item J_trigger">' + i.nav2 + ' <i class="drop"></i> </a> <a href="javascript:void(0)" class="item J_trigger">' + i.nav3 + ' <i class="drop"></i> </a> </div>').appendTo(e), T('<section class="selector J_selector Hide"></section>').appendTo(e)),
                        o = T('<div class="second-selector Hide" data-name="商区"></div>').appendTo(r),
                        t = T('<div class="menu main"><div></div></div>').appendTo(o),
                        d = t.find("div"),
                        s = !1;
                    i.diffcity || a.rangeNavs && a.rangeNavs.length && (a.currentRange ? (n = T('<div> <p class="item Fix on">附近</p> <div class="menu sub"><div></div></div></div>').appendTo(d).find(".sub div"), a.rangeNavs.forEach(function(e) {
                        var r;
                        a.currentRange.id == e.id ? (s = !0, r = T('<a class="item Fix on" href="" >' + e.name + "</a> ").appendTo(n)) : r = T('<a class="item Fix " href="" >' + e.name + "</a> ").appendTo(n),
                            r.on("click",
                                function(a) {
                                    a.preventDefault(),
                                        B = !1,
                                    h && (O = !0),
                                        T(".load-wrap").remove(),
                                        v(),
                                        c(),
                                        T(".loading_pic").show(),
                                        C = !1,
                                        D++;
                                    e.name.indexOf("附近") > -1 ? "附近": e.name;
                                    if (g = "&range=" + e.id, history.pushState) {
                                        var n = {
                                                start: 0,
                                                categoryid: i.categoryid,
                                                sortid: i.sortid,
                                                pos: !0,
                                                range: e.id,
                                                keyword: i.keyword,
                                                diffcity: i.diffcity
                                            },
                                            r = u(n);
                                        T(window).unbind("scroll"),
                                            p(r, n);
                                        var o = location.href.replace(/(\/d\/\d*)|(\/r\/\d*)/, "/d/" + ("-1" == e.id ? 1 : e.id));
                                        history.pushState({
                                                url: r,
                                                params: n
                                            },
                                            "", o)
                                    }
                                })
                    })) : (n = T('<div> <p class="item Fix">附近</p> <div class="menu sub Hide"><div></div></div></div>').appendTo(d).find(".sub div"), a.rangeNavs.forEach(function(a) {
                        var e = T('<a class="item Fix " href="" >' + a.name + "</a> ").appendTo(n);
                        e.on("click",
                            function(e) {
                                e.preventDefault(),
                                    B = !1,
                                h && (O = !0),
                                    T(".load-wrap").remove(),
                                    v(),
                                    c(),
                                    T(".loading_pic").show(),
                                    C = !1,
                                    D++;
                                var n = a.name.indexOf("附近") > -1 ? "附近": a.name;
                                if (g = "&range=" + a.id, history.pushState) {
                                    var r = {
                                            start: 0,
                                            categoryid: i.categoryid,
                                            sortid: i.sortid,
                                            pos: !0,
                                            range: a.id,
                                            nav1: n,
                                            nav2: i.nav2,
                                            nav3: i.nav3,
                                            keyword: i.keyword,
                                            diffcity: i.diffcity
                                        },
                                        o = u(r);
                                    T(window).unbind("scroll"),
                                        p(o, r);
                                    var t = location.href.replace(/(\/d\/\d*)|(\/r\/\d*)/, "/d/" + ("-1" == a.id ? 1 : a.id));
                                    history.pushState({
                                            url: o,
                                            params: r
                                        },
                                        "", t)
                                }
                            })
                    })));
                    var l;
                    if (a.currentRegion && (l = a.currentRegion.id), "undefined" != typeof l) {
                        var f = !1;
                        a.regionNavs.forEach(function(a) {
                            if (0 == a.parentId) n = T('<div> <p class="item Fix">' + a.name + '</p> <div class="menu sub Hide"><div></div></div></div>').appendTo(d).find(".sub div");
                            else {
                                var e;
                                a.id != l || f ? e = T('<a class="item Fix" href="" >' + a.name + "</a> ").appendTo(n) : (e = T('<a class="item Fix on" href="" >' + a.name + "</a> ").appendTo(n), n.parent().parent().find("p.item").addClass("on"), n.parent().parent().find(".sub").removeClass("Hide"), f = !0, s = !0),
                                    e.on("click",
                                        function(e) {
                                            if (e.preventDefault(), B = !1, h && (O = !0), T(".load-wrap").remove(), v(), c(), T(".loading_pic").show(), C = !1, D++, g = "&regionid=" + a.id, history.pushState) {
                                                var n = {
                                                        start: 0,
                                                        categoryid: i.categoryid,
                                                        sortid: i.sortid,
                                                        pos: !1,
                                                        regionid: a.id,
                                                        nav1: a.name,
                                                        nav2: i.nav2,
                                                        nav3: i.nav3,
                                                        keyword: i.keyword,
                                                        diffcity: i.diffcity
                                                    },
                                                    r = u(n);
                                                T(window).unbind("scroll"),
                                                    p(r, n);
                                                var o = location.href.replace(/(\/d\/\d*)|(\/r\/\d*)/, "/r/" + a.id);
                                                history.pushState({
                                                        url: r,
                                                        params: n
                                                    },
                                                    "", o)
                                            }
                                        })
                            }
                        })
                    } else a.regionNavs.forEach(function(a) {
                        if (0 == a.parentId) n = T('<div> <p class="item Fix">' + a.name + '</p> <div class="menu sub Hide"><div></div></div></div>').appendTo(d).find(".sub div");
                        else {
                            var e = T('<a class="item Fix" href="" >' + a.name + "</a> ").appendTo(n);
                            e.on("click",
                                function(e) {
                                    if (e.preventDefault(), B = !1, h && (O = !0), T(".load-wrap").remove(), v(), c(), T(".loading_pic").show(), C = !1, D++, g = "&regionid=" + a.id, history.pushState) {
                                        var n = {
                                                start: 0,
                                                categoryid: i.categoryid,
                                                sortid: i.sortid,
                                                pos: !1,
                                                regionid: a.id,
                                                nav1: a.name,
                                                nav2: i.nav2,
                                                nav3: i.nav3,
                                                keyword: i.keyword,
                                                diffcity: i.diffcity
                                            },
                                            r = u(n);
                                        T(window).unbind("scroll"),
                                            p(r, n);
                                        var o = location.href.replace(/(\/d\/\d*)|(\/r\/\d*)/, "/r/" + a.id);
                                        history.pushState({
                                                url: r,
                                                params: n
                                            },
                                            "", o)
                                    }
                                })
                        }
                    });
                    if (a.metroNavs.length) {
                        var m = !1,
                            k = T('<div class="second-selector Hide" data-name="地铁"></div>').appendTo(r),
                            b = T('<div class="menu main"><div></div></div>').appendTo(k),
                            I = b.find("div");
                        a.metroNavs.forEach(function(a) {
                            if (0 == a.parentId) n = T('<div> <p class="item Fix">' + a.name + '</p> <div class="menu sub Hide"><div></div></div></div>').appendTo(I).find(".sub div");
                            else {
                                var e;
                                x("curMetroId") && C && a.parentId == x("curMetroParentId") ? (m = !0, n.parent().parent().find("p.item").addClass("on"), n.parent().parent().find(".sub").removeClass("Hide"), e = a.id == x("curMetroId") ? T('<a class="item Fix on" href="" >' + a.name + "</a> ").appendTo(n) : T('<a class="item Fix" href="" >' + a.name + "</a> ").appendTo(n)) : e = T('<a class="item Fix" href="" >' + a.name + "</a> ").appendTo(n),
                                    e.on("click",
                                        function(e) {
                                            e.preventDefault(),
                                                B = !1,
                                            h && (O = !0),
                                                T(".load-wrap").remove(),
                                                v(),
                                                c(),
                                                T(".loading_pic").show(),
                                                C = !0,
                                                D++,
                                                g = "&regionid=" + a.id;
                                            var n = {
                                                start: 0,
                                                categoryid: i.categoryid,
                                                sortid: i.sortid,
                                                pos: !1,
                                                regionid: a.id,
                                                nav1: a.name,
                                                nav2: i.nav2,
                                                nav3: i.nav3,
                                                keyword: i.keyword,
                                                diffcity: i.diffcity
                                            };
                                            x("curMetroId", a.id),
                                                x("curMetroParentId", a.parentId);
                                            var r = u(n);
                                            T(window).unbind("scroll"),
                                                p(r, n);
                                            var o = location.href.replace(/(\/d\/\d*)|(\/r\/\d*)/, "/r/" + a.id);
                                            history.pushState({
                                                    url: r,
                                                    params: n
                                                },
                                                "", o)
                                        })
                            }
                        }),
                        !m && D > 0 && !s && (T(".J_selector").first().find(".second-selector").last().find(".main .item").first().addClass("on"), T(".J_selector").first().find(".second-selector").last().find(".sub").first().removeClass("Hide"))
                    }
                    var n, q = T('<section class="selector J_selector Hide"> <div class="menu main"> <div></div></div></section>').appendTo(e).find(".main div"),
                        j = a.currentCategory ? a.currentCategory.id: 0,
                        F = !1;
                    "true" == P.issqt && 10 == P.sqttype ? a.categoryNavs.forEach(function(a) {
                        if (0 == a.parentId && 10 == a.id) n = T('<div> <p class="item Fix on"><span class="ca ca_' + a.id + '"></span>' + a.name + '</p> <div class="menu sub"><div></div></div></div>').appendTo(q).find(".sub div");
                        else if (10 == a.parentId) {
                            var e;
                            a.id != j || F ? e = T('<a class="item Fix" href="" >' + a.name + "</a> ").appendTo(n) : (e = T('<a class="item Fix on" href="" >' + a.name + "</a> ").appendTo(n), n.parent().parent().find("p.item").addClass("on"), n.parent().parent().find(".sub").removeClass("Hide"), F = !0),
                                e.on("click",
                                    function(e) {
                                        if (e.preventDefault(), B = !1, h && h.abort(), T(".load-wrap").remove(), v(), c(), T(".loading_pic").show(), w = "&categoryid=" + a.id, history.pushState) {
                                            var n = {
                                                    start: 0,
                                                    categoryid: a.id,
                                                    sortid: i.sortid,
                                                    pos: i.pos,
                                                    range: i.range,
                                                    regionid: i.regionid,
                                                    nav1: i.nav1,
                                                    nav2: a.name,
                                                    nav3: i.nav3,
                                                    keyword: i.keyword,
                                                    diffcity: i.diffcity
                                                },
                                                r = u(n);
                                            T(window).unbind("scroll"),
                                                p(r, n);
                                            var o = location.href.replace(/\/c\/\d*/, "/c/" + a.id);
                                            history.pushState({
                                                    url: r,
                                                    params: n
                                                },
                                                "", o)
                                        }
                                    })
                        }
                    }) : ("undefined" != typeof a.currentCategory ? (j = a.currentCategory.id, n = T('<div> <p class="item Fix"><span class="ca ca_0"></span>全部分类</p> <div class="menu sub Hide"><div></div></div></div>').appendTo(q)) : (j = 0, n = T('<div> <p class="item Fix on"><span class="ca ca_0"></span>全部分类</p> <div class="menu sub"><div></div></div></div>').appendTo(q)), n.on("click",
                        function(a) {
                            if (a.preventDefault(), B = !1, h && h.abort(), T(".load-wrap").remove(), v(), c(), T(".loading_pic").show(), w = "&categoryid=0", history.pushState) {
                                var e = {
                                        start: 0,
                                        categoryid: 0,
                                        sortid: i.sortid,
                                        pos: i.pos,
                                        range: i.range,
                                        regionid: i.regionid,
                                        nav1: i.nav1,
                                        nav2: "全部分类",
                                        nav3: i.nav3,
                                        keyword: i.keyword,
                                        diffcity: i.diffcity
                                    },
                                    n = u(e);
                                T(window).unbind("scroll"),
                                    p(n, e);
                                var r = location.href.replace(/\/c\/\d*/, "/c/0");
                                history.pushState({
                                        url: n,
                                        params: e
                                    },
                                    "", r)
                            }
                        }), a.categoryNavs.forEach(function(a) {
                        if (0 == a.parentId) n = T('<div> <p class="item Fix"><span class="ca ca_' + a.id + '"></span>' + a.name + '</p> <div class="menu sub Hide"><div></div></div></div>').appendTo(q).find(".sub div");
                        else {
                            var e;
                            a.id != j || F ? e = T('<a class="item Fix" href="" >' + a.name + "</a> ").appendTo(n) : (e = T('<a class="item Fix on" href="" >' + a.name + "</a> ").appendTo(n), n.parent().parent().find("p.item").addClass("on"), n.parent().parent().find(".sub").removeClass("Hide"), F = !0),
                                e.on("click",
                                    function(e) {
                                        if (e.preventDefault(), B = !1, h && h.abort(), T(".load-wrap").remove(), v(), c(), T(".loading_pic").show(), w = "&categoryid=" + a.id, history.pushState) {
                                            var n = {
                                                    start: 0,
                                                    categoryid: a.id,
                                                    sortid: i.sortid,
                                                    pos: i.pos,
                                                    range: i.range,
                                                    regionid: i.regionid,
                                                    nav1: i.nav1,
                                                    nav2: a.name,
                                                    nav3: i.nav3,
                                                    keyword: i.keyword,
                                                    diffcity: i.diffcity
                                                },
                                                r = u(n);
                                            T(window).unbind("scroll"),
                                                p(r, n);
                                            var o = location.href.replace(/\/c\/\d*/, "/c/" + a.id);
                                            history.pushState({
                                                    url: r,
                                                    params: n
                                                },
                                                "", o)
                                        }
                                    })
                        }
                    }));
                    var S, E = T('<section class="selector J_selector Hide"> <div class="menu main full"> <div></div></div></section>').appendTo(e).find(".main div");
                    S = "undefined" != typeof a.currentSort ? a.currentSort.id: 0,
                        a.sortNavs.forEach(function(e) {
                            var n;
                            n = e.id == S ? T('<div> <a class="item Fix on" href="" >' + a.currentSort.name + "</a></div>").appendTo(E) : T('<div> <a class="item Fix " href="" >' + e.name + "</a></div>").appendTo(E),
                                n.on("click",
                                    function(a) {
                                        if (a.preventDefault(), B = !1, h && (O = !0), T(".load-wrap").remove(), v(), c(), T(".loading_pic").show(), _ = "&sortid=" + e.id, history.pushState) {
                                            var n = {
                                                    start: 0,
                                                    categoryid: i.categoryid,
                                                    sortid: e.id,
                                                    pos: i.pos,
                                                    range: i.range,
                                                    regionid: i.regionid,
                                                    nav1: i.nav1,
                                                    nav2: i.nav2,
                                                    nav3: e.name,
                                                    keyword: i.keyword,
                                                    diffcity: i.diffcity
                                                },
                                                r = u(n);
                                            T(window).unbind("scroll"),
                                                p(r, n);
                                            var o = location.href.replace(/s_-?\d*/, "s_" + e.id);
                                            history.pushState({
                                                    url: r,
                                                    params: n
                                                },
                                                "", o)
                                        }
                                    })
                        })
                }
                function t(a) {
                    function i() {
                        T.ajax({
                            type: "GET",
                            url: "https://m.dianping.com/epay/thirdchannel/ajax/getBlackList?channelId=" + P.channelId,
                            dataType: "jsonp",
                            jsonp: "callback",
                            timeout: 1e4,
                            success: function(a) {
                                e(a.shopIdBlackList)
                            },
                            error: function() {
                                console.log("blacklist error"),
                                    e()
                            }
                        })
                    }
                    function e(i) {
                        var e = [];
                        if (!a.list.length || "当前搜索无结果,你可能喜欢以下结果" == a.keywordInfo) return ! T(".fruitless").length && l(),
                            void T(".loading_pic").hide();
                        a.list.forEach(function(a) {
                            if (!i || !i.some(function(i) {
                                    return i == a.id
                                })) {
                                var n = '<li> <a class="item Fix " href="/shop/' + a.id + "\" onclick=\"_hip.push(['mv', {module: 'shop_list_new', action: 'click',index:'" + a.id + '\'}]);"> <div class="pic"><img src="//www.dpfile.com/mod/app-m-dianping/1.4.2/css/img/picpre.png" lazy-src="' + a.defaultPic + '"></div> <div class="content"> <div class="name"> <h3 class="shopname"><span class="shop_name">' + a.name + "</span>",
                                    r = [];
                                "true" != P.issqt && (a.memberCardId && r.push('<span class="mark-card mark-tag"></span>'), a.hasTakeaway && r.push('<span class="mark-takeaway mark-tag"></span>'), a.hasPromo && r.push('<span class="mark-promo mark-tag"></span>'), a.hasDeals && r.push('<span class="mark-group mark-tag"></span>'), (5 == a.bookType || a.hotelBookable) && r.push('<span class="mark-booking mark-tag"></span>')),
                                a.hasMoPay && r.push('<span class="mark-hui mark-tag"></span>'),
                                    n += r.join(""),
                                    n += '</h3> </div> <div class="comment"> <span class="star star-' + a.shopPower + '"></span> <span>' + a.priceText + '</span> </div> <div class="intro Fix">',
                                a.regionName && (n += "<span>" + a.regionName + "</span>"),
                                a.categoryName && (n += '<span class="type">' + a.categoryName + "</span>"),
                                    n += ' <span class="dis">' + a.shopPositionInfo.text + "</span> </div>";
                                var o = "";
                                if (a.shopDealInfos && a.shopDealInfos.length) {
                                    var t = ['<div class="new-coupon">'];
                                    a.shopDealInfos.forEach(function(a) {
                                        var i = [0, 1, 2],
                                            e = i.some(function(i) {
                                                return a.dealType == i
                                            }),
                                            r = {
                                                0 : "hui",
                                                1 : "tuan",
                                                2 : "quan"
                                            };
                                        e && ("true" == P.issqt && 10 == P.sqttype ? 0 == a.dealType && t.push('<div class="coupon"> <span class="coupon-tag ' + r[a.dealType] + '"></span>' + a.dealTitle + " </div>") : (t.push('<div class="coupon"> <span class="coupon-tag ' + r[a.dealType] + '"></span>' + a.dealTitle + " </div>"), 1 == a.dealType && (n = n.replace('<span class="mark-group mark-tag"></span>', ""))), 0 == a.dealType && (n = n.replace('<span class="mark-hui mark-tag"></span>', "")))
                                    }),
                                        t.push("</div>"),
                                        o = t.join("")
                                }
                                o = o.replace('<div class="new-coupon"></div>', "");
                                var d = "</div></a></li>",
                                    s = n + o + d;
                                e.push(s)
                            }
                        });
                        var n = T(e.join(""));
                        f.append(n),
                            T(".loading_pic").hide();
                        try {
                            f.append("<script>_hip.push(['mv', {module: '5_shoplist_exposure', action: 'browse'}])</script>")
                        } catch(r) {}
                        if (I.LazyLoad(T("img")), d(n), B) {
                            var o = +new Date - G_rtop;
                            k.doReport(function(a, i) {
                                    a.push("21-" + o)
                                },
                                !0)
                        }
                    }
                    "true" == P.issqt && 10 == P.sqttype && "true" == P.shopFilterEnabled ? i() : e()
                }
                function d(a) {
                    var i = a.find(".name");
                    i.each(function() {
                        var a = 20 * T(this).find(".mark-tag").length,
                            i = T(this).width() - a;
                        T(this).find(".shop_name").css("max-width", i)
                    })
                }
                function s() {
                    T(".list-nav ").remove()
                }
                function c() {
                    T(".search-list").remove(),
                        T(".overlay").last().remove(),
                        T(".list-nav .J_selector").addClass("Hide")
                }
                function p(a, i) {
                    h = T.ajax({
                        type: "GET",
                        url: a,
                        dataType: "jsonp",
                        jsonp: "callback",
                        timeout: 1e4,
                        success: function(a) {
                            if (O) return void(O = !1);
                            if (L) {
                                L = !1;
                                try {
                                    var e = +new Date - G_rtop;
                                    k.doReport(function(a, i) {
                                            a.push("20-" + e)
                                        },
                                        !0),
                                        _hip.push(["_setPVInitData", {
                                            p_render: +new Date - G_rtop,
                                            module: "0_mshopsearch_queryid",
                                            action: "browse",
                                            query_id: a.queryId
                                        }]),
                                        _hip.push(["pv"])
                                } catch(n) {}
                            } else try {
                                _hip.push(["mv", {
                                    module: "0_mshopsearch_queryid",
                                    action: "browse",
                                    query_id: a.queryId
                                }])
                            } catch(n) {}
                            N = a.queryId,
                                h = null,
                                j = a.isEnd,
                                F = a.nextStartIndex,
                                function(a) {
                                    var e, n, r;
                                    "undefined" != typeof i.range && 0 != i.range ? E && H ? (a.rangeNavs.forEach(function(a) {
                                        return a.id == i.range ? void(e = a.name.indexOf("附近") > -1 ? "附近": a.name) : void 0
                                    }), a.currentRange && (e = a.currentRange.name.indexOf("附近") > -1 ? "附近": a.currentRange.name)) : e = "全部商区": "undefined" != typeof i.regionid && (a.regionNavs.forEach(function(a) {
                                        return a.id == i.regionid ? void(e = a.name) : void 0
                                    }), a.currentRegion && (e = a.currentRegion.name), a.metroNavs.forEach(function(a) {
                                        return a.id == i.regionid ? void(e = a.name) : void 0
                                    }), void 0 == e && (e = x("nav_1"))),
                                    "undefined" != typeof i.categoryid && (a.categoryNavs.forEach(function(a) {
                                        return a.id == i.categoryid ? void(n = a.name) : void 0
                                    }), 0 == i.categoryid && (n = "全部分类"), void 0 == n && (n = x("nav_2"))),
                                    "undefined" != typeof i.sortid && (a.sortNavs.forEach(function(a) {
                                        return a.id == i.sortid ? void(r = a.name) : void 0
                                    }), a.currentSort.id == i.sortid && (r = a.currentSort.name), void 0 == r && (r = x("nav_3"))),
                                        i.nav1 = e || "全部商区",
                                        i.nav2 = n || "全部美食",
                                        i.nav3 = r || "智能排序"
                                } (a),
                                s(),
                                o(a, i);
                            new b(T(".list-nav"));
                            T(".search-list").length || (f = T('<ul class="search-list J_list"> </ul>'), T("nav").after(f)),
                                f.after('<div class="load-wrap"><div class="loading-img"></div><span>正在加载...</span></div>'),
                                t(a);
                            var r = {
                                start: F,
                                categoryid: i.categoryid,
                                sortid: i.sortid,
                                pos: i.pos,
                                range: i.range,
                                regionid: i.regionid,
                                keyword: i.keyword,
                                diffcity: i.diffcity
                            };
                            T(window).scroll(function() {
                                if (!j && T(window).scrollTop() + T(window).height() + 50 >= T("body").height() && !S) {
                                    if (S) return;
                                    B = !1,
                                        S = !0;
                                    var i = u(r);
                                    T.ajax({
                                        url: i,
                                        dataType: "jsonp",
                                        jsonp: "callback",
                                        timeout: 1e4,
                                        beforeSend: function() {
                                            T(".load-wrap").css("display", "block")
                                        },
                                        complete: function() {
                                            T(".load-wrap").css("display", "none")
                                        },
                                        success: function(i) {
                                            try {
                                                _hip.push(["mv", {
                                                    module: "8_shoplist_search_more",
                                                    action: "click",
                                                    query_id: a.queryId,
                                                    note: N
                                                }])
                                            } catch(e) {}
                                            N = a.queryId,
                                                S = !1,
                                                j = i.isEnd,
                                                r.start = i.nextStartIndex,
                                                t(i)
                                        },
                                        error: function() {}
                                    })
                                }
                            })
                        },
                        error: function() {}
                    })
                }
                function l() {
                    T("nav").after('<div class="fruitless"> <span class="icon-fruit"></span> <p>没有找到合适的商户</p> <p>看看输入的文字是否有误</p> </div>')
                }
                function v() {
                    T(".J_trigger").each(function(a) {
                        x("nav_" + (a + 1), T(this).text())
                    })
                }
                function u(a) {
                    var i = "http://m.api.dianping.com/searchshop.json?start=" + a.start + g + w + _ + "&locatecityid=" + m + "&cityid=" + m;
                    return E && H && (i += "&mylat=" + E + "&mylng=" + H),
                    a.pos && E && H && (i += "&lat=" + E + "&lng=" + H),
                    a.keyword && (i += "&keyword=" + encodeURIComponent(a.keyword.substr(0, 100))),
                    "true" == P.issqt && (i += "&filters=1-1"),
                        i
                }
                var f, m, h, y, g, w, _, k, b = a("list-nav"),
                    T = a("zepto"),
                    x = a("cookie"),
                    I = a("mobile-common"),
                    q = a("huatuo"),
                    j = !1,
                    F = 1,
                    S = !1,
                    D = 0,
                    E = x("locallat"),
                    H = x("locallng"),
                    C = !1,
                    J = !1,
                    N = "",
                    L = !0,
                    R = -1 != location.hostname.indexOf("51ping") ? ".51ping.com": ".dianping.com",
                    z = a("base-op-url"),
                    P = {},
                    M = a("whereami"),
                    G = !1,
                    O = !1,
                    B = !0;
                i.init = function(i) {
                    T(function() {
                        function e(a) {
                            d.search(a) ? (P[a] = d.search(a), x(a, P[a], {
                                domain: R,
                                path: "/"
                            })) : P[a] = x(a)
                        }
                        function n() {
                            x("cityid") && (G = !0, r(i.range, !1, J)),
                                M.config({
                                    city: !0
                                }),
                                M(function(a) {
                                        if (a.city.cityid != m) if (confirm("您目前定位是在:" + a.city.cityname + ",是否切换?")) if (m = a.city.cityid, h) O = !0,
                                            r(i.range, !1, J);
                                        else {
                                            T(".load-wrap").remove(),
                                                v(),
                                                c(),
                                                T(".loading_pic").show();
                                            var e = {
                                                    start: 0,
                                                    categoryid: i.categoryid,
                                                    sortid: i.sortid,
                                                    pos: J,
                                                    range: i.range,
                                                    regionid: i.regionid,
                                                    keyword: i.keyword,
                                                    diffcity: !1
                                                },
                                                n = u(e);
                                            T(window).unbind("scroll"),
                                                p(n, e)
                                        } else x("noswitchcity", "1", {
                                            expires: .25 / 24,
                                            path: "/",
                                            domain: R
                                        });
                                        else ! G && r(i.range, !1, J)
                                    },
                                    function() { ! G && r(0, !0, !1)
                                    })
                        }
                        function r(a, e, n) {
                            var r = {
                                    start: 0,
                                    categoryid: i.categoryid,
                                    sortid: i.sortid,
                                    pos: n,
                                    range: a,
                                    regionid: i.regionid,
                                    keyword: i.keyword,
                                    diffcity: e
                                },
                                o = u(r);
                            p(o, r),
                                history.replaceState({
                                        url: o,
                                        params: r
                                    },
                                    "", location.href)
                        }
                        m = x("cityid") || i.cityId;
                        var o = !0,
                            t = 203;
                        k = new q(t, o),
                            x.remove("curMetroId"),
                            x.remove("curMetroParentId"),
                            x.remove("nav_1"),
                            x.remove("nav_2"),
                            x.remove("nav_3");
                        var d = new z(location.href);
                        if (e("issqt"), e("sqttype"), e("channelId"), e("shopFilterEnabled"), T("body").prepend('<div class="loading_pic"></div>'), window.addEventListener("popstate",
                                function(a) {
                                    a.state && (h && (O = !0), T(".load-wrap").remove(), v(), c(), T(".loading_pic").show(), T(window).unbind("scroll"), p(a.state.url, a.state.params))
                                }),
                                function(a) {
                                    if (/\/search$/.test(location.pathname)) {
                                        var i = /\d+/.test(a.regionid);
                                        i || (a.regionid = "0"),
                                            g = "&regionid=" + a.regionid
                                    } else if (J = /\/d\/\d+/.test(location.pathname)) {
                                        var e = [ - 1, 500, 1e3, 2e3, 5e3].some(function(i) {
                                            return a.range == i
                                        });
                                        e || (a.range = -1),
                                            g = "&range=" + a.range
                                    } else {
                                        var i = /\d+/.test(a.regionid);
                                        i || (a.regionid = "0"),
                                            g = "&regionid=" + a.regionid
                                    }
                                    /\d+/.test(a.categoryid) || (a.categoryid = "0"),
                                    "true" == P.issqt && 10 == P.sqttype && (a.categoryid = "10"),
                                        w = "&categoryid=" + a.categoryid,
                                    /\d+/.test(a.sortid) || (a.sortid = "0"),
                                        _ = "&sortid=" + a.sortid
                                } (i), y = T(T(".search_keyword").length ? ".keyword_frame": T("header").length ? "header": "#backup-insert"), n(), !i.hideToTop) {
                            var s = T('<a onclick="window.scrollTo(0,0)" class="top-box Hide"><div class="arrow-ent"></div></a>').appendTo("body");
                            T(window).on("scroll",
                                function() {
                                    T(window).scrollTop() > 0 ? s.removeClass("Hide") : s.addClass("Hide")
                                })
                        }
                        i.lazyLoad && I.LazyLoad(T("img")),
                        i.isDynamicLoad && i.dynamicLoadUrl && a("./js/dynamic_load")(i.dynamicLoadUrl, i.weixinGeoData)
                    })
                }
            },
            {
                asyncDeps: u,
                main: !0,
                map: a({
                        "./js/dynamic_load": c
                    },
                    m)
            }),
            define(c, [n, o, e, p],
                function(a, i, e, n, r) {
                    var o = a("zepto"),
                        t = a("mobile-common"),
                        d = a("list-nav");
                    e.exports = function(i, e) {
                        function n() {
                            o.ajax({
                                url: i,
                                dataType: "html",
                                success: function(i) {
                                    o(".J_loading").addClass("Hide");
                                    var e = o(i).insertAfter(r);
                                    t.LazyLoad(e.find("img")),
                                        a("./loadmore")(o(".J_list")),
                                        new d(o(".list-nav"))
                                }
                            })
                        }
                        var r = o("header");
                        t.Geo(n, n, e)
                    }
                },
                {
                    asyncDeps: u,
                    map: a({
                            "./loadmore": p
                        },
                        m)
                }),
            define(p, [n, l, o],
                function(a, i, e, n, r) {
                    var o = a("zepto"),
                        t = a("wepp-module-toast"),
                        d = a("mobile-common"),
                        s = d.LazyLoad;
                    e.exports = function(a, i) {
                        var e, n = !1,
                            r = function() {
                                n = !1,
                                    e.text("查看更多")
                            },
                            d = a.find(".J_query_id").val();
                        a.on("click", ".J_view_more",
                            function() {
                                n || (e = o(this), n = !0, e.text("正在加载..."), o.ajax({
                                    url: i || location.href,
                                    data: {
                                        reqType: "ajax",
                                        page: e.attr("data-page"),
                                        keyword: e.attr("data-keyword")
                                    },
                                    dataType: "html",
                                    success: function(i) {
                                        r(),
                                            o(".J_view_more").parent().remove();
                                        var e = o(i).appendTo(a);
                                        s(e.find("img"));
                                        var n = e.eq(0).val();
                                        if (n && d) {
                                            try {
                                                _hip.push(["mv", {
                                                    module: "8_shoplist_search_more",
                                                    action: "click",
                                                    query_id: n,
                                                    note: d
                                                }])
                                            } catch(t) {}
                                            d = n
                                        }
                                    },
                                    error: function() {
                                        t("网络出错啦，请稍后再试"),
                                            r()
                                    }
                                }))
                            });
                        var c = a.find(".link-btn-wrap .new-btn");
                        o(window).scroll(function() {
                            if (0 != c.length && o(window).scrollTop() + o(window).height() + parseInt(c.attr("data-scroll")) >= o("body").height() && !n) {
                                if (n) return;
                                e = o(".J_view_more"),
                                    o.ajax({
                                        url: i || location.href,
                                        data: {
                                            reqType: "ajax",
                                            page: c.attr("data-page"),
                                            keyword: e.attr("data-keyword")
                                        },
                                        dataType: "html",
                                        success: function(i) {
                                            r(),
                                                o(".J_view_more").parent().remove();
                                            var e = o(i).appendTo(a);
                                            c = e.find(".link-btn-wrap .new-btn"),
                                                s(e.find("img"));
                                            var n = e.eq(0).val();
                                            if (n && d) {
                                                try {
                                                    _hip.push(["mv", {
                                                        module: "8_shoplist_search_more",
                                                        action: "click",
                                                        query_id: n,
                                                        note: d
                                                    }])
                                                } catch(t) {}
                                                d = n
                                            }
                                        },
                                        error: function() {
                                            t("网络出错啦，请稍后再试"),
                                                r()
                                        }
                                    })
                            }
                        }),
                            a.on("click", ".J_append_more",
                                function() {
                                    o(this).parent().find(".J_item").removeClass("Hide"),
                                        s(o(this).parent().find(".J_item").find("img")),
                                        o(this).remove()
                                })
                    }
                },
                {
                    asyncDeps: u,
                    map: m
                })
    } ();