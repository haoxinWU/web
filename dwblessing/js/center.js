var center = {

	init : function(){

	},

	event : function(){
		/*兑换 按钮 点击后 积分商城弹出*/
		$(".convert").click(function(){
			$("#my_share").modal('hide');
			$("#gift").modal('show');
		});
		/* 制作按钮 跳转到我的二维码 */
		$("button.make").click(function(){

		});
		/*礼品兑换记录按钮*/
		$("button.history-gift").on("click",function(){
			$("#gift").modal('hide');
			$("#history-gift").modal('show');
		});
		/*返回积分商城按钮*/
		$("button.return－gift").on("click",function(){
			$("#history-gift").modal('hide');
			$("#gift").modal('show');
		})
	},

	funcs : {

	}

};
$(function(){
	center.event();
});