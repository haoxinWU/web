$$ = function(a, c) {
    if (c) {
        var b = c.getElementsByTagName(a);
        if (!b || b.length == 0) {
            b = new Array();
            getbyTagName(c, a, b);
            return b;
        }
        return b;
    } else {
        return document.getElementsByTagName(a);
    }
};
var prevSaveData = "";
var hasCeShiQ = false;
$ce = function(c, d, a) {
    var b = document.createElement(c);
    if (d) {
        b.innerHTML = d;
    }
    a.appendChild(b);
    return b;
};
function StringBuilder() {
    this._stringArray = new Array();
}
StringBuilder.prototype.append = function(a) {
    this._stringArray.push(a);
};
StringBuilder.prototype.toString = function(a) {
    a = a || "";
    return this._stringArray.join(a);
};
StringBuilder.prototype.clear = function() {
    this._stringArray.length = 0;
};
function forbidBackSpace(f) {
    var c = f || window.event;
    var d = c.target || c.srcElement;
    var b = d.type || d.getAttribute("type");
    var a = c.keyCode == 8 && b != "password" && b != "text" && b != "textarea";
    if (a) {
        return false;
    }
}
document.onkeydown = forbidBackSpace;
function getGapFillCount(b) {
    var d = 0;
    var e = 0;
    var a = b.length;
    do {
        e = b.indexOf(GapFillStr, e);
        if (e != -1) {
            d++;
            e += GapFillStr.length;
            for (var c = e; c < a; c++) {
                if (b.charAt(c) != "_") {
                    break;
                }
                e++;
            }
        }
    } while ( e != - 1 );
    return d;
}
var EndGapReq = true;
var batAddQTimes = 0;
function replaceGapFill(m, d) {
    var f = 0;
    var e = 0;
    EndGapReq = true;
    if (d._requir) {
        var x = m.indexOf("<br");
        if (x > -1) {
            var g = m.indexOf(GapFillStr);
            if (g > x) {
                EndGapReq = false;
                m = m.substring(0, x) + "<span style='color:red;'>&nbsp;*</span>" + m.substring(x);
            }
        }
    }
    var q = new StringBuilder();
    var y = 0;
    do {
        e = f;
        f = m.indexOf(GapFillStr, f);
        var l = GapFillStr;
        var h = "";
        if (f != -1) {
            var n = 0;
            q.append(m.substr(e, f - e));
            f += GapFillStr.length;
            for (var t = f; t < m.length; t++) {
                if (m[t] != "_") {
                    break;
                }
                n++;
                l += "_";
                f++;
            }
            var a = GapWidth + n * (GapWidth / 3);
            var w = false;
            if (d._rowVerify[y]) {
                if (d._rowVerify[y]._verify == "日期") {
                    a = 70;
                    w = true;
                } else {
                    if (d._rowVerify[y]._verify == "指定选项") {
                        h = d._rowVerify[y]._choice;
                    }
                }
            }
            var k = "";
            if (d._isCeShi) {
                var p = d._rowVerify;
                if (p[y]) {
                    k = (p[y]._answer || "请设置答案") + ":" + (p[y]._ceshiValue || 1) + "分";
                    var s = k.length * 16;
                    if (a < s) {
                        a = s;
                    }
                }
            }
            var o = "";
            if (h) {
                o = GapFillReplace.replace("width:" + GapWidth + "px", "display:none;width:" + a + "px");
            } else {
                o = GapFillReplace.replace("width:" + GapWidth + "px", "width:" + a + "px");
            }
            if (k) {
                o = o.replace("/>", " value='" + k + "'/>");
            }
            if (d._useTextBox) {
                o = o.replace("/>", " class='inputtext'/>");
            } else {
                o = o.replace("/>", " class='underline'/>");
            }
            if (h) {
                var r = h.split(/[,，]/);
                var b = "<select style='border:1px solid #7F9DB9;padding:3px;vertical-align:middle;'><option value=''>请选择</option>";
                for (var u = 0; u < r.length; u++) {
                    var v = r[u];
                    b += "<option value='" + v + "'>" + v + "</option>";
                }
                b += "</select>";
                o = o.replace("/>", "/>" + b);
            }
            q.append(o);
            y++;
        } else {
            if (e < m.length) {
                q.append(m.substr(e));
            }
        }
    } while ( f != - 1 );
    return q.toString();
}
function replace_specialChar(a) {
    return a.replace(/(§)/g, "ξ").replace(/(¤)/g, "○").replace(/(〒)/g, "╤");
}
function getCoords(a) {
    var d = a.getBoundingClientRect(),
        i = a.ownerDocument,
        f = i.body,
        e = i.documentElement,
        c = e.clientTop || f.clientTop || 0,
        g = e.clientLeft || f.clientLeft || 0,
        h = d.top + (self.pageYOffset || e.scrollTop || f.scrollTop) - c,
        b = d.left + (self.pageXOffset || e.scrollLeft || f.scrollLeft) - g;
    return {
        top: h,
        left: b
    };
}
function mouseCoords(a) {
    if (!a) {
        return;
    }
    if (a.pageX || a.pageY) {
        return {
            x: a.pageX,
            y: a.pageY
        };
    }
    return {
        x: a.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: a.clientY + document.body.scrollTop - document.body.clientTop
    };
}
function sb_setmenunav(k, a, c, b) {
    var g = k;
    if (typeof(element) != "object") {
        g = document.getElementById(k);
    }
    if (!g) {
        return;
    }
    if (a) {
        if (g.timeArray) {
            window.clearTimeout(g.timeArray);
            g.timeArray = 0;
        }
        g.style.display = "block";
        if (!g.onmouseover) {
            g.onmouseover = function() {
                sb_setmenunav(k, true);
            };
            g.onmouseout = function() {
                sb_setmenunav(k, false);
            };
        }
        if (b) {
            var i = window.event || sb_setmenunav.caller.arguments[0];
            var h = mouseCoords(i);
            g.style.left = h.x + 1 + "px";
            g.style.top = h.y + 1 + "px";
        } else {
            if (c) {
                var f = c;
                if (f.parentNode.tagName.toLowerCase() == "li") {
                    f = c.parentNode;
                }
                var m = getCoords(f);
                var j = m.left;
                var e = m.top + f.offsetHeight;
                var l = document.documentElement.clientHeight || document.body.clientHeight;
                if (j + g.offsetWidth > bodyWidth) {
                    j = bodyWidth - g.offsetWidth - 30;
                }
                if (c.nextObj) {
                    e = m.top - 33;
                }
                if (e + g.offsetHeight > l) {
                    g.style.height = l - 10 - e + "px";
                }
                g.style.left = j + "px";
                g.style.top = e + "px";
                if (k == "qType" || k == "divTest") {
                    g.style.left = j - 160 + "px";
                }
            }
        }
    }
    if (c && c.tagName.toLowerCase() == "a") {
        g.needSaveClass = c;
        g.prevClass = c.className;
    } else {
        if (g.needSaveClass) {
            if (a) {
                g.needSaveClass.className = g.prevClass ? g.prevClass + " hover": "hover";
            } else {
                g.needSaveClass.className = g.prevClass || "";
            }
        }
    }
    if (!a) {
        g.timeArray = window.setTimeout(function() {
                g.style.display = "none";
                g.style.height = "";
            },
            200);
    }
}
var GapFillStr = "___";
var GapWidth = 21;
var GapFillReplace = "<input style='width:" + GapWidth + "px;' />";
function getFillStr(b) {
    var c = "";
    for (var a = 0; a < b; a++) {
        c += GapFillStr;
    }
    if (!c) {
        c = GapFillStr;
    }
    return c;
}
var EditorIndex = 1;
var EditToolBarItems = ["fontname", "fontsize", "textcolor", "bgcolor", "bold", "italic", "underline", "emoticons", "link", "image", "flash"];
var EditToolBarItemsPageCut = ["fontname", "fontsize", "textcolor", "bgcolor", "bold", "italic", "underline", "strikethrough", "subscript", "superscript", "title", "plainpaste", "-", "justifyleft", "justifycenter", "justifyright", "indent", "outdent", "link", "emoticons", "image", "flash", "media", "table", "hr"];
function getByClass(b, f, d) {
    var a = $$(b, f);
    var e = new Array();
    for (var c = 0; c < a.length; c++) {
        if (a[c].className.toLowerCase() == d.toLowerCase()) {
            e.push(a[c]);
        }
    }
    return e;
}
function getbyTagName(b, c, e) {
    var d;
    for (var a = 0; a < b.childNodes.length; a++) {
        d = b.childNodes[a];
        if (d.tagName === c) {
            e.push(d);
        }
        if (d.childNodes.length > 0 && d.nodeType == 1) {
            getbyTagName(d, c, e);
        }
    }
}
var defaultFileExt = ".gif|.png|.jpg|.jpeg|.bmp|.doc|.docx|.pdf|.xls|.xlsx|.ppt|.pptx|.txt|.rar|.zip|.gzip";
function Request(d) {
    var b = window.document.location.href;
    var f = b.indexOf("?");
    var e = b.substr(f + 1);
    var c = e.split("&");
    for (var a = 0; a < c.length; a++) {
        var g = c[a].split("=");
        if (g[0].toUpperCase() == d.toUpperCase()) {
            return g[1];
        }
    }
    return "";
}
function isEmpty(a) {
    return trim(a) == "";
}
function isInt(a) {
    var b = /^-?[0-9]+$/;
    return b.test(a);
}
function isPositive(a) {
    var b = /^\+?[1-9][0-9]*$/;
    return b.test(a);
}
function toInt(a) {
    return parseInt(trim(a));
}
var status_tip = $("status_tip");
var topnav = $("topnav");
var divSurvey = $("sur");
var divMenu = $("divMenu");
var questions = $("question");
var firstPage = null;
var questionHolder = new Array();
var cur = null;
var curover = null;
var curinsert = null;
var langVer = 0;
var WjxActivity = new Object();
var DataArray = new Array();
var total_page = 0;
var total_question = 0;
var select_item_num = 1;
var isMergeAnswer = false;
var isCompleteLoad = false;
var referRelHT = new Object();
var designversion = "7";
var hasInsPromoteJump = false;
var lastAddNewQTime = null;
var prevcurmove = null;
var useShortCutAddNewQ = false;
var QIndentity = 1;
function trim(a) {
    if (a && a.replace) {
        return a.replace(/(^\s*)|(\s*$)/g, "");
    } else {
        return a;
    }
}
var interval_time;
init_page();
function init_page() {
    addEventSimple(window, "resize", setSidePos);
    if (vipUser == "2") {
        EditToolBarItems.push("source");
        EditToolBarItemsPageCut.push("source");
    }
    setSidePos();
    show_status_tip("正在读取数据，请稍后...");
    processData();
    interval_time = setInterval(autoSave, 90 * 1000);
}
function processData() {
    if (serverVersion && serverVersion != designversion) {
        alert("很抱歉，由于问卷星系统版本升级，您本机使用的脚本文件已过期，请您刷新页面或者重启浏览器再编辑问卷！");
        return;
    }
    var a = hfData.value;
    if (a == "error") {
        window.location = "/error/error.aspx?source=designQHandler";
    } else {
        if (a == "timeout") {
            alert("您的登录信息超时，请重新登录，谢谢！");
            window.location = "/wjx/manage/myquestionnaires.aspx";
        } else {
            show_status_tip("数据读取成功，初始化...");
            set_data_fromServer(a);
            set_data_toDesign();
            isCompleteLoad = true;
            if (questionHolder.length > 0) {
                questionHolder[0].focus();
            }
            loadComplete();
            document.title = "设计问卷 － [问卷星 www.sojump.com] － 专业的在线问卷调查平台";
        }
    }
}
function autoSave() {
    var a = $("chkAutoSave");
    if (a.checked) {
        save_paper("edit", false);
    }
}
function showCeShiInfo() {
    if (hasCeShiQ || isKaoShi) {
        $("spanRandom").parentNode.style.display = "none";
        $("chkUseSelfTopic").parentNode.style.display = "none";
    }
}
function set_data_fromServer(c) {
    var b = new Array();
    var h = c.split("œ")[0];
    b = h.split("¤");
    var f = new Array();
    var g = c.split("œ")[1];
    var f = g.split("§");
    if (f[0] == "true") {
        isMergeAnswer = true;
    } else {
        isMergeAnswer = false;
    }
    if (isMergeAnswer) {
        var e = $("chkAutoSave");
        e.checked = false;
    }
    userGuid = f[1];
    langVer = Number(f[2]);
    var a = new Array();
    a = b[0].split("§");
    WjxActivity._start_time = a[0];
    WjxActivity._title = a[1];
    WjxActivity._tag = a[2];
    WjxActivity._random_begin = a[3];
    WjxActivity._random_end = a[4];
    WjxActivity._random_mode = a[5];
    WjxActivity._use_self_topic = a[6] == "true" ? true: false;
    WjxActivity._display_part = false;
    WjxActivity._display_part_num = 0;
    WjxActivity._partset = "";
    if (WjxActivity._random_mode == "1" || WjxActivity._random_mode == "2") {
        WjxActivity._display_part = a[7] == "true" ? true: false;
        if (WjxActivity._display_part) {
            WjxActivity._display_part_num = parseInt(a[8]);
        }
    } else {
        if (WjxActivity._random_mode == "3" || WjxActivity._random_mode == "4") {
            WjxActivity._partset = a[7] || "";
        }
    }
    for (var d = 1; d < b.length; d++) {
        DataArray[d - 1] = set_string_to_dataNode(b[d]);
    }
    showCeShiInfo();
}
function setCepingTip(b, a) {
    qtypeLayer.innerHTML = a;
    b.nextObj = 1;
    sb_setmenunav(qtypeLayer, true, b);
    b.onmouseout = function() {
        sb_setmenunav(qtypeLayer, false, b);
    };
}
function setLiCat(a) {}
function isQuestionLikert(b) {
    var c = b._type;
    var a = b._tag || 0;
    return c == "radio" && a;
}
function set_string_to_dataNode(p) {
    var e = new Object();
    var c = new Array();
    c = p.split("§");
    e._type = c[0];
    switch (c[0]) {
        case "page":
            e._topic = c[1];
            e._title = c[2];
            e._tag = c[3];
            e._iszhenbie = c[4] == "true";
            e._istimer = c[4] == "time";
            e._mintime = c[5] ? parseInt(c[5]) : "";
            e._maxtime = c[6] ? parseInt(c[6]) : "";
            total_page++;
            break;
        case "cut":
            e._title = c[1];
            e._video = c[2] || "";
            e._relation = c[3] || "";
            break;
        case "fileupload":
            e._topic = c[1];
            var r = c[2].split("〒");
            e._title = r[0];
            e._keyword = r.length == 2 ? r[1] : "";
            e._relation = r[2] || "";
            e._tag = c[3];
            if (c[4] == "true") {
                e._requir = true;
            } else {
                e._requir = false;
            }
            e._width = c[5] ? parseInt(c[5]) : 200;
            e._ext = c[6] || "";
            e._maxsize = c[7] ? parseInt(c[7]) : 4096;
            e._ins = c[8];
            if (c[9] == "true") {
                e._hasjump = true;
            } else {
                e._hasjump = false;
            }
            e._anytimejumpto = c[10];
            break;
        case "slider":
            e._topic = c[1];
            var r = c[2].split("〒");
            e._title = r[0];
            e._keyword = r.length == 2 ? r[1] : "";
            e._relation = r[2] || "";
            e._tag = c[3];
            if (c[4] == "true") {
                e._requir = true;
            } else {
                e._requir = false;
            }
            e._minvalue = c[5];
            e._maxvalue = c[6];
            e._minvaluetext = c[7];
            e._maxvaluetext = c[8];
            e._ins = c[9];
            if (c[10] == "true") {
                e._hasjump = true;
            } else {
                e._hasjump = false;
            }
            e._anytimejumpto = c[11];
            break;
        case "question":
            e._topic = c[1];
            var r = c[2].split("〒");
            e._title = r[0];
            e._keyword = r.length == 2 ? r[1] : "";
            e._relation = r[2] || "";
            e._tag = c[3];
            e._height = c[4] ? parseInt(c[4]) : 1;
            e._maxword = c[5];
            if (c[6] == "true") {
                e._requir = true;
            } else {
                e._requir = false;
            }
            if (c[7] == "true") {
                e._norepeat = true;
            } else {
                e._norepeat = false;
            }
            e._default = c[8];
            e._ins = c[9];
            if (c[10] == "true") {
                e._hasjump = true;
            } else {
                e._hasjump = false;
            }
            e._anytimejumpto = c[11];
            e._verify = c[12];
            if (c[13]) {
                var k = c[13].split("〒");
                e._needOnly = k[0] == "true" ? true: false;
                e._needsms = k[1] == "true" ? true: false;
            }
            e._hasList = c[14] == "true" ? true: false;
            e._listId = c[15] ? parseInt(c[15]) : -1;
            e._width = c[16] ? parseInt(c[16]) : "";
            e._underline = c[17] == "true" ? true: false;
            e._minword = c[18] ? parseInt(c[18]) : "";
            if (c[19]) {
                if (e._verify == "多级下拉") {
                    e._levelData = c[19] || "";
                } else {
                    var g = c[19].split("〒");
                    e._isCeShi = true;
                    e._ceshiValue = g[0] || 5;
                    e._answer = g[1] || "请设置答案";
                    e._ceshiDesc = g[2] || "";
                    e._include = g[3] == "true";
                    hasCeShiQ = true;
                }
            }
            break;
        case "gapfill":
            e._topic = c[1];
            var r = c[2].split("〒");
            e._title = r[0];
            e._keyword = r.length == 2 ? r[1] : "";
            e._relation = r[2] || "";
            e._tag = c[3];
            if (c[4] == "true") {
                e._requir = true;
            } else {
                e._requir = false;
            }
            e._gapcount = c[5] ? parseInt(c[5]) : 1;
            e._ins = c[6];
            if (c[7] == "true") {
                e._hasjump = true;
            } else {
                e._hasjump = false;
            }
            e._anytimejumpto = c[8];
            var i = c[9] || "";
            e._rowVerify = new Array();
            if (c[11]) {
                e._isCeShi = true;
                hasCeShiQ = true;
            }
            if (i) {
                var n = i.split("〒");
                for (var u = 0; u < n.length; u++) {
                    var v = new Object();
                    var d = n[u].split("¦");
                    if (d[0] == "指定选项") {
                        v._verify = d[0];
                        v._choice = d[1] || "";
                    } else {
                        var o = n[u].split(",");
                        v._verify = o[0];
                        v._minword = o[1];
                        v._maxword = o[2];
                        if (e._isCeShi) {
                            v._ceshiValue = o[3] || 1;
                            v._answer = o[4] || "请设置答案";
                            v._ceshiDesc = o[5] || "";
                            v._include = o[6] == "true";
                            hasCeShiQ = true;
                        }
                    }
                    e._rowVerify[u] = v;
                }
            }
            e._useTextBox = c[10] == "true";
            break;
        case "sum":
            e._topic = c[1];
            var r = c[2].split("〒");
            e._title = r[0];
            e._keyword = r.length == 2 ? r[1] : "";
            e._relation = r[2] || "";
            e._tag = c[3];
            if (c[4] == "true") {
                e._requir = true;
            } else {
                e._requir = false;
            }
            e._total = parseInt(c[5]);
            e._rowtitle = c[6];
            e._rowwidth = c[7].indexOf("%") > -1 ? c[7] : "";
            e._ins = c[9];
            if (c[10] == "true") {
                e._hasjump = true;
            } else {
                e._hasjump = false;
            }
            e._anytimejumpto = c[11];
            break;
        case "radio":
        case "check":
        case "radio_down":
        case "matrix":
        case "boolean":
            if (c[0] == "boolean") {
                e._isbool = true;
                e._type = "radio";
            } else {
                e._type = c[0];
            }
            e._topic = c[1];
            var r = c[2].split("〒");
            e._title = r[0];
            e._keyword = r.length == 2 ? r[1] : "";
            e._relation = r[2] || "";
            e._mainWidth = r[3] || "";
            e._tag = isInt(c[3]) ? toInt(c[3]) : 0;
            if (e._type == "matrix") {
                var m = c[4].split("〒");
                e._rowtitle = m[0];
                if (m.length >= 2) {
                    e._rowtitle2 = m[1];
                } else {
                    e._rowtitle2 = "";
                }
                if (m.length == 3) {
                    e._columntitle = m[2];
                } else {
                    e._columntitle = "";
                }
            } else {
                var t = c[4].split("〒");
                e._numperrow = isInt(t[0]) ? toInt(t[0]) : 1;
                e._randomChoice = false;
                if (t.length == 2) {
                    e._randomChoice = t[1] == "true" ? true: false;
                }
            }
            if (c[5] == "true") {
                e._hasvalue = true;
            } else {
                e._hasvalue = false;
            }
            if (c[6] == "true") {
                e._hasjump = true;
            } else {
                e._hasjump = false;
            }
            e._anytimejumpto = c[7];
            if (c[0] == "check" || (c[0] == "matrix" && e._tag == "102")) {
                var h = c[8].split(",");
                if (h[0] == "true") {
                    e._requir = true;
                } else {
                    e._requir = false;
                }
                if (h[1] == "shop") {
                    e._isShop = true;
                } else {
                    e._lowLimit = h[1];
                    e._upLimit = h[2];
                }
            } else {
                if (c[8] == "true") {
                    e._requir = true;
                } else {
                    if (c[0] == "radio") {
                        var h = c[8].split(",");
                        e._requir = h[0] == "true";
                        if (h[1]) {
                            e._isQingJing = true;
                        }
                    } else {
                        e._requir = false;
                    }
                }
            }
            if (e._type == "matrix") {
                var w = c[9].split("〒");
                var x = w[0].split(",");
                e._rowwidth = x[0].indexOf("%") > -1 ? x[0] : "";
                e._randomRow = x[1] == "true";
                e._rowwidth2 = "";
                if (w.length >= 2) {
                    e._rowwidth2 = w[1].indexOf("%") > -1 ? w[1] : "";
                }
                e._minvalue = 0;
                e._maxvalue = 10;
                if (e._tag == "202" || e._tag == "301") {
                    e._minvalue = w[2] || "";
                    e._maxvalue = w[3] || "";
                } else {
                    if (e._tag == "102" || e._tag == "103") {
                        e._daoZhi = w[2] == "true";
                    } else {
                        if (e._tag == "201") {
                            e._hasvalue = false;
                            var i = w[2] || "";
                            e._rowVerify = new Array();
                            if (i) {
                                var n = i.split(";");
                                for (var u = 0; u < n.length; u++) {
                                    if (!n[u]) {
                                        continue;
                                    }
                                    var v = new Object();
                                    var o = n[u].split(",");
                                    v._verify = o[1];
                                    v._minword = o[2];
                                    v._maxword = o[3];
                                    v._width = o[4] || "";
                                    var b = parseInt(o[0]);
                                    e._rowVerify[b] = v;
                                }
                            }
                        }
                    }
                }
                e._isTouPiao = false;
                e._isCeShi = false;
            } else {
                var f = c[9].split("〒");
                if (f[0] == "true") {
                    e._isTouPiao = true;
                    e._touPiaoWidth = isInt(f[1]) ? parseInt(f[1]) : 50;
                    e._displayDesc = f[2] == "true";
                    e._displayNum = f[3] == "true";
                    e._displayPercent = f[4] == "true";
                } else {
                    if (f[0] == "ceshi") {
                        e._isCeShi = true;
                        hasCeShiQ = true;
                        e._ceshiValue = isInt(f[1]) ? parseInt(f[1]) : 5;
                        e._ceshiDesc = f[2];
                    } else {
                        if (f[0] == "ceping") {
                            e._isCePing = true;
                        }
                    }
                }
            }
            e._ins = c[10];
            e._verify = c[11];
            e._referTopic = c[12];
            e._referedTopics = c[13];
            e._select = new Array();
            var a = 14;
            for (var q = a; q < c.length; q++) {
                var s = new Array();
                s = c[q].split("〒");
                var l = q - a + 1;
                e._select[l] = new Object();
                e._select[l]._item_title = s[0];
                if (s[1] == "true") {
                    e._select[l]._item_radio = true;
                } else {
                    e._select[l]._item_radio = false;
                }
                e._select[l]._item_value = s[2];
                e._select[l]._item_jump = s[3];
                e._select[l]._item_tb = false;
                e._select[l]._item_tbr = false;
                e._select[l]._item_img = "";
                e._select[l]._item_imgtext = false;
                e._select[l]._item_desc = "";
                e._select[l]._item_label = "";
                if (s.length >= 9) {
                    e._select[l]._item_tb = s[4] == "true";
                    e._select[l]._item_tbr = s[5] == "true";
                    e._select[l]._item_img = s[6];
                    e._select[l]._item_imgtext = s[7] == "true";
                    e._select[l]._item_desc = s[8];
                    e._select[l]._item_label = s[9];
                    e._select[l]._item_huchi = s[10] == "true";
                }
                select_item_num++;
            }
            break;
        default:
            break;
    }
    return e;
}
function set_data_toDesign() {
    var f = $("paper_attr_title");
    f.value = WjxActivity._title;
    var b = $("pater_title");
    b.innerHTML = f.value;
    var a = $("paper_attr_desc");
    a.value = WjxActivity._tag;
    var e = $("pater_desc");
    e.innerHTML = a.value;
    $("divId").onclick = function() {
        paper_attr("paper_attr_title");
    };
    a.onblur = a.onclick = a.onchange = function() {
        paper_attr_desc_onblur(this);
    };
    var c = $("chkUseTopic");
    var d = $("chkUseSelfTopic");
    c.checked = d.checked = WjxActivity._use_self_topic;
    c.onclick = d.onclick = function() {
        WjxActivity._use_self_topic = this.checked;
        c.checked = d.checked = this.checked;
        for (var g = 0; g < questionHolder.length; g++) {
            var h = questionHolder[g].dataNode._type;
            if (h != "cut" && h != "page") {
                questionHolder[g].divTopic.style.display = WjxActivity._use_self_topic ? "none": "";
            }
        }
        if (this.checked) {
            show_status_tip("设置成功！请在问题标题前添加自定义题号。", 4000);
        }
    };
    if (a.value.indexOf("<") > -1) {
        a.style.display = "none";
    }
    document.title = "正在加载问卷，请耐心等待....";
    set_dataNode_to_Design();
}
function getIEVersion() {
    var a = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return a ? parseInt(a[1]) : undefined;
}
function setQTopPos(c) {
    var g = 0;
    var f = document.documentElement.clientHeight || document.body.clientHeight;
    g = c.offsetTop + c.offsetHeight - f + 10;
    if (c.offsetHeight < f - 100) {
        g += 100;
    }
    var d = document.getElementById("pater_desc");
    var e = getIEVersion();
    var b = e && (!document.documentMode || document.documentMode < 8);
    var a = e <= 7 || b;
    if (a) {
        g += 85;
    }
    if (e) {
        setTimeout(function() {
                divSurvey.scrollTop = g;
            },
            400);
    } else {
        divSurvey.scrollTop = g;
    }
}
function set_dataNode_to_Design() {
    var f;
    var h = 0;
    var d = 0;
    var b = document.createDocumentFragment();
    for (var c = 0; c < DataArray.length; c++) {
        f = create_question(DataArray[c]);
        b.appendChild(f);
        if (DataArray[c]._type == "page" && firstPage == null) {
            firstPage = f;
            if (window.isTiKu) {
                firstPage.style.display = "none";
            }
        } else {
            if (h == 0 && isCepingQ) {
                f.isCepingQ = true;
            }
            questionHolder[h++] = f;
        }
        if (DataArray[c]._referedTopics) {
            var g = DataArray[c]._referedTopics.split(",");
            for (var e = 0; e < g.length; e++) {
                referRelHT[g[e]] = f;
            }
        }
        if (DataArray[c]._type != "page") {
            if (referRelHT[DataArray[c]._topic]) {
                var a = referRelHT[DataArray[c]._topic];
                f._referDivQ = a;
                if (!a._referedArray) {
                    a._referedArray = new Array();
                }
                a._referedArray.push(f);
                if (DataArray[c]._type == "sum") {
                    f.createSum();
                } else {
                    if (f.createTableRadio) {
                        f.createTableRadio();
                    }
                }
            }
        }
    }
    questions.appendChild(b);
    if (total_question == 0 && firstPage) {
        firstPage.style.display = "none";
    }
}
function getDataNodeByTopic(b) {
    for (var c = 0,
             a = questionHolder.length; c < a; c++) {
        var d = questionHolder[c].dataNode;
        if (d._type == "page" || d._type == "cut") {
            continue;
        }
        if (b == d._topic) {
            return d;
        }
    }
    return null;
}
function getDivIndex(b) {
    for (var c = 0,
             a = questionHolder.length; c < a; c++) {
        var d = questionHolder[c].dataNode;
        if (d._type == "page" || d._type == "cut") {
            continue;
        }
        if (b == d._topic) {
            return c;
        }
    }
    return - 1;
}
function getJumpTitle(c) {
    if (c == "0" || c == "") {
        return "直接跳到下一题";
    } else {
        if (c == "1") {
            return "直接跳到问卷末尾";
        } else {
            if (isInt(c)) {
                var b = getDataNodeByTopic(c);
                if (b) {
                    var a = b._title;
                    if (!WjxActivity._use_self_topic) {
                        a = b._topic + "." + a;
                    }
                    return a;
                }
            }
        }
    }
    return "";
}
var status_tip_timeout = null;
function show_status_tip(b, d) {
    clearTimeout(status_tip_timeout);
    status_tip.style.display = "block";
    status_tip.innerHTML = b;
    var a = document.documentElement.scrollTop || document.body.scrollTop;
    var c = document.documentElement.clientHeight || document.body.clientHeight;
    if (status_tip.hasSetWidth) {
        status_tip.style.width = "";
    }
    status_tip.style.top = a + c - status_tip.offsetHeight - 25 + "px";
    status_tip.style.width = (divSurvey.offsetWidth - 10) + "px";
    if (d > 0) {
        status_tip_timeout = setTimeout("status_tip.style.display='none';status_tip.style.width = '';status_tip.hasSetWidth=false;", d);
    }
}
function setSidePos() {
    status_tip.style.left = getCoords(divSurvey).left + "px";
    var a = document.documentElement.clientHeight || document.body.clientHeight;
    divSurvey.style.height = a - 155 + "px";
}
function show(a) {
    return;
}
var descEditorCreated = false;
function paper_attr(a) {
    PDF_launch("divQAttr", 520, 350);
    var c = "paper_attr_desc";
    if (!descEditorCreated) {
        KE.init({
            id: c,
            newlineTag: "p",
            width: "400px",
            height: "180px",
            filterMode: filter,
            items: EditToolBarItemsPageCut,
            afterChange: function(d) {
                KE.util.setData(d);
            },
            DesignPage: 1
        });
        KE.create(c);
        descEditorCreated = true;
        KE.util.focus(c);
    }
    var b = $(a);
    b.select();
}
function paper_attr_title_onblur(a) {
    var b = $("pater_title");
    b.innerHTML = a.value = replace_specialChar(trim(a.value));
}
function paper_attr_desc_onblur(a) {
    var b = $("pater_desc");
    b.innerHTML = a.value;
    $("spanHInput").innerHTML = a.value.length;
    var c = 4000 - a.value.length;
    if (c < 0) {
        c = 0;
    }
    $("spanLeftInput").innerHTML = c;
    $("spanDTip").style.display = "";
}
var titleEditorCreated = false;
function openTitleEditor(a, e, c) {
    c = c || "";
    PDF_launch("divTitleEditor", 720, 450, e, c);
    var d = "textTitleId";
    if (!titleEditorCreated) {
        KE.init({
            id: d,
            items: EditToolBarItemsPageCut,
            filterMode: filter
        });
        KE.create(d);
        setInterval(new Function('KE.util.setData("textTitleId")'), 500);
        titleEditorCreated = true;
        KE.util.focus(d);
    }
    var b = a.value || a.innerHTML || "";
    $("divTitleEditor").initContent = b;
    KE.util.setFullHtml(d, b);
}
function clickOK() {
    var a = KE.util.getData("textTitleId");
    window.parent.PDF_close(a);
}
function clickCancel() {
    var a = "-1nc";
    if (CheckIsDirty()) {
        if (confirm("您要保存刚才所做的更改吗？")) {
            a = KE.util.getData("textTitleId");
        }
    }
    window.parent.PDF_close(a);
}
function CheckIsDirty() {
    var a = KE.util.getData("textTitleId");
    return $("divTitleEditor").initContent != a;
}
function openJumpWindow(a, c, f) {
    var l = a.dataNode._topic;
    var d = "&nbsp;<span style='color:#075DB3;'>请选择要跳转到的题目：</span>";
    d += "<div style='padding:5px;'>";
    if (!f) {
        d += "<a onclick='jumpSelected(0,this);' href='javascript:void(0);' title='提示：题号“0”表示顺序填写下一题' class='link-UF90'>选择直接跳到下一题</a>\r\n&nbsp;&nbsp;";
    }
    d += "<a onclick='jumpSelected(1,this);'  href='javascript:void(0);' title='提示：题号“1”表示直接跳到问卷末尾'  class='link-UF90'>选择直接跳到问卷末尾</a>\r\n";
    d += "<div style='border-top:1px solid #ccddff;margin:10px 0;'>";
    for (var e = 0,
             h = questionHolder.length; e < h; e++) {
        var j = questionHolder[e].dataNode;
        if (j._type == "page" || j._type == "cut") {
            continue;
        }
        var k = j._topic;
        if (k - l > 0) {
            var b = k + ".";
            if (WjxActivity._use_self_topic) {
                b = "";
            }
            var g = j._title.replace(/<.+?>/gim, "");
            d += "<div style='margin-top:10px;'><a class='link-U00a6e6' onclick='jumpSelected(" + k + ",this);' href='javascript:void(0);'  title='" + g + "'>" + b + g.substring(0, 23) + "</a></div>\r\n";
        }
    }
    d += "</div></div>";
    toolTipLayer.innerHTML = d;
    toolTipLayer.jumpObj = c;
    toolTipLayer.style.width = "300px";
    sb_setmenunav(toolTipLayer, true, c);
}
function openValWindow(b, c) {
    var a = "<div style='padding:5px 10px;'>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(2);' class='link-06f' href='javascript:void(0);'>交换选项分数</a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(0);' class='link-06f' href='javascript:void(0);'>分数<b>从1开始</b>顺序递增</a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(1);' class='link-06f' href='javascript:void(0);'>选项分数全部<b>加1</b></a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(-1);' class='link-06f' href='javascript:void(0);'>选项分数全部<b>减1</b></a></div>";
    a += "</div>";
    toolTipLayer.innerHTML = a;
    toolTipLayer.valObj = b;
    toolTipLayer.style.width = "150px";
    sb_setmenunav(toolTipLayer, true, c);
}
function valChanged(f) {
    if (!toolTipLayer.valObj) {
        return;
    }
    var c = toolTipLayer.valObj;
    var h = toolTipLayer.valObj.dataNode;
    var g = c.option_radio;
    if (f == 0) {
        for (var d = 1; d < g.length; d++) {
            if (g[d].get_item_value().value != "") {
                g[d].get_item_value().value = d;
            }
        }
    } else {
        if (f == 2) {
            var e = 1;
            var a = g.length - 1;
            while (e < a) {
                var b = g[a].get_item_value().value;
                g[a].get_item_value().value = g[e].get_item_value().value;
                g[e].get_item_value().value = b;
                if (g[a].get_item_novalue()) {
                    b = g[a].get_item_novalue().checked;
                    g[a].get_item_novalue().checked = g[e].get_item_novalue().checked;
                    g[e].get_item_novalue().checked = b;
                }
                e++;
                a--;
            }
        } else {
            for (var d = 1; d < g.length; d++) {
                if (g[d].get_item_value().value != "") {
                    g[d].get_item_value().value = parseInt(h._select[d]._item_value) + f;
                }
            }
        }
    }
    c.updateItem();
    toolTipLayer.valObj = null;
    sb_setmenunav(toolTipLayer, false);
}
function openProvinceWindow(a, c) {
    var b = "北京,天津,河北,山西,内蒙古,辽宁,吉林,黑龙江,上海,江苏,浙江,安徽,福建,江西,山东,河南,湖北,湖南,广东,广西,海南,重庆,四川,贵州,云南,西藏,陕西,宁夏,甘肃,青海,新疆,香港,澳门,台湾,其它国家,不指定";
    var g = "<div style='padding:5px 10px;'>";
    var f = b.split(",");
    for (var d = 1; d <= f.length; ++d) {
        var j = f[d - 1];
        var e = "link-06f";
        if (j == "不指定") {
            e = "link-f60";
        }
        var h = "<span style='cursor:pointer;margin-top:3px;'><a onclick='provinceChanged(this);' class='" + e + "' href='javascript:void(0);'>" + j + "</a></span>";
        g += h;
        if (d % 8 == 0) {
            g += "<div></div>";
        } else {
            g += "&nbsp;&nbsp;";
        }
    }
    g += "</div>";
    toolTipLayer.innerHTML = g;
    toolTipLayer.provinceObj = c;
    toolTipLayer.style.width = "360px";
    sb_setmenunav(toolTipLayer, true, c);
}
function provinceChanged(a) {
    if (!toolTipLayer.provinceObj) {
        return;
    }
    toolTipLayer.provinceObj.value = a.innerHTML;
    if (toolTipLayer.provinceObj.value == "不指定") {
        toolTipLayer.provinceObj.value = "";
    }
    if (toolTipLayer.provinceObj.onblur) {
        toolTipLayer.provinceObj.onblur();
    }
    toolTipLayer.provinceObj = null;
    sb_setmenunav(toolTipLayer, false);
}
function jumpSelected(a, b) {
    if (toolTipLayer.jumpObj) {
        toolTipLayer.jumpObj.value = a || "0";
        toolTipLayer.jumpObj.title = b.innerHTML;
        if (toolTipLayer.jumpObj.onblur) {
            toolTipLayer.jumpObj.onblur();
        }
        toolTipLayer.jumpObj = null;
        if (cur && cur.updateItem) {
            cur.updateItem();
        }
    }
    toolTipLayer.style.width = "250px";
    sb_setmenunav(toolTipLayer, false);
}
function getPageQCount() {
    var c = 0;
    var d = new Array();
    var a = 0;
    for (var b = 0; b < questionHolder.length; b++) {
        if (questionHolder[b].dataNode._type == "page") {
            c++;
            d.push(a);
            a = 0;
        } else {
            if (questionHolder[b].dataNode._type != "cut") {
                a++;
            }
        }
    }
    d.push(a);
    return d;
}
function initPageQuestionRandom() {
    var b = "/wjx/design/setrandom.aspx";
    var a = "题目随机设置";
    PDF_launch(b, 540, 300, null, a);
}
function setTikuRandom() {
    var b = "/wjx/design/settiku.aspx";
    var a = "题库随机设置";
    if (WjxActivity._random_mode == "3") {
        b = "/wjx/design/settikuold.aspx";
    }
    PDF_launch(b, 540, 360, null, a);
}
function $import(b) {
    var a = document.createElement("script");
    a.setAttribute("src", b);
    a.setAttribute("type", "text/javascript");
    document.getElementsByTagName("head")[0].appendChild(a);
}
function $importNoCache(a) {
    $import(a);
}
function loadComplete() {
    show_status_tip("成功获得数据", 2000);
    save_paper("init", false);
    setSidePos();
    divMenu.style.visibility = "visible";
    topnav.style.visibility = "visible";
    $importNoCache("js/operation_new.js?v=10");
    $importNoCache("kindeditor/kindeditor.js");
    $importNoCache("js/createqattr_new.js?v=13");
    $importNoCache("js/utility_new.js");
}
function getXmlHttp() {
    var a;
    try {
        a = new XMLHttpRequest();
    } catch(b) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(b) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(b) {}
        }
    }
    return a;
}
function removeEventSimple(c, a, b) {
    if (c.removeEventListener) {
        c.removeEventListener(a, b, false);
    } else {
        if (c.detachEvent) {
            c.detachEvent("on" + a, b);
        }
    }
}
function addEventSimple(c, a, b) {
    if (c.addEventListener) {
        c.addEventListener(a, b, false);
    } else {
        if (c.attachEvent) {
            c.attachEvent("on" + a, b);
        }
    }
}
function control_text(b) {
    var a = document.createElement("input");
    a.type = "text";
    a.style.width = b * 10 + "px";
    a.className = "inputtext";
    return a;
}
function control_image(b) {
    var a = document.createElement("img");
    a.src = b;
    return a;
}
function control_check() {
    var a = document.createElement("input");
    a.type = "checkbox";
    a.tabIndex = "-1";
    return a;
}
function control_textarea(c, b) {
    var a = document.createElement("textarea");
    a.wrap = "soft";
    a.rows = c;
    a.style.width = b * 10 + "px";
    a.style.height = c * 22 + "px";
    a.className = "inputtext";
    return a;
}
function control_btn(b) {
    var a = document.createElement("input");
    a.type = "button";
    a.value = b;
    return a;
}
function control_radio(a) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        try {
            var c = document.createElement('<input type="radio" name="' + a + '" />');
            return c;
        } catch(b) {
            var c = document.createElement("input");
            c.type = "radio";
            c.name = a;
            return c;
        }
    } else {
        var c = document.createElement("input");
        c.type = "radio";
        c.name = a;
        return c;
    }
}
function addTouPiao(d, c, a, b) {
    d.append("<table><tr>");
    if (c._displayPercent || c._displayNum) {
        d.append("<td>");
        d.append("<div style='margin-top: 3px; '>");
        if (c._displayNum) {
            d.append("<span style='color:#ff6600;'>" + parseInt(a[b - 1]) + "票</span>");
        }
        if (c._displayPercent) {
            if (c._displayNum) {
                d.append("(");
            }
            d.append(a[b - 1].toFixed(2) + "%");
            if (c._displayNum) {
                d.append(")");
            }
        }
        d.append("</div><div style='clear: both;'></div></td>");
    }
    d.append("</tr></table>");
}
var txtCurCity = null;
function openCityBox(e, d, c, f) {
    txtCurCity = e;
    ZheZhaoControl = txtCurCity;
    f = f || "";
    var a = e.getAttribute("province");
    var b = "";
    if (a) {
        b = "&pv=" + encodeURIComponent(a);
    }
    if (d == 3) {
        PDF_launch("/wjx/design/setcitycounty.aspx?activityid=" + activityID + "&ct=" + d + b + "&pos=" + f, 470, 220);
    } else {
        if (d == 4) {
            ZheZhaoControl = null;
            PDF_launch("/wjx/design/school.aspx?activityid=" + activityID + b, 700, 340);
        } else {
            PDF_launch("/wjx/design/setcity.aspx?activityid=" + activityID + "&ct=" + d + "&pos=" + f, 470, 220);
        }
    }
}
function setCityBox(a) {
    txtCurCity.value = a;
}
function setBatchA() {
    var b = document.getElementById("divbatchq");
    var a = b.getElementsByTagName("a")[0];
    if (isKaoShi || hasCeShiQ) {
        a.innerHTML = "批量添加考试题";
        a.onclick = function() {
            PDF_launch("addbatchq.aspx?ks=1", 620, 450, null, "批量添加考试题");
        };
    } else {
        a.innerHTML = "批量添加题目";
        a.onclick = function() {
            PDF_launch("addbatchq.aspx", 620, 450, null, "批量添加题目");
        };
    }
}
function showhidebatq() {
    var a = document.getElementById("divbatchq");
    if (!a) {
        return;
    }
    if (total_question > 0 || batAddQTimes > 0) {
        a.style.display = "";
    } else {
        a.style.display = "none";
    }
    setBatchA();
}
function create_question(f) {
    var af = f._type;
    var s = f._verify;
    var w = f._height > 1;
    _likertMode = f._tag || 0;
    var F = false;
    var g = false;
    if (isMergeAnswer && isCompleteLoad) {
        g = true;
    }
    var B = document.createElement("div");
    B.className = "div_question";
    B.dataNode = f;
    B.tabIndex = -1;
    var K = $ce("div", "", B);
    K.className = "div_preview";
    B.div_question_preview = K;
    var J = af == "question";
    var H = af == "slider";
    var R = af == "sum";
    var O = af == "page";
    var E = af == "cut";
    var b = af == "check";
    var m = af == "radio";
    var r = m && _likertMode;
    var q = m && _likertMode > 1;
    var h = af == "radio_down";
    var d = af == "matrix";
    var a = af == "matrix" && _likertMode > 300;
    var G = b && _likertMode;
    var X = af == "fileupload";
    var l = m || h || b || d;
    var ac = !E && !O;
    var M = af == "gapfill";
    B.isMergeNewAdded = g;
    if (ac) {
        total_question++;
    }
    QIndentity++;
    showhidebatq();
    var k = document.createElement("div");
    if (ac) {
        var W = f._topic + "";
        if (f._topic - 100 < 0) {
            W += ".";
        }
        var D = $ce("div", W, k);
        B.divTopic = D;
        D.className = "div_topic_question";
        if (WjxActivity._use_self_topic) {
            D.style.display = "none";
        }
    }
    if (O) {
        var i = f._iszhenbie;
        var D = $ce("span", "<span style='font-size:14px; font-weight:bold;'>第" + f._topic + "页/共" + total_page + "页</span>", k);
        D.className = "div_topic_page_question";
        B.divTopic = D;
        B.divZhenBie = $ce("span", "<b style='color:red;'>--甄别页</b>", k);
        if (f._istimer) {
            $ce("span", "<b style='color:red;'>--时间页</b>", k);
        }
        B.divZhenBie.style.display = i ? "": "none";
        B.divTimeLimit = $ce("span", "", k);
        B.showTimeLimit = function() {
            var ag = "";
            if (this.dataNode._istimer) {
                if (this.dataNode._mintime) {
                    ag = "<b style='color:green;'>页面停留时间：" + this.dataNode._mintime + "秒</b>";
                }
            } else {
                if (this.dataNode._mintime) {
                    ag = "<b style='color:green;'>最短填写时间：" + this.dataNode._mintime + "秒</b>";
                }
                if (this.dataNode._maxtime) {
                    if (ag) {
                        ag += "&nbsp;";
                    }
                    ag += "<b style='color:red;'>最长填写时间：" + this.dataNode._maxtime + "秒</b>";
                }
            }
            if (ag) {
                ag = "&nbsp;&nbsp;--" + ag + "";
            }
            B.divTimeLimit.innerHTML = ag;
        };
        B.showTimeLimit();
        if (f._topic == "1") {
            isPrevFirstPage = true;
        }
    }
    if (E) {
        k.className = "div_title_cut_question";
    }
    if (ac) {
        k.className = "div_title_question_all";
    }
    if (f._isQingJing) {
        k.style.display = "none";
    }
    var o = $ce("div", "", k);
    var Z = f._title;
    if (M) {
        Z = replaceGapFill(Z, f);
    } else {
        if (E) {
            Z = Z || "请在此输入说明文字";
        }
    }
    var U = $ce("span", Z, o);
    if (O) {
        o.className = "div_title_page_question";
    } else {
        if (E && f._video) {
            var A = "<iframe height='498' width='510' src='" + f._video + "' frameborder=0 allowfullscreen></iframe>";
            B.div_video_title = $ce("div", A, o);
        } else {
            o.className = "div_title_question";
        }
    }
    B.get_div_title = function() {
        return U;
    };
    if (ac) {
        var ad = $ce("span", "&nbsp;*", o);
        B.setreqstatus = function() {
            ad.style.color = "red";
            ad.style.display = this.dataNode._requir ? "": "none";
            if (M) {
                if (this.checkTitle) {
                    this.checkTitle();
                }
                if (!EndGapReq) {
                    ad.style.display = "none";
                }
            }
            return ad;
        };
        B.setreqstatus();
        if (J) {
            var v = $ce("span", "", o);
            v.className = "font-a0";
            B.showMinMaxWord = function(ai, ag) {
                var al = this.dataNode;
                var ah = "";
                var aj = type_wd_words;
                var ak = type_wd_minlimit;
                if (al._verify == "数字" || al._verify == "小数") {
                    aj = "";
                    ak = type_wd_minlimitDigit;
                    ah = type_wd_digitfrom;
                }
                if (!isEmpty(ai) && !isEmpty(ag)) {
                    v.innerHTML = "&nbsp;（" + ah + ag + type_wd_to + ai + aj + "）";
                    v.style.display = "";
                } else {
                    if (!isEmpty(ai)) {
                        v.innerHTML = "&nbsp;（" + ai + type_wd_limit + "）";
                        if (al._verify == "数字" || al._verify == "小数") {
                            v.innerHTML = "&nbsp;（" + type_wd_maxlimitDigit + ai + "）";
                        }
                        v.style.display = "";
                    } else {
                        if (!isEmpty(ag)) {
                            v.innerHTML = "&nbsp;（" + ak + ag + aj + "）";
                            v.style.display = "";
                        } else {
                            v.style.display = "none";
                        }
                    }
                }
            };
            B.showMinMaxWord(f._maxword, f._minword);
            B.get_span_maxword = function() {
                return v;
            };
        }
        if (f._isCeShi && (J || m || b)) {
            var x = $ce("span", "", o);
            x.style.color = "#efa030";
            if (J) {
                B.setCeshiQTip = function() {
                    var ag = "答案：" + f._answer;
                    if (f._answer == "简答题无答案") {
                        ag = "无标准答案需人工评分";
                    }
                    x.innerHTML = "（" + ag + "，分值：" + f._ceshiValue + "分）";
                };
                B.setCeshiQTip();
            } else {
                x.innerHTML = "（分值：" + f._ceshiValue + "分）";
            }
            B.spanCeShi = x;
        }
        if (b || (d && _likertMode == "102")) {
            var ab = document.createElement("span");
            B.updateSpanCheck = function() {
                var aj = this.dataNode;
                if (aj._isShop) {
                    return;
                }
                aj._lowLimit = aj._lowLimit || "";
                aj._upLimit = aj._upLimit || "";
                var ag = type_check;
                if (d) {
                    ag = "多选题";
                }
                var ai = "";
                var ah = false;
                if (G) {
                    ai = "-1";
                }
                if (aj._lowLimit != ai && aj._upLimit != ai) {
                    if (aj._lowLimit == aj._upLimit) {
                        ab.innerHTML = "&nbsp;[" + type_check_limit1 + "<b>" + aj._lowLimit + "</b>" + type_check_limit5;
                    } else {
                        ab.innerHTML = "&nbsp;[" + type_check_limit1 + "<b>" + aj._lowLimit + "</b>-<b>" + aj._upLimit + "</b>" + type_check_limit5;
                    }
                    ah = true;
                } else {
                    if (aj._lowLimit != ai) {
                        ab.innerHTML = "&nbsp;[" + type_check_limit3 + "<b>" + aj._lowLimit + "</b>" + type_check_limit5;
                        ah = true;
                    } else {
                        if (aj._upLimit != ai) {
                            ab.innerHTML = "&nbsp;[" + type_check_limit4 + "<b>" + aj._upLimit + "</b>" + type_check_limit5;
                            ah = true;
                        } else {
                            if (!aj._isTouPiao) {
                                ab.innerHTML = "&nbsp;[" + ag;
                            }
                        }
                    }
                }
                if (G) {
                    if (ah) {
                        if (aj._lowLimit == "" || aj._lowLimit == aj._select.length - 1) {
                            ab.innerHTML = "&nbsp;[" + type_check_limit1 + "<b>" + type_order_all + "</b>" + type_check_limit5;
                        }
                        ab.innerHTML += type_order_limit_end;
                    } else {
                        ab.innerHTML = "&nbsp;[" + type_order;
                    }
                }
                if (!aj._isTouPiao) {
                    ab.innerHTML += "]";
                }
                ab.className = "qtypetip";
            };
            B.updateSpanCheck();
            o.appendChild(ab);
        } else {
            if (a) {
                var ab = $ce("span", "", o);
                B.updateSpanCheck = function() {
                    if (this.dataNode._tag == "301" && this.dataNode._minvalue !== "" && this.dataNode._maxvalue !== "") {
                        ab.innerHTML = "&nbsp;[输入" + this.dataNode._minvalue + "到" + this.dataNode._maxvalue + "的数字]";
                        ab.className = "qtypetip";
                    } else {
                        ab.innerHTML = "";
                    }
                    ab.style.display = this.dataNode._tag == "301" ? "": "none";
                };
                B.updateSpanCheck();
            }
        }
        if (d) {
            if (f._tag == "102" || f._tag == "103") {
                var n = $ce("span", "", o);
                B.updateSpanMatrix = function() {
                    if (f._daoZhi) {
                        var ag = "竖向单选";
                        if (f._tag == "102") {
                            ag = "竖向多选";
                        }
                        n.innerHTML = "&nbsp;[" + ag + "]";
                        n.className = "qtypetip";
                    } else {
                        n.innerHTML = "";
                    }
                };
                B.updateSpanMatrix();
            }
        }
    }
    var T = $ce("div", "", k);
    T.style.clear = "both";
    K.appendChild(k);
    if (ac) {
        var u = document.createElement("div");
        u.className = "div_table_radio_question";
        var p = $ce("div", "", u);
        p.className = "div_table_clear_top";
        K.appendChild(u);
        if (f._isQingJing) {
            u.style.paddingLeft = "0";
        }
    }
    if (J) {
        var y = control_textarea("1", "50");
        u.appendChild(y);
        var I = null;
        var ae = document.createElement("span");
        u.appendChild(ae);
        ae.style.display = "none";
        I = document.createElement("span");
        I.className = "design-icon design-date";
        u.appendChild(I);
        I.style.display = "none";
        y.style.overflow = "auto";
        if (f._verify != "省市区" && f._verify != "高校") {
            y.value = f._default;
        } else {
            if (f._default) {
                y.value = "指定省份为：" + f._default;
            }
        }
        B.showTextAreaUnder = function() {
            y.className = this.dataNode._underline ? "underline": "inputtext";
        };
        B.showTextAreaWidth = function() {
            if (isEmpty(this.dataNode._width)) {
                y.style.width = "62%";
            } else {
                y.style.width = this.dataNode._width + "px";
                y.style.display = this.dataNode._width == 1 ? "none": "";
            }
        };
        B.showTextAreaHeight = function() {
            y.style.height = this.dataNode._height * 22 + "px";
        };
        B.showSmsVerify = function() {
            if (!this.divsms) {
                var ag = $ce("div", "", u);
                ag.style.marginTop = "15px";
                ag.innerHTML = "<a href='javascript:void(0);' style='padding:5px 6px;height:20px;border:1px solid #ccc;background:#eeeeee;display:inline-block;color:#555;font-size:12px;float:left;'>发送验证短信</a><textarea style='text-align:center;width:66px;height:26px;line-height:26px;display:inline-block;border:1px solid #ccc;border-left:none;float:left;overflow:auto;tabindex:-1;' placeholder='验证码'></textarea><div class='divclear'></div>";
                this.divsms = ag;
            }
            this.divsms.style.display = (this.dataNode._verify == "手机" && this.dataNode._needsms) ? "": "none";
        };
        B.showTextAreaDate = function() {
            var ag = this.dataNode._verify;
            y.onclick = null;
            if (ag == "日期" || ag == "生日" || ag == "入学时间") {
                y.style.width = "100px";
                y.style.height = "22px";
                I.style.display = "";
                ae.style.display = "none";
            } else {
                if (ag == "数字" || ag == "小数") {
                    y.style.width = "150px";
                    y.style.height = "22px";
                    I.style.display = "none";
                    ae.style.display = "none";
                } else {
                    if (ag == "城市单选" || ag == "城市多选" || ag == "省市区" || ag == "高校" || ag == "多级下拉") {
                        var aj = "100px";
                        var ai = 1;
                        if (ag == "城市多选") {
                            aj = "400px";
                            ai = 2;
                        } else {
                            if (ag == "省市区") {
                                aj = "250px";
                                ai = 3;
                            } else {
                                if (ag == "高校") {
                                    aj = "250px";
                                    ai = 4;
                                } else {
                                    if (ag == "多级下拉") {
                                        aj = "400px";
                                        ai = 5;
                                    }
                                }
                            }
                        }
                        y.style.width = aj;
                        y.style.height = "22px";
                        y.onclick = function() {
                            openCityBox(this, ai, null, 9);
                        };
                        ae.innerHTML = "&nbsp;<img src='/Images/Mysojump/QuestionnaireMng/Design/city.gif' alt=''/>";
                        ae.style.display = "";
                        var ah = $$("img", ae)[0];
                        ah.onclick = function() {
                            openCityBox(y, ai, null, 9);
                        };
                        I.style.display = "none";
                    } else {
                        I.style.display = "none";
                        ae.style.display = "none";
                        this.showTextAreaWidth();
                        this.showTextAreaHeight();
                    }
                }
            }
        };
        B.showTextAreaUnder();
        B.showTextAreaWidth();
        B.showTextAreaHeight();
        B.showTextAreaDate();
        if (B.dataNode._needsms) {
            B.showSmsVerify();
        }
        B.get_textarea = function() {
            return y;
        };
    }
    if (X) {
        var t = $ce("div", "", u);
        var j = $ce("div", "请选择上传文件", u);
        B.updateFileUpload = function() {
            var ah = f._maxsize;
            var al = "";
            if (ah % 1024 == 0) {
                al = "（不超过" + (ah / 1024) + "M）";
            } else {
                al = "（不超过" + ah + "KB）";
            }
            var am = getIEVersion();
            var aj = am && (!document.documentMode || document.documentMode < 8);
            var ai = am <= 7 || aj;
            var ak = "position:relative;";
            if (ai) {
                ak = "";
            }
            var ag = '<div style="width: 200px;height: 30px; background:#fff;' + ak + ' text-align: center; line-height: 30px; overflow: hidden;border:1px solid #7F9DB9;color:#333;margin-bottom:5px;">选择文件' + al;
            if (!ai) {
                ag += '<input type="file" style="position: absolute;left: 0;top: 0;height: 30px; filter:alpha(opacity=0);opacity:0; background-color: transparent;width:200px; font-size:180px;"/>';
            }
            ag += "</div>";
            t.innerHTML = ag;
            if (f._ext) {
                j.innerHTML = "请选择上传文件，扩展名为" + f._ext;
            } else {
                j.innerHTML = "请选择上传文件，扩展名为" + defaultFileExt;
            }
        };
        B.updateFileUpload();
    }
    if (M) {}
    if (H) {
        var N = $ce("span", f._minvaluetext || "", u);
        N.className = "spanLeft";
        N.style.color = "red";
        B.get_span_min_value_text = function() {
            return N;
        };
        var e = $ce("span", "(" + (f._minvalue || 0) + ")", u);
        e.className = "spanLeft";
        e.style.color = "red";
        B.get_span_min_value = function() {
            return e;
        };
        var z = $ce("span", "(" + (f._maxvalue || 100) + ")", u);
        z.className = "spanRight";
        z.style.color = "red";
        B.get_span_max_value = function() {
            return z;
        };
        var C = $ce("span", f._maxvaluetext || "", u);
        C.className = "spanRight";
        C.style.color = "red";
        B.get_span_max_value_text = function() {
            return C;
        };
        $ce("div", "", u).className = "divclear";
        var I = control_image("/Images/WJX/JoinQuestionnaire/slider1.jpg");
        I.style.width = "10px";
        var Y = control_image("/Images/WJX/JoinQuestionnaire/sliderEnd.jpg");
        Y.style.width = "97%";
        Y.style.height = "23px";
        u.appendChild(I);
        u.appendChild(Y);
        $ce("div", "", u).className = "divclear";
        u.style.width = "60%";
        var y = control_textarea("1", "10");
        y.style.display = "none";
    }
    if (R) {
        B.createSum = function() {
            var am = new StringBuilder();
            am.append("<div  class='div_table_clear_top'></div>");
            if (this._referDivQ) {
                am.append("此题行标题来源于第" + this._referDivQ.dataNode._topic + "题的选中项");
            } else {
                am.append("<table style='width:100%;' border='0px'  cellpadding='5' cellspacing='0'>");
                var ai = "";
                var ag = "";
                am.append("<tbody>");
                var al = new Array();
                al = trim(f._rowtitle).split("\n");
                var ak = "";
                for (var ah = 0; ah < al.length; ah++) {
                    if (ah == al.length - 1) {
                        ai = "";
                        ag = "";
                    }
                    if (al[ah].length > 4 && al[ah].substring(0, 4) == "【标签】") {
                        var aj = al[ah].substring(4);
                        am.append("<tr><th align='left'><b style='color:#0066ff;'>" + aj + "</b></th><td></td></tr>");
                        ak = "padding-left:10px;";
                        continue;
                    }
                    if (f._rowwidth == "") {
                        am.append("<tr><th align='left' style='" + ag + ak + "'>" + al[ah] + "</th>");
                    } else {
                        am.append("<tr><th align='left' style='width:" + f._rowwidth + ";" + ag + ak + "'>" + al[ah] + "</th>");
                    }
                    am.append("<td  " + ai + "align='left' width='36'><input  type='text' style='width:36px;'/></td>");
                    am.append("<td  " + ai + "align='left'><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:250px;height: 23px;'/></td>");
                    am.append("</tr>");
                }
                am.append("</tbody></table>");
            }
            am.append("<div style='margin-top:10px;'><span style='color:#666666;'>" + sum_hint + "</span></div>");
            u.innerHTML = am.toString("");
        };
        B.createSum();
    }
    if (l) {
        B.createTableRadio = function() {
            var at = this.dataNode;
            var am = at._isTouPiao;
            var ak = at._isCeShi;
            var ar = at._isCePing;
            var aZ = at._numperrow ? at._numperrow: 1;
            var aq = at._select;
            var aM = at._tag;
            var aL = null;
            if (am) {
                aL = new Array();
                var aF = aq.length - 1;
                var aj = 0;
                for (var a9 = 1; a9 <= aF; a9++) {
                    aj += a9;
                }
                for (var a9 = 1; a9 <= aF; a9++) {
                    aL[a9 - 1] = 100 / aj * a9;
                }
            }
            var aO = new StringBuilder();
            aO.append("<div  class='div_table_clear_top'></div>");
            if (this._referDivQ) {
                var bb = "选项";
                if (at._type == "matrix" || at.type == "sum") {
                    bb = "行标题";
                }
                aO.append("此题" + bb + "来源于第" + this._referDivQ.dataNode._topic + "题的选中项");
            } else {
                if (at._isQingJing) {
                    var ay = this.qingjing || 1;
                    if (ay >= aq.length) {
                        ay = 1;
                    }
                    aO.append("<div style='font-size:16px;color:#333;font-weight:bold;margin-top:10px;'>" + aq[ay]._item_title + "&nbsp;<a style='font-size:16px;cursor:pointer;' onclick='if(curover)curover.createTableRadio();'>切换场景</a></div>");
                    aO.append(aq[ay]._item_desc || "请设置情景说明");
                    ay++;
                    this.qingjing = ay;
                } else {
                    if (at._isShop) {
                        aO.append("<ul>");
                        for (var a9 = 1; a9 < aq.length; a9++) {
                            var aH = aq[a9]._item_title;
                            var a0 = aq[a9]._item_value;
                            var aJ = aq[a9]._item_img;
                            var aS = "";
                            if (a9 > 1 && a9 % 3 == 1) {
                                aS = " style='clear:both;'";
                            }
                            aO.append("<li class='shop-item' " + aS + ">");
                            if (aJ) {
                                aO.append("<div class='img_place'><img src='" + aJ + "' alt='' /></div>");
                            }
                            aO.append("<div class='text_place'>");
                            aO.append("<div class='item_name'>" + aH + "</div>");
                            aO.append('<p class="item_price">￥' + a0 + "</p>");
                            aO.append('<p class="item_select"><span class="operation remove">-</span><input class="operation itemnum" value="0" disabled="disabled"><span class="operation add">+</span></p>');
                            aO.append("</div><div class='divclear'></div></li>");
                        }
                        aO.append("</ul>");
                    } else {
                        if (h) {
                            aO.append("<select><option>" + type_radio_down + "</option>");
                            for (var a9 = 1; a9 < aq.length; a9++) {
                                if (aq[a9]._item_radio) {
                                    aO.append("<option selected='selected'>" + trim(aq[a9]._item_title) + "</option>");
                                } else {
                                    aO.append("<option>" + trim(aq[a9]._item_title) + "</option>");
                                }
                            }
                            aO.append("</select>");
                        }
                        if (m || (b && !G)) {
                            aO.append("<ul>");
                            var al;
                            var aQ = "%";
                            if (r) {
                                al = 40;
                                aQ = "px";
                                aZ = 1;
                            } else {
                                al = (100 / aZ) - 1;
                            }
                            var aE = false;
                            var ah = 1;
                            for (var a9 = 1; a9 < aq.length; a9++) {
                                if (af == "radio" && aM >= 1 && aM != 101 && a9 == 1) {
                                    var au = "0px";
                                    if (aM > 1 && aM != 6) {
                                        au = "5px";
                                    }
                                    aO.append("<li class='notchoice' style='padding-right:15px;padding-top:" + au + "'><b>" + aq[1]._item_title + "</b></li>");
                                    if (aM == "6") {
                                        aO.append("<li><ul class='onscore'>");
                                    }
                                }
                                if (m && aM > 1 && aM != 101) {
                                    var aB = "style='padding-left:3px;'";
                                    var bg = aq.length - 1;
                                    var ag = "design-icon design-off";
                                    var ba = "design-icon design-on";
                                    if (aM == "6") {
                                        var a6 = parseInt(355 / bg) - 2;
                                        if (a9 == aq.length - 1) {
                                            a6 += 355 % bg;
                                        }
                                        aB = "style='width:" + a6 + "px' ";
                                        ag = "off";
                                        ba = "on";
                                    }
                                    if (a9 == aq.length - 1) {
                                        aO.append("<li " + aB + " class='" + ag + at._tag + "'  >");
                                    } else {
                                        aO.append("<li " + aB + " class='" + ba + at._tag + "'  >");
                                    }
                                    if (aM == "6") {
                                        var aX = aq[a9]._item_value;
                                        if (aX == NoValueData) {
                                            aX = "&nbsp;";
                                        }
                                        aO.append(aX);
                                    }
                                    aO.append("</li>");
                                } else {
                                    if (aq[a9]._item_label) {
                                        if (aE) {
                                            aO.append("</ul></li>");
                                        }
                                        aO.append("<li style='width:100%;'><div><b>" + aq[a9]._item_label + "</b></div><ul>");
                                        aE = true;
                                        ah = 1;
                                    }
                                    if (aM == 101) {
                                        al = trim(aq[a9]._item_title).length * 14 + 28;
                                    }
                                    if (a9 == aq.length - 1 && aq[a9]._item_tb && !am) {
                                        aO.append("<li>");
                                    } else {
                                        aO.append("<li  style='width:" + al + aQ + ";'>");
                                    }
                                    if (!aq[a9]._item_img) {
                                        if (am) {
                                            aO.append("<div style='float:left;width:" + at._touPiaoWidth + "%;'>");
                                        } else {
                                            if (ak && aq[a9]._item_radio) {
                                                aO.append("<span style='color:#efa030;'>");
                                            }
                                        }
                                        if (m) {
                                            aO.append("<input type='radio'");
                                        } else {
                                            aO.append("<input type='checkbox'");
                                        }
                                        if (af == "radio" && aq[a9]._item_radio) {
                                            aO.append(" checked='checked'");
                                        }
                                        if (af == "check" && aq[a9]._item_radio) {
                                            aO.append(" checked='checked'");
                                        }
                                        if (af == "radio" && aM == 1) {
                                            var ax = trim(aq[a9]._item_value);
                                            if (ax == "-77777") {
                                                ax = "";
                                            }
                                            aO.append("/>" + ax);
                                        } else {
                                            aO.append("/>" + trim(aq[a9]._item_title));
                                        }
                                        if (am) {
                                            aO.append("</div>");
                                            aO.append("<div style='float:left;'>");
                                            addTouPiao(aO, at, aL, a9);
                                            aO.append("</div><div style='clear:both;'></div>");
                                        } else {
                                            if (ak && aq[a9]._item_radio) {
                                                aO.append("&nbsp;(正确答案)</span>");
                                            } else {
                                                if (ar) {
                                                    var aR = aq[a9]._item_value;
                                                    if (aR == NoValueData || aR == "") {
                                                        aR = "N/A";
                                                    }
                                                    aO.append("<span style='color:#efa030;'>&nbsp;(分值：" + aR + ")</span>");
                                                }
                                            }
                                        }
                                        if (at._hasjump && at._anytimejumpto < 1) {
                                            var ai = "跳转到下一题";
                                            if (aq[a9]._item_jump == "1") {
                                                ai = "结束作答";
                                            } else {
                                                if (aq[a9]._item_jump - 1 > 0) {
                                                    ai = "跳转到第" + aq[a9]._item_jump + "题";
                                                }
                                            }
                                            aO.append("<span style='color:#efa030;'>&nbsp;(" + ai + ")</span>");
                                        }
                                        if (aq[a9]._item_desc) {
                                            if (at._displayDesc) {
                                                var aN = "divDesc_" + at._topic + "_" + a9;
                                                aO.append("<div style='text-align:center;'><a class='link-U333' href='javascript:PDF_launch(\"" + aN + "\",400,400);'>点击查看详情</a></div><div id='" + aN + "' style='display:none;'><div style='padding:10px;'>" + aq[a9]._item_desc + "</div></div>");
                                            } else {
                                                aO.append("<div class='div_item_desc'>" + aq[a9]._item_desc + "</div>");
                                            }
                                        }
                                    } else {
                                        aO.append("<table cellpadding='0' cellspacing='0'><tr><td valign='top'>");
                                        if (m) {
                                            aO.append("<input type='radio'");
                                        } else {
                                            aO.append("<input type='checkbox'");
                                        }
                                        if (af == "radio" && aq[a9]._item_radio) {
                                            aO.append(" checked='checked'");
                                        }
                                        if (af == "check" && aq[a9]._item_radio) {
                                            aO.append(" checked='checked'");
                                        }
                                        if (af == "radio" && aM == 1) {
                                            aO.append("'/>" + trim(aq[a9]._item_value));
                                        } else {
                                            aO.append("'/>");
                                        }
                                        aO.append("</td><td>");
                                        if (aq[a9]._item_imgtext) {
                                            aO.append("<div style='text-align:center;'><img src='" + aq[a9]._item_img + "' alt='' />");
                                            aO.append(trim(aq[a9]._item_title));
                                            aO.append("</div></td>");
                                        } else {
                                            aO.append("<div><img src='" + aq[a9]._item_img + "' alt='' /></div></td>");
                                        }
                                        aO.append("</tr>");
                                        if (aq[a9]._item_desc) {
                                            aO.append("<tr><td></td><td>");
                                            if (at._displayDesc) {
                                                var aN = "divDesc_" + at._topic + "_" + a9;
                                                aO.append("<div style='text-align:center;'><a class='link-U333' href='javascript:PDF_launch(\"" + aN + "\",400,400);'>点击查看详情</a></div><div id='" + aN + "' style='display:none;'><div style='padding:10px;'>" + aq[a9]._item_desc + "</div></div>");
                                            } else {
                                                aO.append("<div class='div_item_desc'>" + aq[a9]._item_desc + "</div>");
                                            }
                                            aO.append("</td></tr>");
                                        }
                                        if (am) {
                                            aO.append("<tr><td></td><td align='center'>");
                                            addTouPiao(aO, at, aL, a9);
                                            aO.append("</td></tr>");
                                        }
                                        aO.append("</table>");
                                    }
                                    if (aq[a9]._item_tb) {
                                        aO.append(" <input type='text' class='underline' style='color:#999999;' value='" + defaultOtherText + "'/>");
                                    }
                                    if (aq[a9]._item_tbr) {
                                        aO.append(" <span style='color: red;'> *</span>");
                                    }
                                    aO.append("</li>");
                                }
                                if (m && aM >= 1 && aM != 101 && a9 == aq.length - 1) {
                                    var au = "0px";
                                    if (aM > 1 && aM != 6) {
                                        au = "5px";
                                    }
                                    if (aM == 6) {
                                        aO.append("</ul></li>");
                                    }
                                    aO.append("<li  class='notchoice'  style='padding-left:15px;padding-top:" + au + "'><b>" + aq[aq.length - 1]._item_title + "</b></li>");
                                }
                                if (aZ > 1 && ah % aZ == 0) {
                                    aO.append("<div style='clear:both;'></div></ul><ul>");
                                }
                                ah++;
                            }
                            aO.append("<div style='clear:both;'></div></ul>");
                            if (aE) {
                                aO.append("</li></ul>");
                            }
                        }
                        if (G) {
                            aO.append("<div style='width:90%;'><ul style='float:left;'>");
                            var al;
                            al = 100 / aZ;
                            for (var a9 = 1; a9 < aq.length; a9++) {
                                aO.append("<li style='float:none;'><input type='checkbox' />" + trim(aq[a9]._item_title) + "</li>");
                            }
                            aO.append("</ul>");
                            var aK;
                            if (trim(at._lowLimit) == "") {
                                aK = aq.length - 1;
                            } else {
                                aK = trim(at._lowLimit);
                            }
                            if (aK < 6) {
                                aK = 6;
                            }
                            var a2 = aK * 20 + "px";
                            aO.append("<table style='float:left;'><tr><td verticalAlign='center'><div style='margin-left:10px;'><select size='" + aK + "' style='width:200px;height:" + a2 + ";'></select></div>");
                            aO.append("</td><td verticalAlign='center'><div class='qButton'><ul><li><a><span class='design-icon design-first'></span><span>" + type_order_goTop + "</span></a></li><li><a><span class='design-icon design-up'></span><span>" + type_order_upMove + "</span></a></li>");
                            aO.append("<li style='margin-top:10px;'><a><span class='design-icon design-down'></span><span>" + type_order_downMove + "</span></a></li><li><a><span class='design-icon design-last'></span><span>" + type_order_goBottom + "</span></a></li></ul></div></td></tr></table>");
                            aO.append("<div style='clear:both;' ></div></div>");
                        }
                        if (d) {
                            var aw = at._daoZhi;
                            var a5 = "100%";
                            if (at._mainWidth) {
                                a5 = at._mainWidth + "%";
                            }
                            aO.append("<table style='width:" + a5 + ";' border='0px'  cellpadding='5' cellspacing='0'>");
                            var aA = "";
                            var av = "";
                            var bf = "radio";
                            var aV = new Array();
                            aV = trim(at._rowtitle).split("\n");
                            var aU = trim(at._rowtitle2).split("\n");
                            var aT = trim(at._rowtitle2) ? true: false;
                            var aY = false;
                            var ap = "";
                            if ((aM == 0) || (aM > 100 && aM < 200) || aM > 300) {
                                aO.append("<thead><tr><th></th>");
                                if (aM > 300) {
                                    var be = trim(at._columntitle).split("\n");
                                    for (var a9 = 0; a9 < be.length; a9++) {
                                        aO.append("<td align='center'>" + trim(be[a9]) + "</td>");
                                    }
                                } else {
                                    if (aw) {
                                        for (var a9 = 0; a9 < aV.length; a9++) {
                                            if (aV[a9].length > 4 && aV[a9].substring(0, 4) == "【标签】") {
                                                continue;
                                            }
                                            aO.append("<td align='center'>" + trim(aV[a9]) + "</td>");
                                        }
                                    } else {
                                        for (var a9 = 1; a9 < aq.length; a9++) {
                                            aO.append("<td align='center'>" + trim(aq[a9]._item_title) + "</td>");
                                        }
                                    }
                                }
                                av = "border-bottom:1px solid #efefef;";
                                aA = "style='" + av + "'";
                                aO.append("</tr></thead>");
                                if (aM == 102) {
                                    bf = "checkbox";
                                }
                            }
                            if (aM == 301) {
                                bf = "text";
                            }
                            aO.append("<tbody>");
                            if (aM == "202") {
                                var bc = at._minvalue;
                                var aP = at._maxvalue;
                                var an = " width='60%'";
                                var a1 = "70";
                                if (aT) {
                                    an = "";
                                    a1 = "90";
                                }
                                aO.append("<tr><th></th><td align='left' width='410'><table width='100%'><tr><td " + an + "><div style='width:" + a1 + "%'><div style='float:left;color:red;'>" + bc + "</div><div style='float:right;color:red;'>" + aP + "</div><div style='clear:both;'></div></div></td></tr></table></td><th></th>");
                            }
                            if (!aw) {
                                var a3 = 0;
                                var aW = false;
                                var aI = "";
                                for (var a9 = 0; a9 < aV.length; a9++) {
                                    if (a9 == aV.length - 1) {
                                        aA = "";
                                        av = "";
                                    }
                                    if (aV[a9].length > 4 && aV[a9].substring(0, 4) == "【标签】") {
                                        var a8 = aV[a9].substring(4);
                                        aO.append("<tr class='labelname'><th align='left'><b>" + a8 + "</b></th><td colspan='" + aq.length + "'></td>");
                                        aO + "</tr>";
                                        aY = true;
                                        ap = "padding-left:20px;";
                                        aW = !aW;
                                        continue;
                                    }
                                    if (at._rowwidth == "") {
                                        aO.append("<tr><th align='left' style='" + av + ap + "'>" + aV[a9] + "</th>");
                                    } else {
                                        aO.append("<tr><th align='left' style='width:" + at._rowwidth + ";" + av + ap + "'>" + aV[a9] + "</th>");
                                    }
                                    if (aM < 100 && aM) {
                                        aO.append("<td>");
                                        aO.append("<ul");
                                        if (aM == 6) {
                                            aO.append(" class='onscore'");
                                        }
                                        aO.append(">");
                                    }
                                    if (aM > 200 && aM < 300) {
                                        if (aM == 201) {
                                            var az = at._rowVerify && at._rowVerify[a9] ? at._rowVerify[a9]._verify: "";
                                            var aG = "";
                                            var ao = at._rowVerify && at._rowVerify[a9] ? at._rowVerify[a9]._width: "";
                                            if (ao) {
                                                ao = "width:" + ao + "%";
                                            }
                                            if (az == "日期") {
                                                aG = "<span class='design-icon design-date'></span>";
                                            } else {
                                                if (az == "城市单选" || az == "城市多选" || az == "省市区" || az == "高校") {
                                                    aG = "&nbsp;<img src='/Images/Mysojump/QuestionnaireMng/Design/city.gif' alt=''/>";
                                                }
                                            }
                                            aO.append("<td  " + aA + "align='left'><textarea class='inputtext' style='overflow:auto;height:22px;" + ao + "'></textarea>" + aG + "</td>");
                                        } else {
                                            if (aM == 202) {
                                                var an = " width='60%'";
                                                var a1 = "70";
                                                if (aT) {
                                                    an = "";
                                                    if (!at._rowwidth2) {
                                                        an = " width='30%'";
                                                    }
                                                    a1 = "90";
                                                }
                                                aO.append("<td  " + aA + "align='left' " + an + "><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:" + a1 + "%;height: 23px;'/></td>");
                                            }
                                        }
                                    } else {
                                        if (aM > 300) {
                                            var bd = "";
                                            if (aM == "303") {
                                                bd += "<select><option>" + type_radio_down + "</option>";
                                                for (var a4 = 1; a4 < aq.length; a4++) {
                                                    bd += "<option>" + trim(aq[a4]._item_title) + "</option>";
                                                }
                                                bd += "</select>";
                                            }
                                            var be = trim(at._columntitle).split("\n");
                                            var aC = Number(300 / be.length);
                                            for (var a7 = 0; a7 < be.length; a7++) {
                                                if (aM == "303") {
                                                    aO.append("<td  " + aA + "align='center'>" + bd + "</td>");
                                                } else {
                                                    if (aM == "301") {
                                                        aC = "30";
                                                    }
                                                    aO.append("<td  " + aA + "align='center'><textarea class='inputtext' type='text' style='overflow:auto;height:22px;width:" + aC + "px;'></textarea></td>");
                                                }
                                            }
                                        } else {
                                            for (var a7 = 1; a7 < aq.length; a7++) {
                                                if (aM > 100 || aM == 0) {
                                                    aO.append("<td  " + aA + "align='center'><input  type='" + bf + "'/>");
                                                    if ((aM == 102 || aM == 103 || aM == 101) && aq[a7]._item_tb) {
                                                        aO.append("<input type='text' value='" + defaultOtherText + "' style='color:#999999;width:70px;' class='underline'/> ");
                                                        if (aq[a7]._item_tbr) {
                                                            aO.append(" <span style='color: red;'> *</span>");
                                                        }
                                                    }
                                                    aO.append("</td>");
                                                } else {
                                                    var aB = "style='padding-left:3px;'";
                                                    var bg = aq.length - 1;
                                                    var ag = "design-icon design-off";
                                                    var ba = "design-icon design-on";
                                                    if (aM == "6") {
                                                        var a6 = parseInt(355 / bg) - 2;
                                                        if (a7 == aq.length - 1) {
                                                            a6 += 355 % bg;
                                                        }
                                                        aB = "style='width:" + a6 + "px' ";
                                                        ag = "off";
                                                        ba = "on";
                                                    }
                                                    if (a7 == aq.length - 1) {
                                                        aO.append("<li " + aB + " class='" + ag + aM + "'>");
                                                    } else {
                                                        aO.append("<li " + aB + " class='" + ba + at._tag + "'>");
                                                    }
                                                    if (aM == "6") {
                                                        var aX = aq[a7]._item_value;
                                                        if (aX == NoValueData) {
                                                            aX = "&nbsp;";
                                                        }
                                                        aO.append(aX);
                                                    }
                                                    aO.append("</li>");
                                                }
                                            }
                                        }
                                    }
                                    if (aM < 100 && aM) {
                                        aO.append("</ul></td>");
                                    }
                                    var aD = "";
                                    if (a3 < aU.length) {
                                        aD = aU[a3];
                                    }
                                    if (at._rowwidth2 == "") {
                                        aO.append("<th " + aA + ">" + aD + "</th>");
                                    } else {
                                        aO.append("<th style='width:" + at._rowwidth2 + ";" + av + "'>" + aD + "</th>");
                                    }
                                    aO.append("</tr>");
                                    aW = !aW;
                                    a3++;
                                }
                            } else {
                                for (var a9 = 1; a9 < aq.length; a9++) {
                                    if (a9 == aq.length - 1) {
                                        aA = "";
                                        av = "";
                                    }
                                    if (at._rowwidth == "") {
                                        aO.append("<tr><th align='left' style='" + av + ap + "'>" + trim(aq[a9]._item_title) + "</th>");
                                    } else {
                                        aO.append("<tr><th align='left' style='width:" + at._rowwidth + ";" + av + ap + "'>" + trim(aq[a9]._item_title) + "</th>");
                                    }
                                    for (var a7 = 0; a7 < aV.length; a7++) {
                                        if (aV[a7].length > 4 && aV[a7].substring(0, 4) == "【标签】") {
                                            continue;
                                        }
                                        aO.append("<td  " + aA + "align='center'><input  type='" + bf + "'/></td>");
                                    }
                                    aO.append("</tr>");
                                }
                            }
                            aO.append("</tbody></table>");
                        }
                    }
                }
            }
            aO.append("<div class='div_table_clear_bottom'></div>");
            u.innerHTML = aO.toString("");
        };
        B.createTableRadio(true);
    }
    if (ac) {
        var P = document.createElement("div");
        P.className = "div_ins_question";
        P.innerHTML = f._ins ? subjectInfo + f._ins: "";
        K.appendChild(P);
        B.get_div_ins = function() {
            return P;
        };
    }
    var S = $ce("div", "", K);
    S.style.height = "18px";
    S.className = "spanLeft";
    if (ac) {
        var Q = document.createElement("div");
        Q.className = "div_ins_question spanLeft";
        Q.style.clear = "none";
        S.appendChild(Q);
        B.set_jump_ins = function() {
            var ag = "*" + jump_info;
            Q.style.display = this.dataNode._hasjump ? "": "none";
            if (this.dataNode._hasjump) {
                if (this.dataNode._anytimejumpto < 1) {} else {
                    if (this.dataNode._anytimejumpto == "1") {
                        ag += "<span style='color:#ff6600;'>(结束作答)</span>";
                    } else {
                        ag += "<span style='color:#ff6600;'>(跳转到第" + this.dataNode._anytimejumpto + "题)</span>";
                    }
                }
            }
            Q.innerHTML = ag;
        };
        B.set_jump_ins();
    }
    if (ac || E) {
        var c = document.createElement("div");
        c.className = "div_ins_question spanLeft";
        c.style.clear = "none";
        c.innerHTML = "";
        B.getRelation = function() {
            var ai = this.dataNode._relation;
            if (!ai) {
                return;
            }
            var ao = ai.split(",");
            var ap = "依赖于第" + ao[0] + "题的第" + ao[1] + "个选项";
            var at = getDataNodeByTopic(ao[0]);
            if (!at) {
                return;
            }
            if (WjxActivity._use_self_topic) {
                var au = at._title.match(/^\s*\d+[\.\-\_\(\/]?\d+?\)?/);
                if (au) {
                    ap = "依赖于第" + au + "题的第" + ao[1] + "个选项";
                }
            }
            var aj = "";
            var ag = ao[1].split(";");
            var ak = "选择";
            var ah = "";
            if (ag.length > 1) {
                ah = "中的任何一个选项";
            }
            for (var al = 0; al < ag.length; al++) {
                var aq = ag[al];
                if (aq - 0 < 0) {
                    aq = aq * -1;
                    ak = "没有选择";
                }
                if (at._select && at._select[aq]) {
                    if (aj) {
                        aj += "；";
                    }
                    aj += at._select[aq]._item_title;
                } else {
                    return;
                }
            }
            var am = at._topic + ".";
            if (WjxActivity._use_self_topic) {
                am = "";
            }
            var ar = "当题目“" + am + at._title + "”" + ak + "“" + aj + "”" + ah + "时，此题才显示";
            var an = new Array();
            an.push(ap);
            an.push(ar);
            return an;
        };
        c.style.display = f._relation ? "": "none";
        var V = B.getRelation();
        if (V) {
            c.innerHTML = V[0];
            c.title = V[1];
        }
        S.appendChild(c);
        B.RelationIns = c;
    }
    if (f._relation == "0") {
        B.style.display = "none";
    }
    var L = document.createElement("div");
    L.className = "div_ins_question spanLeft";
    L.innerHTML = "<a href='javascript:void(0);' onclick='insertQ(curover);' class='link-UF90' style='text-decoration:underline;'>在此题后插入新题</a>";
    L.style.clear = "none";
    L.style.visibility = "hidden";
    K.appendChild(L);
    B.divInsertOp = L;
    var aa = document.createElement("div");
    aa.className = "spanRight";
    aa.style.clear = "none";
    K.appendChild(aa);
    B.divTableOperation = aa;
    if (f._hasjump || f._relation) {
        B.divTableOperation.style.visibility = "";
    }
    $ce("div", "", K).style.clear = "both";
    if (O || E) {
        $ce("div", "", K).style.clear = "both";
    }
    cancelInputClick(B);
    return B;
}
function cancelInputClick(c) {
    var d = c.div_question_preview;
    var a = $$("input", d);
    for (var b = 0; b < a.length; b++) {
        a[b].onclick = function() {
            if (this.checked) {
                this.checked = false;
                return false;
            }
        };
        a[b].onkeydown = function() {
            this.value = "";
            return false;
        };
    }
}
var needCheckLeave = true;
window.onbeforeunload = function() {
    finishEditing();
};
window.onunload = function() {
    if (needCheckLeave) {
        if (confirm("您要保存对此问卷所做的更改吗？")) {
            save_paper("edit", true, true);
            alert("问卷保存成功！您登录问卷星后即可再次修改或者发布！");
        }
    }
};
function windowGotoUrl(a) {
    needCheckLeave = false;
    window.location.href = a;
}
function chkAutoSave_Click(a) {}
function returnOld() {
    if (window.confirm("确认使用旧版编辑界面吗？")) {
        save_paper("old", true);
    }
}
var havereturn = false;
var timeoutTimer = null;
var errorTimes = 0;
function processError() {
    if (!havereturn) {
        havereturn = true;
        errorTimes++;
        var a = "网络异常，可能是您电脑上的防火墙拦截了保存的问卷数据，请关闭防火墙试试！";
        saveClient();
        show_status_tip(a, 0);
    }
    if (timeoutTimer) {
        clearTimeout(timeoutTimer);
    }
}
function saveClient() {
    try {
        if (window.localStorage && sendStr) {
            window.localStorage.setItem("lastsavedata" + activityID, sendStr);
        }
    } catch(a) {}
}
function removeClient() {
    try {
        if (window.localStorage) {
            window.localStorage.removeItem("lastsavedata" + activityID);
        }
    } catch(a) {}
}
var sendStr = "";
var hasLogicNotify = false;
var saveNotifyText = "";
function save_paper(c, Y, I) {
    if (c != "init" && questionHolder.length == 0) {
        show_status_tip("您还未添加题目！", 3000);
        return false;
    }
    show_status_tip("正在保存，请耐心等候...", 0);
    if (c != "init" && !save_paper_validate(Y)) {
        return false;
    }
    var Q = document.getElementById("paper_attr_title");
    var s = document.getElementById("paper_attr_desc");
    var ak = new Array();
    ak[0] = new Object();
    ak[0]._title = Q.value;
    ak[0]._tag = s.value;
    ak[0]._display_part = false;
    ak[0]._display_part_num = 0;
    ak[0]._partset = "";
    ak[0]._random_mode = WjxActivity._random_mode;
    if (ak[0]._random_mode == "3") {
        ak[0]._partset = WjxActivity._partset;
        var x = WjxActivity._partset.split(",");
        var w = "";
        var d = true;
        for (var ah = 0; ah < x.length; ah++) {
            var ai = x[ah].split(";");
            var S = parseInt(ai[0]);
            var ab = parseInt(ai[1]);
            var af = getPageQCount()[S];
            var W = af + ":" + ab;
            if (!w) {
                w = W;
            } else {
                if (w != W) {
                    d = false;
                }
            }
        }
        if (x.length < 2) {
            d = false;
        }
        if (d) {
            ak[0]._partset += "|true";
        }
    } else {
        if (ak[0]._random_mode == "4") {
            ak[0]._partset = WjxActivity._partset;
        }
    }
    ak[0]._display_part = WjxActivity._display_part;
    ak[0]._display_part_num = WjxActivity._display_part_num;
    ak[0]._random_begin = WjxActivity._random_begin;
    ak[0]._random_end = WjxActivity._random_end;
    ak[1] = firstPage.dataNode;
    var Z = false;
    var L = false;
    var H = false;
    var F = 1;
    var n = 2;
    for (var ah = 0; ah < questionHolder.length; ah++) {
        if (questionHolder[ah].checkValid && questionHolder[ah].checkValid() == false) {
            ak[ah + 2] = questionHolder[ah].validate();
        }
        ak[ah + 2] = questionHolder[ah].dataNode;
        var am = ak[ah + 2]._type;
        if (am == "page") {
            if (ak[ah + 2]._topic != n) {
                ak[ah + 2]._topic = n;
            }
            n++;
        } else {
            if (am != "cut") {
                if (ak[ah + 2]._topic != F) {
                    ak[ah + 2]._topic = F;
                }
                F++;
            }
        }
        if (ak[ah + 2]._hasjump) {
            L = true;
        }
        var A = ak[ah + 2]._relation;
        if (A && A != "0") {
            var T = A.split(",");
            var C = true;
            H = true;
            var K = T[0];
            var k = T[1].split(";");
            var m = getDataNodeByTopic(K);
            var U = false;
            if (am == "cut" && m) {
                var al = getDivIndex(K);
                if (al < ah) {
                    U = true;
                }
            } else {
                U = m && ak[ah + 2]._topic - K > 0;
            }
            if (U) {
                var M = m._select;
                var am = m._type;
                if (am == "radio" || am == "radio_down" || am == "check") {
                    for (var O = 0; O < k.length; O++) {
                        var h = k[O];
                        if (h == 0 || h >= M.length) {
                            C = false;
                        }
                    }
                } else {
                    C = false;
                }
            } else {
                C = false;
            }
            if (!C) {
                ak[ah + 2]._relation = "";
            }
        }
        ak[ah + 2]._referTopic = "";
        ak[ah + 2]._referedTopics = "";
        if (questionHolder[ah]._referDivQ) {
            ak[ah + 2]._referTopic = questionHolder[ah]._referDivQ.dataNode._topic;
            Z = true;
        }
        if (questionHolder[ah]._referedArray) {
            ak[ah + 2]._referedTopics = "";
            for (var P = 0; P < questionHolder[ah]._referedArray.length; P++) {
                if (P > 0) {
                    ak[ah + 2]._referedTopics += ",";
                }
                ak[ah + 2]._referedTopics += questionHolder[ah]._referedArray[P].dataNode._topic;
            }
        }
    }
    saveNotifyText = "";
    if (ak[0]._random_mode != "0") {
        var u = "";
        var aa = false;
        if (L) {
            u = "跳题逻辑";
            aa = true;
        } else {
            if (Z) {
                u = "引用逻辑";
                aa = true;
            } else {
                if (H) {
                    u = "关联逻辑";
                    aa = true;
                }
            }
        }
        if (aa) {
            var y = "此问卷包含" + u + "，设置随机逻辑可能会导致" + u + "失效，请注意检查！";
            if (!hasLogicNotify && c != "init") {
                alert(y);
                hasLogicNotify = true;
            }
            saveNotifyText = y;
        }
    }
    var G = 0;
    for (var ah = 1; ah < ak.length; ah++) {
        if (ak[ah]._type == "page") {
            G++;
        }
    }
    ak[0]._total_page = G;
    var l = new StringBuilder();
    var ag = false;
    var b = false;
    var v = false;
    var r = false;
    var D = false;
    var a = ak[0]._title + "§" + ak[0]._tag + "§" + ak[0]._random_begin + "§" + ak[0]._random_end + "§" + ak[0]._random_mode + "§" + WjxActivity._use_self_topic;
    if ((ak[0]._random_mode == "1" || ak[0]._random_mode == "2") && ak[0]._display_part) {
        a += "§" + ak[0]._display_part + "§" + ak[0]._display_part_num;
    } else {
        if (ak[0]._random_mode == "3" || ak[0]._random_mode == "4") {
            a += "§" + ak[0]._partset + "§";
        } else {
            a += "§§";
        }
    }
    a += "§" + designversion;
    for (var ah = 1; ah < ak.length; ah++) {
        switch (ak[ah]._type) {
            case "question":
                var A = ak[ah]._relation || "";
                var N = ak[ah]._needOnly;
                if (ak[ah]._needsms) {
                    N += "〒" + ak[ah]._needsms;
                }
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._topic + "§" + ak[ah]._title + "〒" + ak[ah]._keyword + "〒" + A + "§" + ak[ah]._tag + "§" + ak[ah]._height + "§" + ak[ah]._maxword + "§" + ak[ah]._requir + "§" + ak[ah]._norepeat + "§" + ak[ah]._default + "§" + ak[ah]._ins + "§" + ak[ah]._hasjump + "§" + ak[ah]._anytimejumpto + "§" + ak[ah]._verify + "§" + N + "§" + ak[ah]._hasList + "§" + ak[ah]._listId + "§" + ak[ah]._width + "§" + ak[ah]._underline + "§" + ak[ah]._minword);
                if (ak[ah]._isCeShi) {
                    l.append("§" + ak[ah]._ceshiValue + "〒" + ak[ah]._answer + "〒" + ak[ah]._ceshiDesc + "〒" + ak[ah]._include);
                    r = true;
                } else {
                    if (ak[ah]._verify == "多级下拉") {
                        l.append("§" + (ak[ah]._levelData || ""));
                    }
                }
                break;
            case "gapfill":
                var A = ak[ah]._relation || "";
                var aj = getGapFillCount(ak[ah]._title);
                var q = ak[ah]._useTextBox ? "true": "";
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._topic + "§" + ak[ah]._title + "〒" + ak[ah]._keyword + "〒" + A + "§" + ak[ah]._tag + "§" + ak[ah]._requir + "§" + aj + "§" + ak[ah]._ins + "§" + ak[ah]._hasjump + "§" + ak[ah]._anytimejumpto);
                l.append("§");
                if (ak[ah]._rowVerify) {
                    for (var e = 0; e < aj; e++) {
                        if (e > 0) {
                            l.append("〒");
                        }
                        if (!ak[ah]._rowVerify[e]) {
                            continue;
                        }
                        var p = ak[ah]._rowVerify[e];
                        l.append(p._verify || "");
                        if (p._verify == "指定选项") {
                            l.append("¦");
                            l.append(p._choice || "");
                        } else {
                            l.append(",");
                            l.append(p._minword || "");
                            l.append(",");
                            l.append(p._maxword || "");
                        }
                        if (ak[ah]._isCeShi) {
                            l.append(",");
                            l.append(p._ceshiValue || "1");
                            l.append(",");
                            var X = p._answer || "";
                            X = X.replace(/,/g, "，");
                            l.append(X);
                            l.append(",");
                            var ad = p._ceshiDesc || "";
                            ad = ad.replace(/,/g, "，");
                            l.append(ad);
                            l.append(",");
                            l.append(p._include);
                        }
                    }
                }
                l.append("§");
                l.append(q);
                if (ak[ah]._isCeShi) {
                    l.append("§1");
                    r = true;
                }
                break;
            case "slider":
                var A = ak[ah]._relation || "";
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._topic + "§" + ak[ah]._title + "〒" + ak[ah]._keyword + "〒" + A + "§" + ak[ah]._tag + "§" + ak[ah]._requir + "§" + ak[ah]._minvalue + "§" + ak[ah]._maxvalue + "§" + ak[ah]._minvaluetext + "§" + ak[ah]._maxvaluetext + "§" + ak[ah]._ins + "§" + ak[ah]._hasjump + "§" + ak[ah]._anytimejumpto);
                break;
            case "fileupload":
                var A = ak[ah]._relation || "";
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._topic + "§" + ak[ah]._title + "〒" + ak[ah]._keyword + "〒" + A + "§" + ak[ah]._tag + "§" + ak[ah]._requir + "§" + ak[ah]._width + "§" + ak[ah]._ext + "§" + ak[ah]._maxsize + "§" + ak[ah]._ins + "§" + ak[ah]._hasjump + "§" + ak[ah]._anytimejumpto);
                break;
            case "sum":
                var A = ak[ah]._relation || "";
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._topic + "§" + ak[ah]._title + "〒" + ak[ah]._keyword + "〒" + A + "§" + ak[ah]._tag + "§" + ak[ah]._requir + "§" + ak[ah]._total + "§" + ak[ah]._rowtitle + "§" + ak[ah]._rowwidth + "§0§" + ak[ah]._ins + "§" + ak[ah]._hasjump + "§" + ak[ah]._anytimejumpto);
                l.append("§" + ak[ah]._referTopic + "§" + ak[ah]._referedTopics);
                break;
            case "cut":
                var A = ak[ah]._relation || "";
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._title + "§" + (ak[ah]._video || "") + "§" + A);
                break;
            case "page":
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._topic + "§" + ak[ah]._title + "§" + ak[ah]._tag);
                var z = ak[ah]._iszhenbie ? "true": "";
                z = ak[ah]._istimer ? "time": z;
                l.append("§" + z);
                l.append("§" + ak[ah]._mintime);
                if (ak[ah]._mintime) {
                    ag = true;
                }
                l.append("§" + ak[ah]._maxtime);
                if (ak[ah]._maxtime) {
                    b = true;
                }
                break;
            case "check":
            case "radio_down":
            case "radio":
            case "matrix":
                var A = ak[ah]._relation || "";
                ak[ah]._tag = isNaN(ak[ah]._tag) ? 0 : ak[ah]._tag;
                var ac = ak[ah]._mainWidth || "";
                l.append("¤" + ak[ah]._type + "§" + ak[ah]._topic + "§" + ak[ah]._title + "〒" + ak[ah]._keyword + "〒" + A + "〒" + ac + "§" + ak[ah]._tag + "§");
                if (ak[ah]._type == "matrix") {
                    if (ak[ah]._referTopic) {
                        ak[ah]._rowtitle2 = "";
                    }
                    l.append(ak[ah]._rowtitle + "〒" + ak[ah]._rowtitle2 + "〒" + ak[ah]._columntitle);
                } else {
                    l.append(ak[ah]._numperrow + "〒" + ak[ah]._randomChoice);
                }
                l.append("§" + ak[ah]._hasvalue + "§" + ak[ah]._hasjump + "§" + ak[ah]._anytimejumpto + "§" + ak[ah]._requir);
                if (ak[ah]._type == "check" || (ak[ah]._type == "matrix" && ak[ah]._tag == "102")) {
                    if (ak[ah]._isShop) {
                        l.append(",shop");
                        D = true;
                    } else {
                        l.append("," + ak[ah]._lowLimit + "," + ak[ah]._upLimit);
                    }
                } else {
                    if (ak[ah]._type == "radio" && ak[ah]._isQingJing) {
                        l.append(",1");
                    }
                }
                if (ak[ah]._type == "matrix") {
                    var E = ak[ah]._rowwidth;
                    if (ak[ah]._randomRow) {
                        E += ",true";
                    }
                    l.append("§" + E + "〒" + ak[ah]._rowwidth2);
                    if (ak[ah]._tag == "202" || ak[ah]._tag == "301") {
                        l.append("〒" + ak[ah]._minvalue + "〒" + ak[ah]._maxvalue);
                    } else {
                        if (ak[ah]._tag == "102" || ak[ah]._tag == "103") {
                            var o = ak[ah]._daoZhi || "";
                            l.append("〒" + o);
                        } else {
                            if (ak[ah]._tag == "201") {
                                if (ak[ah]._rowVerify) {
                                    l.append("〒");
                                    var R = trim(ak[ah]._rowtitle).split("\n");
                                    var V = 0;
                                    for (var e = 0; e < R.length; e++) {
                                        if (R[e].substring(0, 4) == "【标签】") {
                                            continue;
                                        }
                                        if (ak[ah]._rowVerify[V]) {
                                            var p = ak[ah]._rowVerify[V];
                                            l.append(V + ",");
                                            l.append(p._verify || "");
                                            l.append(",");
                                            l.append(p._minword || "");
                                            l.append(",");
                                            l.append(p._maxword || "");
                                            l.append(",");
                                            l.append(p._width || "");
                                            l.append(";");
                                        }
                                        V++;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (ak[ah]._isTouPiao) {
                        l.append("§" + ak[ah]._isTouPiao + "〒" + ak[ah]._touPiaoWidth + "〒" + ak[ah]._displayDesc + "〒" + ak[ah]._displayNum + "〒" + ak[ah]._displayPercent);
                        v = true;
                    } else {
                        if (ak[ah]._isCeShi) {
                            l.append("§ceshi〒" + ak[ah]._ceshiValue + "〒" + ak[ah]._ceshiDesc);
                            r = true;
                        } else {
                            if (ak[ah]._isCePing) {
                                l.append("§ceping");
                            } else {
                                l.append("§");
                            }
                        }
                    }
                }
                l.append("§" + ak[ah]._ins + "§" + ak[ah]._verify);
                l.append("§" + ak[ah]._referTopic + "§" + ak[ah]._referedTopics);
                for (var ae = 1; ae < ak[ah]._select.length; ae++) {
                    var B = "";
                    if (ak[ah]._select[ae]._item_huchi) {
                        B = "〒true";
                    }
                    var J = ak[ah]._select[ae]._item_value;
                    if (ak[ah]._select[ae]._item_value == "") {
                        J = NoValueData;
                    }
                    l.append("§" + ak[ah]._select[ae]._item_title + "〒" + ak[ah]._select[ae]._item_radio + "〒" + J + "〒" + ak[ah]._select[ae]._item_jump + "〒" + ak[ah]._select[ae]._item_tb + "〒" + ak[ah]._select[ae]._item_tbr + "〒" + ak[ah]._select[ae]._item_img + "〒" + ak[ah]._select[ae]._item_imgtext + "〒" + ak[ah]._select[ae]._item_desc + "〒" + ak[ah]._select[ae]._item_label + B);
                }
                break;
        }
    }
    clearInterval(interval_time);
    var t = getXmlHttp();
    I = I || false;
    var g = "curID=" + activityID;
    if (window.isTiKu) {
        g = "tid=" + tikuId;
    }
    var f = "/Handler/designQHandler.ashx?submitType=redesign&" + g + "&userguid=" + userGuid + "&validate_text=ys&t=" + (new Date()).valueOf() + "&sstate=" + encodeURIComponent(c);
    if (c == "pub") {
        f += "&pub=1";
    }
    if (c == "pub2") {
        f += "&pub=2";
    }
    if (I) {
        t.open("post", f, false);
    } else {
        t.open("post", f);
    }
    t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (!I) {
        t.onreadystatechange = function() {
            if (t.readyState == 4) {
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                if (t.status == 200) {
                    afterSave(unescape(t.responseText), c);
                } else {
                    clearInterval(interval_time);
                    show_status_tip("很抱歉，由于网络异常您的保存没有成功，请再试一次！", 6000);
                    interval_time = setInterval(autoSave, 90 * 1000);
                    saveClient();
                }
            }
        };
    }
    a += "§" + Z + "§" + ag + "§" + b + "§" + v + "§" + r + "§" + D;
    sendStr = a + l.toString("");
    l.clear();
    if (c == "init") {
        prevSaveData = sendStr;
        show_status_tip("成功加载", 1000);
        divSurvey.scrollTop = 0;
        return true;
    }
    havereturn = false;
    if (sendStr == prevSaveData && c != "pub2") {
        saveSuc(c);
    } else {
        if (!I) {
            timeoutTimer = setTimeout(function() {
                    processError();
                },
                20000);
            if (errorTimes == 0) {
                t.send("surveydata=" + encodeURIComponent(sendStr));
            } else {
                postWithIframe(f);
            }
        }
        if (I) {
            t.send("surveydata=" + encodeURIComponent(sendStr));
            afterSave(unescape(t.responseText), c);
        }
    }
    return true;
}
function postWithIframe(b) {
    var a = document.createElement("div");
    a.style.display = "none";
    a.innerHTML = "<iframe id='mainframe' name='mainframe' style='display:none;' > </iframe><form target='mainframe' id='frameform' action='' method='post' enctype='application/x-www-form-urlencoded'><input  value='' id='surveydata' name='surveydata' type='hidden'><input type='submit' value='提交' ></form>";
    document.body.appendChild(a);
    $("surveydata").value = sendStr;
    var c = $("frameform");
    c.action = b + "&iframe=1";
    c.submit();
}
function tiyanReg(a) {
    show_status_tip("保存问卷成功，请注册或者登录以便管理此问卷！", 5000);
    needCheckLeave = false;
    PDF_launch("/register/registers.aspx", 640, 480,
        function() {
            var b = true;
            if (isTiyan) {
                if (window.confirm("如果您不注册或者登录，您将无法再管理此问卷。\r\n点击“确定”返回继续操作，点击“取消”离开编辑问卷界面")) {
                    b = false;
                }
            }
            if (b) {
                goBack();
            }
        });
}
function finishEditing(c) {
    var a = getXmlHttp();
    var d = "curID=" + activityID;
    if (window.isTiKu) {
        d = "tid=" + tikuId;
    }
    var b = "/Handler/designqfinish.ashx?" + d;
    a.open("post", b, false);
    a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    a.send("edit=true");
    if (c) {
        c();
    }
}
function abort() {
    if (confirm("您真的打算放弃这次更改的内容吗？")) {
        goBack();
        finishEditing();
    }
}
function afterSave(c, b) {
    havereturn = true;
    if (c == "error") {
        windowGotoUrl("/Error/Error.aspx?source=designQHandler");
    } else {
        if (c == "timeout") {
            show_status_tip("您的登录信息超时，请重新登录，谢谢！");
            PDF_launch("/loginsmall.aspx", 660, 520);
        } else {
            if (c == "badcontent") {
                alert("很抱歉，问卷内容未通过审核，可能是因为您的问卷包含不当信息。\r\n如果您确认您的问卷内容没有任何问题，请与我们电话联系！");
                window.location = "/html/contactus.aspx";
            } else {
                if (c == "large") {
                    saveClient();
                    alert("您的问卷包含的数据过多，请适当精简，谢谢！");
                } else {
                    if (c == "empty") {
                        errorTimes = 1;
                        saveClient();
                        alert("您提交到服务器的内容为空，可能是因为防火墙拦截的原因。请重新再试一次，如果还是有错误，请更换浏览器或者联系我们，谢谢！");
                    } else {
                        clearInterval(interval_time);
                        var a = c.split("&")[0];
                        switch (a) {
                            case "true":
                                if (sendStr) {
                                    prevSaveData = sendStr;
                                }
                                removeClient();
                                saveSuc(b);
                                break;
                            case "false":
                                alert("您输入的验证码有误，请重新输入！");
                                break;
                            case "version":
                                alert("很抱歉，由于问卷星系统版本升级，您本次操作未能成功执行，请您刷新页面或者重启浏览器后再次尝试！\n请注意：页面上的信息可能没有保存，请您先保存重要的数据后再刷新或重启浏览器！");
                                break;
                            default:
                                saveClient();
                                errorTimes++;
                                alert("服务器返回错误，请刷新页面或者重新再试一次！如果还是有错误，请单击返回“我的问卷”选择放弃更改并返回。返回码：" + c);
                                break;
                        }
                    }
                }
                interval_time = setInterval(autoSave, 60 * 1000);
            }
        }
    }
}
function goBack() {
    var a = "/wjx/manage/pubq.aspx?activity=" + activityID;
    if (window.isTiKu) {
        a = "/wjx/manage/finishtiku.aspx?tid=" + tikuId;
    }
    windowGotoUrl(a);
}
function saveSuc(a) {
    show_status_tip("保存问卷成功！" + saveNotifyText, 3000);
    if (a == "pub" || a == "pub2") {
        if (isTiyan) {
            tiyanReg(true);
        } else {
            if (a == "pub") {
                goBack();
            } else {
                windowGotoUrl("/wjx/design/designstart.aspx?activity=" + activityID + "&action=1");
            }
        }
    } else {
        if (a == "old") {
            windowGotoUrl("design.aspx?openType=redesign&curid=" + activityID);
        } else {
            if (a == "upgrade") {
                windowGotoUrl("/register/usertype.aspx");
            } else {
                if (a == "preview") {}
            }
        }
    }
}
function doSaveValidate(a) {
    if (!a.createAttr) {
        return;
    }
    if (!a.hasCreatedAttr) {
        a.createOp();
        a.createAttr();
        a.setDataNodeToDesign();
        a.tabAttr.style.display = "none";
    }
    a.validate();
}
function isJumpToValid(b, a) {
    if (b != "" && b != 0 && b != 1) {
        if (toInt(b) <= a.dataNode._topic || toInt(b) > total_question) {
            return false;
        }
    }
    return true;
}
function save_paper_validate(k) {
    var l = document.getElementById("paper_attr_title");
    if (trim(l.value) == "") {
        alert("请填写问卷标题");
        show("tab3_div");
        l.value = "请输入您的问卷的标题";
        l.select();
        return false;
    }
    var d = true;
    var e;
    for (var h = 0; h < questionHolder.length; h++) {
        var f = questionHolder[h];
        if (f.checkValid && f.checkValid() == false) {
            doSaveValidate(f);
            if (questionHolder[h].checkValid() == false) {
                d = false;
                if (!e) {
                    e = questionHolder[h];
                }
            }
        } else {
            if (f.dataNode._hasjump) {
                if (!f.dataNode._anytimejumpto || f.dataNode._anytimejumpto == "0") {
                    var b = f.dataNode._select;
                    if (!b) {
                        continue;
                    }
                    var m = b.length;
                    for (var g = 1; g < m; g++) {
                        var c = trim(b[g]._item_jump);
                        if (!isJumpToValid(c, f)) {
                            doSaveValidate(f);
                            d = false;
                            if (!e) {
                                e = questionHolder[h];
                            }
                            break;
                        }
                    }
                } else {
                    var c = f.dataNode._anytimejumpto;
                    if (!isJumpToValid(c, f)) {
                        doSaveValidate(f);
                        d = false;
                        if (!e) {
                            e = questionHolder[h];
                        }
                    }
                }
            } else {
                if (f.dataNode._isCeShi) {
                    var b = f.dataNode._select;
                    if (!b) {
                        continue;
                    }
                    var m = b.length;
                    var a = false;
                    for (var g = 1; g < m; g++) {
                        if (b[g]._item_radio) {
                            a = true;
                        }
                    }
                    if (!a) {
                        doSaveValidate(f);
                        d = false;
                        if (!e) {
                            e = questionHolder[h];
                        }
                    }
                }
            }
        }
    }
    if (!d) {
        if (k) {
            if (e.ondblclick) {
                e.ondblclick();
            }
            e.scrollIntoView(false);
            show_status_tip("此题没有通过验证，保存失败！请将鼠标移到红色边框的控件上查看具体错误信息。", 6000);
        } else {
            show_status_tip("第" + e.dataNode._topic + "题没有通过验证，自动保存失败！请您将鼠标移到红色边框的控件上查看具体错误信息。", 6000);
        }
        return false;
    }
    d = true;
    e = null;
    return true;
}