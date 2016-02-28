/**
 * Created by leon on 16/2/28.
 */

var _loading=function(){};_loading.prototype.init=function(){$("head").append('<link rel="stylesheet" type="text/css" href="static/one_wap/css/loading.css">'),$("body").append('<div id="_loading"><div class="box"><img class="Img" src="static/one_wap/images/loading.gif"><div id="_loading_text" class="innerDiv">努力加载中...</div></div></div>'),$("#_loading").css("min-height",$(window).height()),$("#_loading").on("touchmove",function(i){i.preventDefault()})},_loading.prototype.show=function(i){$("#_loading_text").text(null!=i?i+"...":"努力加载中..."),$("#_loading").show(),$("#_loading .Img").eq(0).addClass("ani")},_loading.prototype.hide=function(){$("#_loading").hide()};