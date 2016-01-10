var cart = {
    tableId : null,
    shopId : null,
    cartNum : "",
    cart : {
        id : null,
        cartNum : "",
        count : 0,//人数
        menuCount : 0,//菜数
        //菜品
        foods : {

        },
        totalAmount : 0.0,
        aaAmount : 0.0,
        onlyAmount : 0.0
    },
    cartPosition : {
        top : 0,
        left : 0,
    },
    init : function () {
        //初始化数据
        cart.shopId = parseInt($("html").data("shop-id"));
        cart.tableId = parseInt($("html").data("table-id"));
        //初始化 购物车位置
        cart.initCartPosition();
        cart.event();
        cart.initCart(cart.shopId,cart.tableId, function (json) {
            //成功
            cart.cart.id = json.data.id;
            cart.cartNum = json.data.cart_num;

        }, function (json) {
            alert(json.message);
        });
    },
    event : function () {

        //点击-
        $(".list-item").on('touchstart','.btn.-minus', function (e) {
            e.stopPropagation();
            var foodId = $(this).parents(".list-item").data("item");
            //alert(foodId);

        });

        //点击+
        $(".list-item").on('touchstart','.btn.-plus', function (e) {
            e.stopPropagation();
            var foodId = $(this).parents(".list-item").data("item");
            var windowHeight = $(window).height();
            var offset = $(this).offset();
            var startTop = offset.top;
            var startLeft = offset.left;
            var btnTop = offset.top;
            var scrollTop = $(window).scrollTop();
            startTop = btnTop - scrollTop;
            //判断高度
            cart.fly(startTop,startLeft, function () {
                //shopCartAnimate
            });
        });

        //点击购物车
        $("#shopmenu-cart-bar").on('touchstart','.row-num', function (e) {
            e.stopPropagation();
            var cartMenuButton = $("#shopmenu-cart-list");
            var status = cartMenuButton.data("status");
            if(status == "down"){
                cartMenuButton.removeClass("visiHidden");
                cartMenuButton.removeClass("down");
                cartMenuButton.addClass("up");
                cartMenuButton.data("status","up");
                $(".global-mask").show();
            }else if(status == "up"){
                cartMenuButton.removeClass("up");
                cartMenuButton.addClass("down");
                cartMenuButton.data("status","down");
                cartMenuButton.removeClass("visiHidden");
                $(".global-mask").hide();
            }
        });
        //关闭购物车
        $(".global-mask").on("touchstart", function (e) {
            e.stopPropagation();
            var cartMenuButton = $("#shopmenu-cart-list");
            cartMenuButton.removeClass("up");
            cartMenuButton.addClass("down");
            cartMenuButton.data("status","down");
            cartMenuButton.removeClass("visiHidden");
            $(".global-mask").hide();
        });
    },

    /*飞向购物车*/
    fly : function (startTop, startLeft, success) {
        var flyer = $('<em class="cart-count" style="display: block"></em>'); //抛物体对象
        flyer.fly({
            start : {
                top: startTop,  //开始位置（必填）#fly元素会被设置成position: fixed
                left: startLeft,  //开始位置（必填）
            },
            end : {
                left: cart.cartPosition.left, //结束位置（必填）
                top: cart.cartPosition.top,  //结束位置（必填）
                width: 20, //结束时高度
                height: 20, //结束时高度
            },
            speed : 1.8,
            onEnd : function () {
                $(".row-num").addClass("shopCartAnimate");
                this.destroy();
                setTimeout(function () {
                    $(".row-num").removeClass("shopCartAnimate");
                },200);

            }
        });

    },

    /*初始化购物车位置*/
    initCartPosition : function () {
        var offset = $("em.cart-count").offset();
        //cart.cartPosition.top = offset.top;
        cart.cartPosition.top = $(window).height();
        cart.cartPosition.left = offset.left;
    },

    /*初始化购物车数据*/
    initCart : function (shopId, tableId, success, error) {
        var url = $("html").data("basket-api");
        var data = {
            "shop_id" : shopId,
            "table_id" : tableId
        }
        $.get(url,data, function (res) {
            //var json = JSON.parse(res);
            var json = res;
            if(json.status == 200){
                success(json);
            }else{
                error(json);
            }
        })
    },
};
function getX(e) {
    e = e || window.event;

    return e.pageX || e.clientX + document.body.scroolLeft;
}

function getY(e) {
    e = e|| window.event;
    return e.pageY || e.clientY + document.boyd.scrollTop;
}