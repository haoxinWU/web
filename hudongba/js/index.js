var index = {
    data : {

    },
    init : function () {
        swal({
            title: "<small>请出示下面二维码签到</small>!",
            text: '<img src="resource/image/share_qr_close3.png" width="180px" height="180px">',
            imageUrl: "",
            confirmButtonText: "好的",
            html: true
        });
    },
    event : function(){
        $("body").on("click", function (e) {
            e.stopPropagation();
            $("#join_box").animate({bottom:"-500px"},200);
            $("#join_box").show();
            $("#cover2").hide();
        });
        $("#dt_join_bar_title_mb_ok").on("click", function () {
            swal({
                title: "<small>请出示下面二维码签到</small>!",
                text: '<img src="'+$("html").data("qrcode")+'" width="180px" height="180px">',
                imageUrl: "",
                confirmButtonText: "好的",
                html: true
            });
        });
        $("#dt_join_bar_title_mb").on("click", function (e) {
            e.stopPropagation();
            $("#join_box").show();
            $("#cover2").show();
            $("#join_box").animate({bottom:"0px"},200);

        });
        
        $("#close_join_box").on("click", function (e) {
            e.stopPropagation();
            $("#join_box").animate({bottom:"-500px"},200);
            $("#join_box").show();
            $("#cover2").hide();
        });

        $("#a_submit_nopay").on("click", function (e) {
            //check name
            if($("input[name=name]").val() == null || $("input[name=name]").val() == ""){
                index.functions.showTip($("input[name=name]").data("tip"));
                return false;
            }
            //check mobile
            if($("input[name=mobile]").val() == null || $("input[name=mobile]").val() == ""){
                index.functions.showTip($("input[name=mobile]").data("tip"));
                return false;
            }

            //提交
            index.functions.submitEnroll(function (json) {
                //弹窗 拿到二维码图片
            }, function (json) {
                index.functions.showTip(json.message);

            });

        });

        $("#join_box").on("click", function (e) {
            e.stopPropagation();
        });
    },
    functions : {
        showTip : function(text){
            $("#toast").text(text);
            var left = ($(window).width()- $("#toast").outerWidth()) / 2 + "px";
            $("#toast").css({
                "bottom": "80px",
                "left": left
            });
            $("#toast").show();
            setTimeout(function () {
                $("#toast").hide();
                $("#toast").text("");
            },2000);
        },
        submitEnroll : function (success, error) {
            var url = $("html").data("enroll-api");
            var data = {
                name : $("input[name=name]").val(),
                mobile : $("input[name=mobile]").val()
            }
            $.post(url, data, function (e) {
                var json = JSON.parse(e);
                if(json.status == 200){
                    success(json);
                }else{
                    error(json);
                }
            })
        }
    }
};

$(function () {
    index.init();
    index.event();
});