var coupon = {
	init : function(){
		coupon.functions.get_coupon();
	},

	event : function(){

	},

	functions : {
		get_coupon : function(){
			var click_status = 0;
			$("div.coupon-box").on("click",function(){
				if(click_status == 0){
					var btn_click = $(this).children("span.click");
					btn_click.text("领取中...");
					click_status = 1;//领取中
					var url = "#";
					var postData = {

					};
					$.post(url, postData, function(result){
						//var json = eval('(' + result + ')');
						var json = {
							"status" : 200,
						};
						if(json.status == 200){
							$("i.coupon-get-success").show();
							$("div.coupon-box h4").text("恭喜你获得红包");
							$("i.coupon-get-success").siblings("span").text("领取成功");
							click_status = 3;//领取成功
							btn_click.text("查看优惠券");
						}else{
							click_status = 4;
						}
					});
				}else if(click_status == 3){
					//查看优惠券
					window.location.href = "mycoupon.html";
				}
			});
		}
	},
};
$(function(){
	coupon.init();
});