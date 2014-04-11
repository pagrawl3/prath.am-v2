$(document).ready(function() {


	//__Functions
	var showContent = function() {
		$('#wrapper').css('opacity', '1');
		$('#loader').css('opacity', '0');
	};

	var hideContent = function() {
		$('#wrapper').css('opacity', '0');
		$('#loader').css('opacity', '1');
	};

	var parallaxScroll = function() {
		var scrolled = $(window).scrollTop();
		$('body').css('backgroundPosition', '0px '+(scrolled*-0.25)+'px');
	};

	var loadPartial = function(partial) {
		hideContent();
		$.get('/partials/'+partial, function(data) {
			setTimeout(function(){
				$('#wrapper').html(data);
				showContent();
			}, 200);
		});
	};

	var showDescriptionPanel = function(x, y, height) {
		$('#project-description').css({
			'opacity' 	: 1,
			'left'		: x,
			'top'		: y,
			'height'	: height-60
		});
		$('#project-details').css({
			'opacity'	: 1,
			'width'		: $('#project-description').width() + 60 + $('article.project').width() + 10,
			'left'		: x-$('article.project').width() - 10,
			'top'		: y+$('article.project').height() + 10,
			'pointer-events' : 'auto'
		});
	}

	var hideDescriptionPanel = function() {
		$('#project-description').css('opacity', '0');
		$('#project-details').css({'opacity': '0', 'pointer-events' : 'none'});
	}

	var showBubble = function(x, y, text) {
		$('.bubble h4').html(text);
		var topPos 	= y - $('.bubble').height() - 20;
		var leftPos = x - $('.bubble').width()/2 + $('li.tech').width()/2;
		$('.bubble').css({
			'opacity'	: 1,
			'top'		: topPos,
			'left'		: leftPos
		});
	};

	var hideBubble = function() {
		setTimeout(function(){
			$('.bubble').css({'opacity': 0});
		}, 0);
	};

	socket = io.connect('/');

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
		window.location.hash = "projects";
		loadPartial('projects');
	});

	$('html').on('click','.profile', function(){
		window.location.hash = "profile";
		loadPartial('profile');
	});

	$('html').on('click','.index', function(){
		window.location.hash = "home";
		loadPartial('index');
	});

	$('html').on('click', '.show-info-wrapper', function(e) {
		$(this).children('.show-info').trigger('click');
		$(this).addClass('hide-info-wrapper');
		$(this).removeClass('show-info-wrapper');
	});
	$('html').on('click', '.hide-info-wrapper', function(e) {
		$(this).children('.hide-info').trigger('click');
		$(this).addClass('show-info-wrapper');
		$(this).removeClass('hide-info-wrapper');
	});

	$('html').on('click', '.show-info', function(e) {
		e.stopPropagation();
		//Calculate
		var descriptionWidth = $('#project-description').width() + 60;
		var selectedElement = $(e.target).parent('article.project');
		var middle = $('body').width()/2;
		var top = $('article.project').first().position().top;
		var leftOffset = (middle - selectedElement.width()/2 - descriptionWidth/2 - 8) - selectedElement.position().left;
		var topOffset = (top) - selectedElement.position().top;
		var This = $(this);
		//Animate
		$('article.project').css({'opacity' : '0', 'top' : '-15px', 'pointer-events': 'none'});
		selectedElement.css({
			'opacity' : '1',
			'left': leftOffset-6,
			'top': topOffset,
			'pointer-events': 'auto'
		});
		
		$('h1.title').html(This.html());
		This.html('BACK');
		This.addClass('hide-info');
		This.removeClass('show-info');

		setTimeout(function(){
			var dX = selectedElement.position().left + selectedElement.width() + 6 + 10;
			var dY = selectedElement.position().top + 6;
			var dH = selectedElement.height();
			showDescriptionPanel(dX, dY, dH);

		}, 300);
	});

	$('html').on('click', '.hide-info', function(e){
		e.stopPropagation();
		$(this).removeClass('hide-info');
		$(this).addClass('show-info');
		$(this).html($('h1.title').html());
		$('h1.title').html('PROJECTS');
		hideDescriptionPanel();
		$('article.project').css({'opacity' : '1', 'top' : '0', 'left': '0', 'pointer-events': 'auto'});
	});

	$('html').on('mouseenter', 'li.tech', function() {
		showBubble($(this).offset().left, $(this).offset().top, $(this).attr('tech-name'));
	})

	$('html').on('mouseleave', 'li.tech', function() {
		hideBubble();
	})

	$(window).scroll(function(){
		parallaxScroll();
	});

	window.addEventListener('hashchange', function() {
		if('' === window.location.hash) {
			window.location.reload();
		}
	});
});
