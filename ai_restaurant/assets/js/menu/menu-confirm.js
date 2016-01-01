var menuConfirm = {
    init : function(){
        menuConfirm.event();
    },
    event : function () {
        $(".confirm-toolbar").on("click",".submit", function (e) {
            e.stopPropagation();
            window.location.href = 'pay-result.html';
        })
    }
};