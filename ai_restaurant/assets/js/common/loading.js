var loading = {
    defaultMessage : "正在加载中……",
    init : function () {
        loading.event();
    },

    event : function(){
        $("body").on("touchstart",".loading", function () {
            var cusLoadingMessage = $(this).data("loading-message");
            if(cusLoadingMessage == null || cusLoadingMessage == ""){
                cusLoadingMessage = loading.defaultMessage;
            }
            loading.load(cusLoadingMessage);
        });
    },


    load : function (message) {
        $("#loading-message").text(loading.defaultMessage);
        $("#page-loader").show();
    },

    //<div id="alert-tip" class="alert-tip" style="bottom: 80px; display: none;"></div>
    tip : function (alertMessage) {
        $("#alert-tip").text(alertMessage);
        var left = ($(window).width()- $("#alert-tip").outerWidth()) / 2 + "px";
        $("#alert-tip").css({
            "bottom": "80px",
            "left": left
        });
        $("#alert-tip").show();
        setTimeout(function () {
            $("#alert-tip").hide();
            $("#alert-tip").text("");
        },2000);
    },

    hide : function () {
        $("#page-loader").hide();
    }
};

$(function () {
    loading.init();
});