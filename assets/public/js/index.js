$(document).ready(function() {


	//__Functions
	var showContent = function() {
		$('#wrapper').css('opacity', '1');
		$('#wrapper').css('-webkit-transform', 'scale(0.97, 0.97)');
		setTimeout(function(){
			$('#wrapper').css('-webkit-transform', 'scale(1, 1)');
		},300);
		$('#loader').css('opacity', '0');
	};

	var hideContent = function() {
		$('#wrapper').css('opacity', '0');
		$('#loader').css('opacity', '1');
		$('#wrapper').css('-webkit-transform', 'scale(1.03, 1.03)');
	};

	var parallaxScroll = function() {
		var scrolled = $(window).scrollTop();
		if (scrolled<800)
			$('body').css('backgroundPosition', '0px '+(scrolled*-0.25)+'px');
		else {
			$('body').css('backgroundRepeat', 'no-repeat');
		}
	};

	var loadPartial = function(partial) {
		hideContent();
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
