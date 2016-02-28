!
    function(t) {
        function n(n) {
            var e = n.split("|"),
                r = e.length;
            if ("[object Array]" != Object.prototype.toString.call(e) || 2 >= r) return ! 1;
            var o = e[0].trim(),
                a = r > 1 ? e[1].trim() : "",
                i = e[2].trim(),
                u = "",
                c = "";
            t._biq = t._biq || [],
                t._biq.push([["_traceEvent"], ["_zone", "" + o], ["_index", "" + a], ["_label", "" + i], ["_action", "click"], ["_params", "" + u], ["_value", "" + c]]),
            "undefined" != typeof t._bie && t._bie.run()
        }
        function e() {
            var t = this.getAttribute("bi");
            n(t)
        }
        t._biq = t._biq || [];
        var r = "1234567890987654321",
            o = function(n, e) {
                var r = ["__biid", "__biuid", "_page", "_loginlv", "_from", "_icode", "_params", "_pid", "_device"],
                    o = [];
                o._traceEvent = y,
                    o._tracePage = m;
                var a = [],
                    i = [];
                "undefined" == typeof e && (e = "static/one_wap/images/__onebi.gif"),
                ("undefined" == typeof n || null === n) && (n = "");
                var u = function(t) {
                        return "string" == typeof t && t
                    },
                    c = function(t) {
                        return "undefined" != typeof t && "[object Array]" == Object.prototype.toString.call(t)
                    },
                    f = function(t) {
                        return "undefined" != typeof t && "[object Array]" == Object.prototype.toString.call(t) && t.length > 0
                    },
                    _ = function(t) {
                        for (var n = a.length - 1; n >= 0; --n) if (t === a[n]) return n;
                        return - 1
                    },
                    l = function(t) {
                        for (var n = r.length - 1; n >= 0; --n) if (t === r[n]) return n;
                        return - 1
                    },
                    g = function(t, n) {
                        if (u(t) && u(n)) {
                            var e = _(t);
                            e >= 0 ? i[e] = n: (a.push(t), i.push(n))
                        }
                    };
                g("__biid", n);
                var h = function() {
                        var t = parseInt(1e9 * Math.random()).toString(36),
                            n = (new Date).getTime().toString(36),
                            e = parseInt(1e9 * Math.random()).toString(36),
                            r = t + n + e;
                        document.cookie = "__biuid=" + r + "; max-age=63072000; path=/; domain=1.baidu.com"
                    },
                    p = function() {
                        var t = "",
                            n = document.cookie,
                            e = n.indexOf("__biuid=");
                        if ( - 1 != e) {
                            var r = e + 8,
                                o = n.indexOf(";", r); - 1 == o && (o = n.length),
                                t = n.substring(r, o)
                        }
                        return t
                    },
                    d = function(t) {
                        for (var n = 0; n < a.length; ++n) if (a[n] === t) return i[n];
                        return null
                    },
                    s = function() {
                        for (var t = 0; t < arguments.length; ++t) arguments[t].constructor === Array && arguments[t].length >= 2 && g(arguments[t][0], arguments[t][1])
                    },
                    v = function() {
                        for (var t = [], n = 0; n < a.length; ++n) t.push(encodeURIComponent(a[n]) + "=" + encodeURIComponent(i[n]));
                        return e + "?" + t.join("&")
                    },
                    b = function() {
                        var n = "";
                        try {
                            n = t.top.document.referrer
                        } catch(e) {
                            if (t.parent) try {
                                n = t.parent.document.referrer
                            } catch(r) {
                                n = ""
                            }
                        }
                        return "" === n && (n = document.referrer),
                            n
                    },
                    m = function() {
                        g("__type", "page"),
                            q()
                    },
                    y = function() {
                        g("__type", "event"),
                            q()
                    },
                    q = function() {
                        g("__r", "" + Math.random()),
                            g("__referer", b()),
                            g("__path", "string" == typeof location.pathname ? location.pathname: ""),
                            g("__search", "string" == typeof location.search ? location.search: ""),
                            g("__hash", "string" == typeof location.hash ? location.hash: ""),
                            g("__host", "string" == typeof location.hostname ? location.hostname: ""),
                        "" === p() && h();
                        var t = p();
                        g("__biuid", t);
                        var n = v();
                        S(n)
                    },
                    S = function(n) {
                        var e = new Image,
                            r = "imgtag_for_bilog_" + Math.floor(2147483648 * Math.random()).toString(36);
                        t[r] = e,
                            e.onload = e.onerror = e.onabort = function() {
                                e.onload = e.onerror = e.onabort = null,
                                    e = t[r] = null
                            },
                            e.src = n
                    },
                    j = function() {
                        try {
                            for (var t = [], n = [], e = a.length - 1; e >= 0; --e) {
                                var r = l(a[e]);
                                r >= 0 && (t.push(a[e]), n.push(i[e]))
                            }
                            a = t,
                                i = n,
                                t = null,
                                n = null
                        } catch(o) {
                            return ! 1
                        }
                        return ! 0
                    },
                    A = function(t) {
                        return f(t) && f(t[0]) ? t[0][0] : null
                    },
                    E = function(t) {
                        c(t) && 2 == t.length && g(t[0], t[1])
                    },
                    w = function(t, n) {
                        for (var e = 0; e < t.length; ++e) {
                            var r = t[e];
                            if (n === A(r)) {
                                for (var o = 1; o < r.length; ++o) E(r[o]);
                                "_tracePage" === n ? m() : "_traceEvent" === n && y(),
                                    j()
                            }
                        }
                    },
                    I = function() {
                        var n = t._biq;
                        return t._biq = [],
                            f(n) ? (w(n, "_tracePage"), w(n, "_traceEvent"), !0) : !1
                    };
                return {
                    get: d,
                    set: g,
                    setValues: s,
                    tracePage: m,
                    traceEvent: y,
                    run: I
                }
            };
        Array.prototype.slice.call(document.querySelectorAll("[bi]")).forEach(function(t) {
            t.addEventListener("click", e, !1)
        }),
            t._bie = new o(r),
            t._bie.dataRouter = n,
            t._bie.run()
    } (window);