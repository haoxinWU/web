var coupon_detail = {

	init : function(){
		coupon_detail.functions.make_barcode();
		coupon_detail.functions.polling_scan_check();
	},
	event : function(){

	},

	functions : {
		make_barcode : function(){
			$("span.barcode").empty().barcode($(".coupon-detail-code code").text(),"code11",{barWidth:2, barHeight:130,showHRI:false});

		},
		polling_scan_check : function(){
			var url = "";
			var postData = {

			};
			$.post(url, postData, function(result){
				//var json = eval('(' + result + ')');
				var json = {
					"status" : 200,
					"message" : "华润万家的客服a小姐扫描成功"
				};
				if(json.status == 200){
					var ok_i = '<i class="glyphicon glyphicon-ok-sign coupon-scan-success">';
					$(".scan-qrcode").empty().append(ok_i+ " " + json.message +"</i>");
					return ;
				}else{
					setTimeout('coupon_detail.functions.polling_scan_check()', 3000);
				}
			});
		}
	}	
};
$(function(){
	coupon_detail.init();
});