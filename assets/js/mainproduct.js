$('.SMainProduct').each(function() {
	var $slider = $(this).find('.SMainProduct-Slider');
	var $pagination = $(this).find('.SMainProduct-Pagination');
	var $bullets = $(this).find('.CMainProductNav');
	var $prev = $(this).find('.SMainProduct-Prev');
	var $next = $(this).find('.SMainProduct-Next');

	swiper = new Swiper($slider, {
		speed: 400,
		spaceBetween: 30,
		loop: true,
		effect: 'fade',
		autoHeight: true,
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: $pagination,
			renderBullet: function(index, className) {
				// return '<span class="' + className + '">' + (index + 1) + '</span>';
				console.log($($bullets[0]).html())
				return $('<div>').append($($bullets[index]).addClass(className)).html()
			},
			clickable: true,
			bulletClass: 'SMainProduct-Bullet',
			bulletActiveClass: 'active'
		},
		navigation: {
			nextEl: $next,
			prevEl: $prev
		}
	});

})