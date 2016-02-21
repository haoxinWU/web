var StringUtils = {
    isEmpty : function (str) {
        if(str == null || str == "" || str == undefined){
            return true;
        }else{
            return false;
        }
    },
    isNull : function (str) {
        if(str == null){
            return true;
        }else{
            return false;
        }
    }
}