var mycoupon = {

	init : function(){
		mycoupon.functions.go_detail();
	},
	event : function(){

	},
	functions : {
		go_detail : function(){
			$(".coupon").on("click","", function(){
				window.location.href = "coupon_detail.html";
			});
		}
	}
};
$(function(){
	mycoupon.init();
});