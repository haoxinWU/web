var line = {
    id : null,
    api : {
        line_status : $("html").data("line-status-api"),
    },

    init : function(){
        line.event();

        //init id
        line.id = parseInt($("html").data("id"));

        //check line status
        line.loopGetLineStatus();


    },

    event : function () {
        $("#line-button").on("touchstart",function(e){
            e.stopPropagation();
            var personCount = $("select[name='person_count']").val();
            var url = $("html").data("line-api")+"&person_count="+personCount;
            window.location.href = url;
        });
    },

    //获取排队状态
    getLineStatus : function (id,success,error) {
        var data = {
            line_id : id,
        }
        $.post(line.api.line_status,data, function (res) {
            var json = JSON.parse(res);
            if(json.status == 200){
                success(json);
            }else{
                error(json);
            }
        })
    },

    loopGetLineStatus : function(){
        setTimeout(function () {
            line.getLineStatus(line.id, function (json) {
                $("span.waited-minutes").text(json.data.waited_minutes);
                $("span.guess-minutes").text(json.data.guess_minutes);
            }, function (json) {
                swal({
                    title: "<small>注意啦</small>!",
                    text: json.message,
                    confirmButtonText: "知道了",
                    html: false
                });
            });
            line.loopGetLineStatus();
        },5000);

    }
}