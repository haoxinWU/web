var account = {
    data: {
        page_index: 1,
        page_size: 10,
        page_count: 10
    },
    init: function () {

    },

    event: function () {
        $(window).scroll(function () {
            var height = account.functions.getClientHeight();
            var theight = account.functions.getScrollTop();
            var rheight = account.functions.getScrollHeight();
            var bheight=rheight-theight-height;
            if(bheight == "0"){
                account.functions.loadScoreRecord(function (json) {
                    alert('成功');
                }, function (json) {
                    alert('失败');
                });
            }
        });
    },

    functions: {

        loadScoreRecord : function () {
            var url = $("html").data('load-score-record-url');
            var postData = {};
            $.post(url,postData, function (e) {
                var json=eval("("+ e +")");
                alert(json);
                if(json.status == 200){

                }else{

                }
            });
        },

        getScrollHeight: function () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        },

        getScrollTop: function () {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        },
        getClientHeight: function () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            } else {
                var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            }
            return clientHeight;
        }
    }
}

$(function () {
    account.init();
    account.event();
});