var registrationAdmin = {

    urls : {
        confirm : null,
        pass : null,
    },

    init : function(){
        registrationAdmin.urls.confirm = $("html").data("confirm-api");
        registrationAdmin.urls.pass = $("html").data("pass-api");
        registrationAdmin.initTableStatus();
        registrationAdmin.event();
    },

    event : function(){

        $("body").on("touchstart",".table-button", function (e) {
            e.stopPropagation();
            $(".table-button.active").removeClass("active");
            $(this).addClass("active");
        });

        /*确定*/
        $(".registration-list").on("touchstart",".confirm", function (e) {
            e.stopPropagation();
            var lineId = $(this).data("line-id");
            registrationAdmin.confirmLine(lineId, function (json) {

            });
        });

        /*取消*/
        $(".registration-list").on("touchstart",".pass", function (e) {
            e.stopPropagation();
            var lineId = $(this).data("line-id");
            registrationAdmin.cancelLine(lineId, function (json) {

            });
        });
    },

    initTableStatus : function (shopId) {
        
    },
    
    confirmLine : function (lineId, callback) {
        var data = {
            line_id : lineId
        };
        $(registrationAdmin.urls.confirm, data, function (res) {
            var json = JSON.parse(res);
            callback(json);
        });
    },

    cancelLine : function (lineId, callback) {
        var data = {
            line_id : lineId
        };
        $(registrationAdmin.urls.pass, data, function (res) {
            var json = JSON.parse(res);
            callback(json);
        });
    }
}