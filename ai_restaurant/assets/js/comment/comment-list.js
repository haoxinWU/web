var commentList = {
    shopId : null,
    productId : null,
    page : {
        page : 1,
        size : 20,
    },
    init : function () {
        commentList.shopId = parseInt($("html").data("shop-id"));
        commentList.productId = parseInt($("html").data("product-id"));

        commentList.getCommentList(function (json) {
            //ok
            if(json.data.count > 0){
                var commentHtml = "";
                $.each(json.data.data, function (index, item) {
                    var starHtml = '';
                    if(item.star <=2){
                        starHtml = '<img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png">'
                    }else if(item.star <= 4){
                        starHtml = '<img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png">';
                    }else if(item.star <= 6){
                        starHtml = '<img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png">';
                    }else if(item.star <= 8){
                        starHtml = '<img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png">';
                    }else if(item.star <= 10){
                        starHtml = '<img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png"><img src="../addons/lonaking_ai_restaurant/template/mobile/bower_components/raty/lib/images/star-on.png">';
                    }
                    var li = '<li>'+
                        '<div class="item-content">'+
                        '<div class="item-media"><img class="head-image" src="'+item.avatar+'" width="44"></div>'+
                        '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                        '<div class="item-title"><span class="commenter-name">'+item.nickname+'</span>'+
                        '<span class="stars">'+starHtml+
                        '</span>'+
                        '</div>'+
                        '</div>'+
                        '<div class="item-subtitle comment-content">'+item.content+'</div>'+
                    '</div>'+
                    '</div>'+
                    '</li>';
                    commentHtml = commentHtml+li;
                });
                $("#comment-ul").append(commentHtml);
            }
        }, function (json) {
            //fail

        });
    },
    
    event : function () {

    },

    getCommentList : function(success, error){
        var url = $("html").data("comment-list-api");
        var data = {
            shop_id : commentList.shopId,
            product_id : commentList.productId
        };
        $.get(url, data, function (res) {
            var json = res;
            if( json.status == 200){
                success(json);
            }else{
                error(json);
            }
        });
    }
};
