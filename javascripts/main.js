
$(document).ready(function () {
	//some var
	var isSwiper = true;
	var saveSwiper = 0;
	var navItem = $('.nav-item');
	var navSelect = $('.select').eq(0);
	// swiper
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

	//controller swiper page
	// swiper.slideTo(4, 0, true);

	//mousewheel
	// $(document).on('mousewheel DOMMouseScroll', function (e) {
	// 	if (!isSwiper) {return false;};
	// 	isSwiper = false;
	//     if (isWhell(e)) {
	//     	if (saveSwiper == 0) {isSwiper = true;};
	//     	swiper.slidePrev();
	//     }else {
	//     	if (saveSwiper == navItem.length - 1) {isSwiper = true;};
	//     	swiper.slideNext();
	//     };
	// });

	//nav click
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

	//nav dblclick
	navItem.on('dblclick', function (event) {
		event.preventDefault();
		isSwiper = true;
	});

	//map in mousewheel
	$('#allmap').on('mousewheel DOMMouseScroll', function (event) {
		var event = event || window.event;
		event.stopPropagation();
		return false;
	});

	// home wheel
	var home_wheelNum = 0;
	var home_wheelTrue = true;
	$("#home-wheel-in").on('mousewheel DOMMouseScroll', function (event) {
		var event = event || window.event;
		event.stopPropagation();
		if (!home_wheelTrue) {return;};
		if (!isSwiper) {return;};
		home_wheelTrue = false;
		var inner = $(this).find('.inner_top').eq(0);
		var innerHeight = Number(inner.height()) - 500;
		
		if (isWhell(event)) {
			home_wheelNum += 200;
			if (home_wheelNum >= 0 && isSwiper) {
				home_wheelNum = 0;
				// isSwiper = false;
				// swiper.slidePrev();
			}
		}else {
			home_wheelNum -= 200;
			if (home_wheelNum <= -innerHeight && isSwiper) {
				home_wheelNum = -innerHeight;
				// isSwiper = false;
				// swiper.slideNext();
			}
		}
		inner.animate({marginTop: home_wheelNum + 'px'}, 200, function () {
			home_wheelTrue = true;
		});
		return false;
	});

	//service wheel
	var service_wheelNum = 0;
	var service_wheelTrue = true;
	$('#service-wheel-in').on('mousewheel DOMMouseScroll', function (event) {
		var event = event || window.event;
		event.stopPropagation();
		if (!service_wheelTrue) {return;};
		if (!isSwiper) {return;};
		service_wheelTrue = false;
		var inner = $(this).find('.inner_top').eq(0);
		var innerHeight = Number(inner.height()) - 500;
		if (isWhell(event)) {
			service_wheelNum += 200;
			if (service_wheelNum >= 0 && isSwiper) {
				service_wheelNum = 0;
				// isSwiper = false;
				// swiper.slidePrev();
			}
		}else {
			service_wheelNum -= 200;
			if (service_wheelNum <= -innerHeight && isSwiper) {
				service_wheelNum = -innerHeight;
				// isSwiper = false;
				// swiper.slideNext();
			}
		}
		inner.animate({marginTop: service_wheelNum + 'px'}, 200, function () {
			service_wheelTrue = true;
		});
		return false;
	});

	// class wheel
	var class_wheelNum = 0;
	var class_wheelTrue = true;
	$("#class-wheel-in").on('mousewheel DOMMouseScroll', function (event) {
		var event = event || window.event;
		event.stopPropagation();
		if (!class_wheelTrue) {return;};
		if (!isSwiper) {return;};
		class_wheelTrue = false;
		var inner = $(this).find('.inner_top').eq(0);
		var innerHeight = Number(inner.height()) - 500;
		
		if (isWhell(event)) {
			class_wheelNum += 200;
			if (class_wheelNum >= 0 && isSwiper) {
				class_wheelNum = 0;
				// isSwiper = false;
				// swiper.slidePrev();
			}
		}else {
			class_wheelNum -= 200;
			if (class_wheelNum <= -innerHeight && isSwiper) {
				class_wheelNum = -innerHeight;
				// isSwiper = false;
				// swiper.slideNext();
			}
		}
		inner.animate({marginTop: class_wheelNum + 'px'}, 200, function () {
			class_wheelTrue = true;
		});
		return false;
	});

	// home wheel
	var jz_wheelNum = 0;
	var jz_wheelTrue = true;
	$("#jz-wheel-in").on('mousewheel DOMMouseScroll', function (event) {
		var event = event || window.event;
		event.stopPropagation();
		if (!jz_wheelTrue) {return;};
		if (!isSwiper) {return;};
		jz_wheelTrue = false;
		var inner = $(this).find('.inner_top').eq(0);
		var innerHeight = Number(inner.height()) - 500;
		
		if (isWhell(event)) {
			jz_wheelNum += 200;
			if (jz_wheelNum >= 0 && isSwiper) {
				jz_wheelNum = 0;
				// isSwiper = false;
				// swiper.slidePrev();
			}
		}else {
			jz_wheelNum -= 200;
			if (jz_wheelNum <= -innerHeight && isSwiper) {
				jz_wheelNum = -innerHeight;
				// isSwiper = false;
				// swiper.slideNext();
			}
		}
		inner.animate({marginTop: jz_wheelNum + 'px'}, 200, function () {
			jz_wheelTrue = true;
		});
		return false;
	});

	//hosw or hidden map
	$("#allmap_show").on('click', function () {
		var _this = $(this);
		var sh = _this.data('sh');
		if (sh) {
			_this.data('sh', false);
			$("#allmap").animate({left: '0%'}, 'swing', function () {
				_this.find('.allmap_show_text').text('隐藏地图');
			});
		}else {
			_this.data('sh', true);
			$("#allmap").animate({left: '100%'}, 'swing', function () {
				_this.find('.allmap_show_text').text('显示地图');
			});
		}
	});

	// $("#mainweb").load(function(){
	//     var mainheight = $(this).contents().height()+30;
	//     $(this).height(mainheight);
	// });
});

function isWhell(e) {
	var du = false;
	var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
	du = delta > 0? true: false;
    return du;
}
	

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
	//on/off map wheel
	map.enableScrollWheelZoom(true);
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
}  
//map block
window.onload = loadJScript;