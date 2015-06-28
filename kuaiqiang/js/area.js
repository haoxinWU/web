var area = {
	event : function(){
		$("input[name='search']").on("focusin",function(){
			$(".location-city").hide();
			$(".search-history").hide();
			$(".search-guess-list").show();
		});
		$("input[name='search']").on("focusout",function(){
			$(".location-city").show();
			$(".search-history").show();
			$(".search-guess-list").hide();
		});
	}
};
$(function(){
	area.event();
});