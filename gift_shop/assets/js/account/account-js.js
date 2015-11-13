document.addEventListener("DOMContentLoaded", function () {
    function e(e, n) {
        if (!g)return g = !0, void 0;
        var t = document.documentElement.clientHeight, o = document.body.scrollTop || document.documentElement.scrollTop, l = document.body.scrollHeight, i = getStyle(n, "height");
        t + o >= l && (g = !1, n.style.display = "block", window.scrollTo(0, l + i), e())
    }

    function fetchUserScoreRecord() {
        ajax({
            method: "GET",
            url: "/imall/integral_flow/integralRecord?token=" + tokenHide + "&logid=" + u,
            succFunc: function (e) {
                var e = txtToJson(e);
                if (0 == e.errno) {
                    var n = dom.createElement("section");
                    n.innerHTML = template("count_list", e), listElement.insertBefore(n, null), u = e.nextlogid, 0 == e.nextlogid ? (g = !1, loadingIcon.style.display = "none") : g = !0
                } else loadingIcon.style.display = "none"
            },
            failFunc: function () {
                loadingIcon.style.display = "none"
            }
        })
    }

    var dom = document, listElement = dom.getElementById("list"), recordButton = dom.getElementById("record"), shopButton = dom.getElementById("shop"), ruleLikn = dom.getElementById("rule"), loadingIcon = dom.getElementById("foo_loading"), tokenHide = dom.getElementById("token").value, longtitude = dom.getElementById("lat").value, longitude = dom.getElementById("lng").value, u = 0, g = !0, m = new dd.dialog.Fn('<div class="loading-logo"></div>');
    m.hide(), window.addEventListener("popstate", function () {
        m.hide()
    }, !1), shareFn(), fetchUserScoreRecord(), window.onscroll = window.onresize = function () {
        g && e(fetchUserScoreRecord, loadingIcon)
    }, shopButton.addEventListener("click", function () {
        m.show(), location.href = "/imall/index?token=" + tokenHide + "&lng=" + longitude + "&lat=" + longtitude + "&datatype=" + getQuerySting().datatype + "&version=" + getQuerySting().version + "&source=" + getQuerySting().source
    }, !1), recordButton.addEventListener("click", function () {
        m.show(), location.href = "/imall/change_log/index?token=" + tokenHide + "&lng=" + longitude + "&lat=" + longtitude
    }, !1), touch(ruleLikn, function () {
        m.show(), location.href = "/imall/rule?token=" + tokenHide
    }, !1)
}, !1);