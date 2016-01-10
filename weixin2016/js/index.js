var index = {
    init : function(){
        index.event();
    },

    event : function () {
        $(".page1.point").on("click", function (e) {
            e.stopPropagation();
            var btn = $(this);
            btn.removeClass("page1");
            index.hidePage1();
            btn.addClass("page2");
            index.loadPage2();
        });


    },

    hidePage1 : function(){
        $(".wrapper .page.page1").addClass("loaded");
        $(".wrapper .page.page1").removeClass("play");
        $(".wrapper .page.page1").hide();
    },

    loadPage1 : function () {

    },
    loadPage2 : function(){
        $(".wrapper .page.page2").addClass("play");
    },
};