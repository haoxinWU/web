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
    
    hide : function () {
        $("#page-loader").hide();
    }
};

$(function () {
    loading.init();
});