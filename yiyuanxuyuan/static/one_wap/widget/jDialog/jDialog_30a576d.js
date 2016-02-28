!
    function(t, e) {
        function i(t) {
            var e = t,
                i = e.getWrapper(),
                n = e.options;
            return i.appendChild(e.getHeader()),
                i.appendChild(e.getContainer()),
                i.appendChild(e.getFooter()),
            "" === n.title && e.hideHeader(),
                e.title(n.title),
                n.url ? e.iframe(n.url) : e.content(n.content),
                e.addButton("取消", "destory",
                    function() {
                        e.remove()
                    }),
            n.modal && e.showModal(),
            n.autoHide && e.autoHide(n.autoHide),
            n.callBack && e.addButton("确定", "apply", n.callBack),
                i.addEventListener("click", o.bind(e), !1),
                i.addEventListener("touchstart", r, !1),
                i.addEventListener("touchend", r, !1),
                l.body.appendChild(i),
                e.verticalInViewPort(n.fixed).addClass("dialog-zoom-in"),
                e
        }
        function n(t, e) {
            var i = l.createElement(t);
            return A.extend(i, e),
                i
        }
        function o(t) {
            var e = t.target,
                i = e.getAttribute("data-dialog-action");
            i && A.event.fire(i, e)
        }
        function r(t) {
            var e = t.target,
                i = e.getAttribute("data-dialog-action");
            i && e.classList.toggle("active")
        }
        function s(t) {
            var e = t,
                i = n("div");
            return i.style.cssText = ";background:rgba(0,0,0,0.3);width:100%;position:absolute;left:0;top:0;height:" + Math.max(l.documentElement.scrollHeight, l.body.scrollHeight) + "px;z-index:" + (e.currentDOMIndex - 1),
                i.onclick = function() {
                    e.options.preventHide || A.event.fire("destory")
                },
                l.body.appendChild(i)
        }
        function a(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }
        function h(t) {
            return null === t || void 0 === t ? !1 : t.constructor == {}.constructor
        }
        function d(t) {
            var e = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return e.test(t)
        }
        var u = t,
            l = e,
            c = "1.0.0",
            A = function(t, e) {
                return new A.fn.init(t, e)
            };
        A.fn = A.prototype = {
            constructor: A,
            init: function(t, e) {
                if (this.options = {
                        title: "提示",
                        modal: !0,
                        content: "",
                        autoHide: 0,
                        prefix: "",
                        fixed: !0,
                        preventHide: !1,
                        callBack: null,
                        url: null
                    },
                        this.buttons = [], A.event.root = this, A.currentDialog && A.currentDialog.remove(), A.currentDialog = this, h(t)) A.extend(this.options, t);
                else {
                    if (!/string|number|boolean/gi.test(typeof t)) return this;
                    this.options.content = t,
                    a(e) && (this.options.callBack = e)
                }
                return i(this),
                    this
            }
        },
            A.extend = A.fn.extend = function() {
                var t, e, i = arguments[0] || {},
                    n = arguments[1] || {};
                1 === arguments.length && (i = this, n = arguments[0]);
                for (t in n) e = n[t],
                void 0 !== e && (i[t] = e);
                return i
            },
            A.fn.init.prototype = A.fn,
            A.extend({
                expando: "jDialog" + (c + Math.random()).replace(/\D/g, "")
            }),
            A.event = {
                actions: {},
                add: function(t, e) {
                    return a(e) && (this.actions[t] = e),
                        this
                },
                remove: function(t) {
                    return this.has(t) ? delete this.actions[t] : (console.warn(t + "不存在"), !1)
                },
                has: function(t) {
                    return "string" == typeof t && this.actions[t] ? !0 : !1
                },
                once: function(t) {
                    return this.has(t) && this.fire(t).remove(t),
                        this
                },
                fire: function(t, e) {
                    return this.has(t) && this.actions[t].call(A.currentDialog || A(), e),
                        this
                }
            },
            A.fn.extend({
                verticalInViewPort: function(t) {
                    var e = l.documentElement,
                        i = e.clientHeight,
                        n = this.height();
                    if (t) n > i && (n = .75 * i, this.getContainer().style.height = n - (this.height(this.getHeader()) + this.height(this.getFooter())) + "px"),
                        this.height(n).toggleLockBody(!0).extend(this.getWrapper().style, {
                            position: "fixed",
                            marginTop: -n / 2 + "px",
                            top: "50%"
                        });
                    else {
                        var o = Math.max(l.body.scrollTop, e.scrollTop),
                            r = Math.max(382 * (i - n) / 1e3 + o, o);
                        this.top(r).height("auto").toggleLockBody(!1).getContainer().style.height = "auto"
                    }
                    return this
                },
                toggleLockBody: function(t) {
                    var e = this.getHeader(),
                        i = this.getFooter(),
                        n = this.getModal(),
                        o = "ontouchmove";
                    return e[o] = i[o] = n[o] = t ?
                        function() {
                            return ! 1
                        }: null,
                        this
                },
                getWrapper: function() {
                    if (!this.wrapper) {
                        var t = this.options.prefix;
                        this.wrapper = n("div", {
                            className: t + "dialog"
                        }),
                            this.wrapper.style.zIndex = this.currentDOMIndex = 614
                    }
                    return this.wrapper
                },
                getHeader: function() {
                    if (!this.header) {
                        var t = this.options.prefix;
                        this.header = n("div", {
                            className: t + "dialog-header"
                        })
                    }
                    return this.header
                },
                hideHeader: function() {
                    var t = this.getHeader(),
                        e = this.height(t);
                    return this.height(this.height() - e),
                        t.style.display = "none",
                        this
                },
                getContainer: function() {
                    if (!this.container) {
                        var t = this.options.prefix;
                        this.container = n("div", {
                            className: t + "dialog-body"
                        })
                    }
                    return this.container
                },
                getFooter: function() {
                    if (!this.footer) {
                        var t = this.options.prefix;
                        this.footer = n("div", {
                            className: t + "dialog-footer"
                        })
                    }
                    return this.footer
                },
                hideFooter: function() {
                    var t = this.getFooter(),
                        e = this.height(t);
                    return this.height(this.height() - e),
                        t.style.display = "none",
                        this
                },
                addButton: function(t, e, i) {
                    var o = ("jDialog" + Math.random()).replace(/\D/g, ""),
                        r = "确定";
                    if (a(t)) return this.addButton(r, e || o, t);
                    if (a(e)) return this.addButton(t, o, e);
                    var s = this.options.prefix,
                        h = n("a", {
                            href: "javascript:;",
                            className: s + "dialog-btn",
                            innerHTML: t || r
                        });
                    e ? A.event.add(e, i) : e = "destory",
                        h.setAttribute("data-dialog-action", e);
                    var d = this.getFooter();
                    return this.buttons.length ? (this.addClass("dialog-btn-primary", h), d.insertBefore(h, d.childNodes.item(0))) : d.appendChild(h),
                        this.buttons.push(h),
                        this
                },
                delButton: function(t) {
                    var e, i = this.getButton(t);
                    if (i) {
                        e = i.getAttribute("data-dialog-action"),
                        "destory" != e && A.event.remove(e),
                            this.getFooter().removeChild(i);
                        var n = this.buttons.indexOf(i);
                        this.buttons.splice(n, 1)
                    }
                    return this
                },
                getButton: function(t) {
                    var e = this.buttons.slice().reverse();
                    return e[t] ? e[t] : null
                },
                addClass: function(t, e) {
                    return e = e || this.getWrapper(),
                    1 === e.nodeType && "string" == typeof t && e.classList.add(t),
                        this
                },
                removeClass: function(t, e) {
                    return e = e || this.getWrapper(),
                    1 === e.nodeType && "string" == typeof t && e.classList.remove(t),
                        this
                },
                autoHide: function(t) {
                    return A.currentDialog ? 0 == t ? this.remove() : void 0 === t ? this.autoHide(this.options.autoHide) : (this.autoHideTimer && clearTimeout(this.autoHideTimer), this.autoHideTimer = setTimeout(function() {
                        this.remove(),
                            clearTimeout(this.autoHideTimer),
                            this.autoHideTimer = null
                    }.bind(this), 1e3 * t), this) : this
                },
                remove: function() {
                    return this.toggleLockBody(!1),
                    this.wrapper && (this.wrapper.removeEventListener("click", o, !1), this.wrapper.addEventListener("touchstart", r, !1), this.wrapper.addEventListener("touchend", r, !1), l.body.removeChild(this.wrapper)),
                    this.modal && (this.modal.onclick = null, l.body.removeChild(this.modal)),
                    this.autoHideTimer && clearTimeout(this.autoHideTimer),
                        A.currentDialog = this.buttons = this.container = this.footer = this.header = this.options = this.wrapper = this.modal = null,
                        this
                },
                getModal: function() {
                    return this.modal || (this.modal = s(this)),
                        this.modal
                },
                hideModal: function() {
                    return this.getModal().style.display = "none",
                        this
                },
                showModal: function() {
                    return this.getModal().style.display = "",
                        this
                },
                iframe: function(t) {
                    var e = this,
                        i = t || e.options.url,
                        o = null;
                    if (h(t) && (i = t.url, o = t.callBack), !d(i)) return e.content(i + "不是一个有效的地址");
                    var r = e.getContainer(),
                        s = l.documentElement.clientHeight,
                        a = n("div");
                    a.style.cssText = "height:5px;width:10%;opacity:1;margin-bottom:1em;background:#1abc9c;-webkit-transition:width ease-in 2s",
                        r.appendChild(a);
                    var u = n("iframe", {
                        width: "100%",
                        height: s
                    });
                    return u.frameborder = 0,
                        u.onload = function() {
                            a.style.width = "100%",
                            o && o.call(e, !0),
                                u.onload = a = null
                        },
                        u.onerror = function() {
                            e.content("加载" + i + "时发生错误"),
                                u.onload = a = null
                        },
                        r.appendChild(u),
                        u.src = i,
                        e
                }
            });
        var p = function(t) {
            return /em|px|rem|pt|%|auto/gi.test(t) || (t += "px"),
                t
        };
        A.fn.extend({
            title: function(t) {
                return "undefined" == typeof t ? this.options.title: (this.getHeader().innerHTML = this.options.title = t, this)
            },
            content: function(t) {
                return void 0 === t ? this.options.content: (this.getContainer().innerHTML = this.options.content = t, this)
            },
            height: function(t) {
                return void 0 === t ? this.height(this.getWrapper()) : 1 === t.nodeType ? t.offsetHeight: (this.wrapper.style.height = p(t), this)
            },
            width: function(t) {
                return void 0 === t ? this.width(this.getWrapper()) : 1 === t.nodeType ? t.offsetWidth: (A.extend(this.wrapper.style, {
                    width: p(t),
                    marginLeft: p( - (parseFloat(t) / 2))
                }), this)
            },
            index: function(t) {
                return void 0 === t ? this.currentDOMIndex: (this.currentDOMIndex = t, this.wrapper.style.zIndex = this.currentDOMIndex, this.getModal().style.zIndex = this.currentDOMIndex - 1, this)
            },
            top: function(t) {
                return void 0 === t ? u.getComputedStyle(this.getWrapper()).top: (A.extend(this.wrapper.style, {
                    top: p(t),
                    marginTop: ""
                }), this)
            },
            fixed: function(t) {
                var e = !0;
                return t && "undefined" == typeof t || (e = !1, this.getWrapper().style.position = "absolute"),
                    this.verticalInViewPort(e)
            },
            absolute: function() {
                return this.fixed(!1)
            },
            preventHide: function() {
                return this.options.preventHide = !0,
                    this
            }
        }),
            A.extend({
                alert: function(t) {
                    return A(t)
                },
                toast: function(t, e) {
                    var i = A(t).addClass("dialog-toast"),
                        n = i.getContainer(),
                        o = i.height(n);
                    return i.getContainer().style.textAlign = "center",
                        i.hideFooter().hideHeader().hideModal().height(o).autoHide(e || 3),
                        i
                },
                error: function(t, e) {
                    return A(t, e).addClass("dialog-error")
                }
            }),
            "function" == typeof define && define.amd ? define("jdialog", [],
                function() {
                    return A
                }) : u.jDialog = A
    } (window, window.document),
    jDialog.extend({
        loading: function(t) {
            t = t || "努力加载中...";
            var e = "data:image/gif;base64,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",
                i = '<div style="text-align: center;margin:10px 0 20px;"><img src="' + e + '" height="50" /><div style="font-size: 18px;margin-top: 10px;">' + t + "</div>";
            return jDialog(i).hideFooter().hideHeader().addClass("dialog-toast").preventHide()
        },
        alert: function(t, e) {
            return jDialog(t).addButton("确定",
                function() {
                    e ? e.call(this) : this.remove()
                }).delButton(1)
        }
    });