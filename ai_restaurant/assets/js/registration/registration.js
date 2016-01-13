var registration = {

    lineId : null,

    init : function () {
        registration.event();
    },

    event : function(){

        //cancel event
        $(".cancel-line").on("touchstart", function (e) {
            e.stopPropagation();


        });
    }
};
