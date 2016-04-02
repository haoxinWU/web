var tabber = {
    options : [],
    init : function (options,selector) {
        if(options){
            tabber.options = options;
            var len = options.length;
            var cla = "col-33";
            if(len == 2) cla = "col-50";
            if(len == 4) cla = "col-25";
            if(len == 5) cla = "col-20";

            var html = '<div class=" common-tab"><div class="row">';
            $.each(options, function (index, option) {
                console.log(index);
                //option.callback();
                var clazz = cla;
                if(option.active == true)clazz = cla + " active";
                var t = '<div class="tab '+clazz+'"';
                $.each(option, function (index, o) {
                    if(index != "callback") t = t + ' data-' + index + '="'+o+'"';
                });
                t = t + '> <span class="">'+option.name+'</span> </div>';
                html = html + t;
            });
            console.log(html);
            $(selector).prepend(html);
        }

        $(selector).on("click",".tab", function (e) {
            e.stopPropagation();
            $(selector+" .tab").removeClass("active");
            $(selector+" .tab").attr("data-active","false");
            $(this).addClass("active");
            $(this).attr("data-active","true");
            var name = $(this).data("name");
            console.log(name);
            var callback = null;
            $.each(tabber.options,function (index, op) {
                if(name == op.name) callback = op.callback;
            })
            callback($(this));
        })
    },

};