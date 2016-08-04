
$(document).ready(function () {
	var isSwiper = true;
	var saveSwiper = 0;
	var navItem = $('.nav-item');
	var navSelect = $('.select').eq(0);

	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    direction: 'vertical',
	    speed: 1600,
	    onSlideChangeEnd: function(swiper){
	    	isSwiper = true;
	      	saveSwiper = swiper.activeIndex;
	      	navSelect.animate({"top": saveSwiper * 32 + 'px'}, 0);
	      	navItem.eq(saveSwiper).addClass('current').siblings().removeClass('current');
	    }
	});
	// swiper.slideTo(3, 0, true);

	$(document).on('mousewheel DOMMouseScroll', function (e) {
		if (!isSwiper) {return false;};
		isSwiper = false;
	    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
	    if (delta > 0) {
	    	if (saveSwiper == 0) {isSwiper = true;};
	    	swiper.slidePrev();
	    }else if (delta < 0) {
	    	if (saveSwiper == navItem.length - 1) {isSwiper = true;};
	    	swiper.slideNext();
	    };
	});

	navItem.on('click', function (event) {
		event.preventDefault();
		if (!isSwiper) {return false;}else {
			isSwiper = false;
			navItem.removeClass('current');
			var i = $(this).index();
			var _this = $(this);
			navSelect.animate({"top": i * 32 + 'px'}, 600, function () {
				_this.addClass('current').siblings().removeClass('current');
			});
			swiper.slideTo(i, 1800, true);
		};
	});

	navItem.on('dblclick', function (event) {
		event.preventDefault();
		isSwiper = true;
	});

	// $('.swiper-slide').eq(0).on('mousewheel DOMMouseScroll', function (event) {
	// 	var event = event || window.event;
	// 	event.stopPropagation();
	// 	return false;
	// });
});
	

function loadJScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://api.map.baidu.com/api?v=2.0&ak=tXUciIQMHScnuayrIl8GQsbqwfybqlcX&callback=init";
	document.body.appendChild(script);
}
function init() {
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.201211, 39.912783);
	map.centerAndZoom(point,17);
	// map.enableScrollWheelZoom(true);
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
}  
window.onload = loadJScript;