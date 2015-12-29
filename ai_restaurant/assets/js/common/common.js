/**
 * Created by leon on 15/9/22.
 */
var common = {
    init: function () {


    },
    event: function () {
        /*工具栏点击事件 当工具栏点击的时候，对应的标题要切换*/
        $$('div.pages div.toolbar-fixed').on(clickEvent,'a.tab-link[data-title]', function () {
            var btn = $$(this);
            var title = btn.attr('data-title');
            $$('title').text(title);
        });

        //当页面家在进来的时候修改标题
        mainFramework.onPageBeforeInit('*', function (page) {
            var pageName = page.name;
            var pageTitle = $$('div.pages .page[data-page='+pageName+']').data('page-title');
            if(pageTitle != null && pageTitle != undefined){
                $$('title').text(pageTitle);
            }
        });

        //单选的选项
        $$('div.pages').on(clickEvent,'.color-select a.button', function (e) {
            var btn = $$(this);
            var selectedSpan = btn.parent().parent().find('span.selected');
            selectedSpan.remove();
            var selectHtml = '<span class="selected"><i class="icon iconfont">&#xe60a;</i></span>';
            btn.append(selectHtml);
        });

        //多选的选项
        $$('div.pages').on(clickEvent,'.color-checkbox a.button',function(e){
            var btn = $$(this);
            var targetSelecteStatus = true;
            if(btn.hasClass('selected')){
                targetSelecteStatus = false;
            }
            if(targetSelecteStatus){
                btn.addClass('selected');
            }else{
                btn.removeClass('selected');
            }
        });
        
        //输入的时候遮挡的问题

    },
    functions: {

    }
}
/*初始化页面*/
$(function(e){
    common.init();
    common.event();
})
