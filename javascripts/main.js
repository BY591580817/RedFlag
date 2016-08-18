
$(document).ready(function () {

	var DH = $(document).height();
	// alert(DH)
	$('#nav').height(DH);
	$('.inner').css({height:DH-100+'px',marginTop:0,top:50+'px'});

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
	      	navSelect.animate({"top": saveSwiper * 2 + 'vw'}, 0);
	      	navItem.eq(saveSwiper).addClass('current').siblings().removeClass('current');
	    }
	});

	//controller swiper page
	swiper.slideTo(4, 0, true);

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
			navSelect.animate({"top": i * 2 + 'vw'}, 600, function () {
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

	var wheel_all = [
		{
			obj: $("#home-wheel-in"),
			num: 0,
			tru: true
		},
		{
			obj: $("#service-wheel-in"),
			num: 0,
			tru: true
		},
		{
			obj: $("#class-wheel-in"),
			num: 0,
			tru: true
		},
		{
			obj: $("#jz-wheel-in"),
			num: 0,
			tru: true
		},
		{
			obj: $('#news-wheel-in'),
			num: 0,
			tru: true
		}
	];

	$.each(wheel_all, function (index, element) {
		element.obj.on('mousewheel DOMMouseScroll', function (event) {
			var event = event || window.event;
			event.stopPropagation();
			if (!element.tru) {return;};
			if (!isSwiper) {return;};
			element.tru = false;
			var inner = $(this).find('.inner_top').eq(0);
			var innerHeight = Number(inner.height()) - 500;
			
			if (isWhell(event)) {
				element.num += 200;
				if (element.num >= 0 && isSwiper) {
					element.num = 0;
					// isSwiper = false;
					// swiper.slidePrev();
				}
			}else {
				element.num -= 200;
				if (element.num <= -innerHeight && isSwiper) {
					element.num = -innerHeight;
					// isSwiper = false;
					// swiper.slideNext();
				}
			}
			inner.animate({marginTop: element.num + 'px'}, 200, function () {
				element.tru = true;
			});
			return false;
		});
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

	$.floatingAd({
		delay: 60,
		isLinkClosed: true,
		ad:	[{
			'headFilter': 0.3,
			'img': 'images/918open.png',
			'imgHeight': 220,
			//'imgWidth': 176,
			'linkUrl': './htmls/enrollment.html',
			'z-index': 10000,
			'title': '红旗学院',
			'closed-icon': 'images/cha3.png'
		}],
		onClose: function(elem){
			// alert('关闭');
		}
	});
	
	$("#aa").floatingAd({
		onClose:function(elem){}
	});


	//新闻
	var APP_ID = 'GYEONyDaadWBdEEpg1zdN2x6-gzGzoHsz', APP_KEY = 'c6c4gHPn6j3UnHm3vPup2HIa';
	AV.init({appId: APP_ID, appKey: APP_KEY});
	
	var list_query = new AV.Query('Lists');
	list_query.descending('createdAt');
	list_query.find().then(function (res) {
		var testArr = new Array();
		for (var i = 0; i < res.length; i ++) {
			// console.log(res[i].get('title'));
			if (i < 8) { $('#copyright').append('<p><a target=\'_blank\' href=\'htmls/list.html?id='+res[i].id+'\'>＊'+res[i].get('title')+'</a></p>'); };
			testArr.push({id:res[i].id,title:res[i].get('title'),date:changeDate(res[i].updatedAt)});
			// console.log(changeDate(res[i].updatedAt));
		}
		pageChoose(testArr);
	}, function (error) {
		console.log(error);
	});

});

function changeDate(date) {
	if (date.getMonth()+1 < 10) {
		return 2016+'-0'+(date.getMonth()+1)+'-'+date.getDate();
	}
	if (date.getDate() < 10) {
		return 2016+'-'+(date.getMonth()+1)+'-0'+date.getDate();
	}
	return 2016+'-'+(date.getMonth()+1)+'-'+date.getDate();
}

function pageChoose(testArr) {
	var everyPage = 10;
	var newsPage = 0;
	// var newsPagez = parseInt(testArr.length / everyPage);

	// for (var i = 0; i <= newsPagez; i ++) {
	// 	$('#bg_07_c').append('<li>'+ (i + 1) +'</li>');
	// }

	// $('#bg_07_c li').on('click', function () {
	// 	$(this).addClass('active').siblings().removeClass('active');
	// 	newsPage = $(this).index();
	// 	pagenews(newsPage);
	// });
		
	// $('#bg_07_l').on('click', function () {
	// 	if (newsPage <= 0) {return false;};
	// 	newsPage --;
	// 	pagenews(newsPage);
	// });
	// $('#bg_07_r').on('click', function () {
	// 	if (newsPage >= newsPagez) {return false;};
	// 	newsPage ++;
	// 	pagenews(newsPage);
	// });

	// pagenews(newsPage);
	(function pagenews(p) {
		$('#bg_07_ul').html('');
		$('#bg_07_c li').eq(p).addClass('active').siblings().removeClass('active');
		var z = p * everyPage;
		var y = (p + 1) * everyPage;
		for (var i = z; i < y; i ++) {
			if (!testArr[i]) {break;};
			// var lis = '<li><a href=\'javascript:;\'>'+testArr[i]+'</a></li>';
			// $('#bg_07_ul').append(lis);
			var lis = '<li><a target=\'_blank\' href=\'htmls/list.html?id='+testArr[i].id+'\'>＊'+testArr[i].title+'</a><span>'+testArr[i].date+'</span></li>';
			$('#bg_07_ul').append(lis);
		}
	})(newsPage);
}

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