var response = {
    success : function () {
        return {
            code : 200,
            msg : "success",
            data : null
        }
    },
    
    error : function (msg) {
        return {
            code : 400,
            msg : msg,
            data : null
        }
    }
}

