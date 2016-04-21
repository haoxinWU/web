const SHOP = 1;
var GOOD =2;
var MENU_TYPE_TARGET = 2;
var FILTER_API = "mock/filter.json";
var filter = {
    type : SHOP,
    page : 1,
    size : 20,
    page_end : false,
    overlay : false,
    open : false,

    init: function () {

        //请求数据
        $.get(FILTER_API, function (res) {

            var html = template('filter-template',res);
            $("#nav").append(html);

        });

        $(".selector.J_selector").addClass('Hide');
        filter.open = false;
        filter.overlay = false;
    },


    event : function () {

        //点击filter
        $("body").on('click','nav.list-nav>.cat .item', function (e) {
            console.log("点击filter"+$(this).hasClass("on"));
            var selectorId = $(this).data("id");
            if(!$(this).hasClass("on")){//开启
                $(this).addClass("on");
                //callback
                var currentSecondMenu = $("body .list-nav section.selector.J_selector[data-id='"+selectorId+"']");
                currentSecondMenu.removeClass("Hide");
                filter.overlay_check();
                //当前点击的菜单
                new IScroll("body .list-nav section.selector.J_selector[data-id='"+selectorId+"'] .menu.main", { mouseWheel:false,click:false,scrollbars:true });

                //开始定默认的菜单
                var defaultMenu = $("body .list-nav section.selector.J_selector[data-id='"+selectorId+"'] .menu.sub[data-default='1']");
                var defaultMenuId = defaultMenu.data("pid");

                filter.open_second_menu(selectorId,defaultMenuId);
            }else{//关闭
                $(this).removeClass("on");
                //callback

            }
        });


        //点击left
        $("body").on('touchstart','nav.list-nav>section.selector.J_selector .menu.main .item', function (e) {
            e.stopPropagation();
            event.preventDefault();
            var currentClick = $(this);
            var selectorId = currentClick.parents("section").data("id");
            console.log("selectorid="+selectorId);
            var menuId = currentClick.data("id");
            var menuType = currentClick.data("type");
            currentClick.parent("div").siblings().children(".item").removeClass('on');

            currentClick.addClass('on');
            //当前点击的菜单

            filter.open_second_menu(selectorId,menuId);

        });


        $("body").on('touchstart','.overlay', function (e) {
            event.preventDefault();
            $(".selector").addClass('Hide');
            $("body .list-nav>.cat .item").removeClass("on");
            filter.overlay_check();
        });
    },


    overlay_check : function () {
        if(filter.overlay == false){
            console.log("checked");
            $("body .overlay").attr("style",'top: 0px; left: 0px; width: 100%; height: 100%; z-index: 200; position: fixed; background: rgba(0, 0, 0, 0.6)');
            filter.overlay = true;
            filter.open = true;
        }else{
            $("body .overlay").attr("style","");
            filter.overlay = false;
            filter.open = false;
        }
    },


    open_second_menu : function (firstId,secondId,callback) {
        $("body .list-nav section.selector.J_selector[data-id='"+firstId+"'] .menu.sub").addClass("Hide");
        $("body .list-nav section.selector.J_selector[data-id='"+firstId+"'] .menu.sub[data-pid='"+secondId+"']").removeClass("Hide");
        new IScroll("body .list-nav section.selector.J_selector[data-id='"+firstId+"'] .menu.sub[data-pid='"+secondId+"']", { mouseWheel:false,click:false,scrollbars:true });
        if(callback) callback();
    }
};

$(function () {
    filter.init();
    filter.event();
});