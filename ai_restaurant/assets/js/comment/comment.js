var comment = {
    orderId : null,
    urls : {
        commentApi : null,
        shopCommentPage : null,
    },
    init : function(){

        comment.orderId = $("html").data("order-id");

        comment.urls.commentApi = $("html").data("comment-api");
        comment.urls.shopCommentPage = $("html").data("shop-comment-page");

        comment.event();
    },

    event : function(){
        $(".submit-comment").on("touchstart", function (e) {
            e.stopPropagation();
            var star = 0;//TODO
            var content = $("textarea[name=comment]").val();
            if(null == content || content == ""){
                //alert("评价内容不能为空");
                loading.tip("评价内容不能为空");
                return false;
            };
            loading.load("提交中...");
            comment.doComment(comment.orderId, content, function (json) {
                if(json.status == 200){
                    //TODO 显示提交成功 2秒后跳转
                    setTimeout(function () {
                        window.location.href = comment.urls.shopCommentPage;
                    },2000);
                }else{
                    //TODO 提示
                }
            });
        });
    },

    //评论
    doComment : function(orderId, content, callback){
        var url = comment.urls.commentApi;
        var data = {
            order_id : comment.orderId,
            content : content
        };

        $.post(url, data, function (res) {
            var json = JSON.parse(res);
            callback(json);
        });
    }
};