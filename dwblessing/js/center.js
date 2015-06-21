var center = {

	init : function(){
		center.funcs.duty_validate();
	},

	event : function(){
		/*同意免责条款*/
		$("button.agree-duty").on("click",function(){
			$("input[name='no_reg']").val(1);
			$("#duty－free").modal('hide');
		});
		/*提交登记*/
		$("button.submit-regist").click(function(){
			$flag = center.funcs.duty_validate();
			if($flag){
				$("#reg-share-man").modal('hide');
				$("#myshare_web").modal('show');
			}else{
				$("#reg-share-man").modal('hide');
				$("#duty－free").modal('show');
			}
			
		});

		/*兑换 按钮 点击后 积分商城弹出*/
		$(".convert").click(function(){
			$("#ucenter").modal('hide');
			$("#gift-modal").modal('show');
		});
		/* 制作按钮 跳转到我的二维码 */

		/*礼品兑换记录按钮*/
		$("button.history-gift").on("click",function(){
			$("#gift-modal").modal('hide');
			$("#history-gift").modal('show');
		});
		/*返回积分商城按钮*/
		$("button.return－gift").on("click",function(){
			$("#history-gift").modal('hide');
			$("#gift-modal").modal('show');
		})

		/*兑换按钮*/
		$(".buy-gift").on("click",function(){
			$("#gift-modal").modal('hide');
			$("#buy-info-modal").modal('show');
		});
	},

	funcs : {
		duty_validate :  function(){
			$reg = $("input[name='no_reg']").val();
			if($reg == 0 || $reg == false){
				$("#duty－free").modal('show');
				return false;
			}else{
				return true;
			}
		}
	}

};
$(function(){
	center.init();
	center.event();
});