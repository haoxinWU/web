var shareurl = 'http://slz.nidjia.com';
var imgUrl = 'images/sharelogo.jpg';
var title = "龙舟赛万福，端阳乐邮礼";
var content = '快来参与趣味龙舟赛，赢Apple Watch大奖！';
wx.ready(function () {
    wx.onMenuShareAppMessage({
        title: title,
        desc:  content,
        link:  shareurl,
        imgUrl: imgUrl,
        trigger: function (res) {},
        success: function (res) {},
        cancel: function (res) {},
        fail: function (res) {}
    });
    wx.onMenuShareTimeline({
        title: title,
        link: shareurl,
        imgUrl: imgUrl,
        trigger: function (res) {},
        success: function (res) {},
        cancel: function (res) {},
        fail: function (res) {}
    });
    wx.onMenuShareQQ({
        title: title,
        desc:  content,
        link:  shareurl,
        imgUrl: imgUrl,
        trigger: function (res) {},
        success: function (res) {},
        cancel: function (res) {},
        fail: function (res) {}
    });
    wx.onMenuShareWeibo({
        title: title,
        desc:  content,
        link:  shareurl,
        imgUrl: imgUrl,
        trigger: function (res) {},
        success: function (res) {},
        cancel: function (res) {},
        fail: function (res) {}
    });
});