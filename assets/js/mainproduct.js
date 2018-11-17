$('.SMainProduct').each(function() {
	$slider = $(this).find('.SMainProduct-Slider');
	$pagination = $(this).find('.SMainProduct-Pagination');
	$bullets = $(this).find('.CMainProductNav');

	swiper = new Swiper($slider, {
		speed: 400,
		spaceBetween: 30,
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
		}
	});

})