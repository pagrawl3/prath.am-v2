$(document).ready(function() {


	//__Functions
	var showContent = function() {
		$('#wrapper').css('opacity', '1');
		$('#wrapper').css('-webkit-transform', 'scale(0.97, 0.97)');
		$('#wrapper').css('-moz-transform', 'scale(0.97, 0.97)');
		setTimeout(function(){
			$('#wrapper').css('-webkit-transform', 'scale(1, 1)');
			$('#wrapper').css('-moz-transform', 'scale(1, 1)');
			$('body').removeClass('no-scroll');
		},300);
		$('#loader').css('opacity', '0');
	};

	var hideContent = function() {
		$('#wrapper').css('opacity', '0');
		$('#loader').css('opacity', '1');
		$('#wrapper').css('-webkit-transform', 'scale(1.03, 1.03)');
		setTimeout(function(){$(window).scrollTop(0), 300});
		$('body').addClass('no-scroll');

	};

	var once = false;
	var initScrollTop;
	var parallaxScroll = function() {
		if (!once) {
			initScrollTop = 300;
			$('#profile-menu').css('top', initScrollTop);
			once = true;
		}
		var scrolled = $(document).scrollTop();
		if (scrolled<800)
			$('body').css('backgroundPosition', '0px '+(scrolled*-0.25)+'px');
		else {
			$('body').css('backgroundRepeat', 'no-repeat');
		}
		if (scrolled > initScrollTop) {
			// $('#profile-menu').css('position', 'fixed');
			// $('#profile-menu').css('top', '0');
			$('#profile-menu').css('backgroundColor', '#000');
			$('#profile-menu').css('top', (scrolled - 22));
		} else {
			$('#profile-menu').css('backgroundColor', 'transparent');
			$('#profile-menu').css('top', initScrollTop-22);
		}
	};

	var loadPartial = function(partial) {
		hideContent();
		// $("html, body").animate({ scrollTop: 1 }, 50);
		$.get('/partials/'+partial, function(data) {
			setTimeout(function(){
				$('#wrapper').html(data);
				showContent();
			}, 200);
		});

		$('nav#side-menu .small.icon').removeClass('selected');
		$('nav#side-menu .small.icon.'+partial).addClass('selected');
	};

	var showBubble = function(x, y, text, w) {
		$('.bubble h4').html(text);
		var topPos	= y - $('.bubble').height() - 20;
		var leftPos = x - $('.bubble').width()/2 + w/2;
		$('.bubble').css({
			'opacity'	: 1,
			'top'		: topPos,
			'left'		: leftPos
		});
	};

	var hideBubble = function() {
		$('.bubble').css({'opacity': 0});
	};

	var goToDiv = function(div) {
		console.log('going to ', div);
		$("html, body").animate({ scrollTop: $(div).offset().top - 120 });
	}

	// var socket = io.connect('/');

	//__Client Side Router
	var routes = ['projects', 'profile'];
	var currentRoute = window.location.hash.slice(1,window.location.hash.length);
	var partial = 'index';
	$.each(routes, function(i,value) {
		if (currentRoute === value) {
			partial = value;
		}
	});
	loadPartial(partial);
	
	//__Event Listeners
	$('html').on('click','.projects', function(){
		$('nav#side-menu .small.icon').removeClass('selected');
		$('nav#side-menu .small.icon.projects').addClass('selected');
		window.location.hash = "projects";
		loadPartial('projects');
	});

	$('html').on('click','.profile', function(){
		$('nav#side-menu .small.icon').removeClass('selected');
		$('nav#side-menu .small.icon.profile').addClass('selected');
		window.location.hash = "profile";
		loadPartial('profile');
	});

	$('html').on('click','.index', function(){
		$('nav#side-menu .small.icon').removeClass('selected');
		$('nav#side-menu .small.icon.index').addClass('selected');
		window.location.hash = "home";
		loadPartial('index');
	});

	$('html').on('click','.profile-menu-item', function(){
		goToDiv($(this).attr('destination-div'));
	});

	$('html').on('mouseenter', 'li.tech', function() {
		showBubble($(this).offset().left, $(this).offset().top, $(this).attr('tech-name'), $(this).width());
	});

	$('html').on('mouseleave', 'li.tech', function() {
		hideBubble();
	});

	$(window).scroll(function(){
		parallaxScroll();
	});

	window.addEventListener('hashchange', function() {
		if('' === window.location.hash) {
			window.location.reload();
		}
	});
});
