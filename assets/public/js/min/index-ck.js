$(document).ready(function(){var o=function(){$("#wrapper").css("opacity","1"),$("#wrapper").css("-webkit-transform","scale(0.97, 0.97)"),setTimeout(function(){$("#wrapper").css("-webkit-transform","scale(1, 1)"),$("body").removeClass("no-scroll")},300),$("#loader").css("opacity","0")},e=function(){$("#wrapper").css("opacity","0"),$("#loader").css("opacity","1"),$("#wrapper").css("-webkit-transform","scale(1.03, 1.03)"),setTimeout(function(){$(window).scrollTop(0),300}),$("body").addClass("no-scroll")},n=!1,s,t=function(){n||(s=300,$("#profile-menu").css("top",s),n=!0);var o=$(document).scrollTop();800>o?$("body").css("backgroundPosition","0px "+o*-.25+"px"):$("body").css("backgroundRepeat","no-repeat"),o>s?($("#profile-menu").css("backgroundColor","#000"),$("#profile-menu").css("top",o-22)):($("#profile-menu").css("backgroundColor","transparent"),$("#profile-menu").css("top",s-22))},i=function(n){e(),$.get("/partials/"+n,function(e){setTimeout(function(){$("#wrapper").html(e),o()},200)}),$("nav#side-menu .small.icon").removeClass("selected"),$("nav#side-menu .small.icon."+n).addClass("selected")},c=function(o,e,n,s){$(".bubble h4").html(n);var t=e-$(".bubble").height()-20,i=o-$(".bubble").width()/2+s/2;$(".bubble").css({opacity:1,top:t,left:i})},l=function(){$(".bubble").css({opacity:0})},a=function(o){console.log("going to ",o),$("html, body").animate({scrollTop:$(o).offset().top-120})},r=["projects","profile"],d=window.location.hash.slice(1,window.location.hash.length),u="index";$.each(r,function(o,e){d===e&&(u=e)}),i(u),$("html").on("click",".projects",function(){$("nav#side-menu .small.icon").removeClass("selected"),$("nav#side-menu .small.icon.projects").addClass("selected"),window.location.hash="projects",i("projects")}),$("html").on("click",".profile",function(){$("nav#side-menu .small.icon").removeClass("selected"),$("nav#side-menu .small.icon.profile").addClass("selected"),window.location.hash="profile",i("profile")}),$("html").on("click",".index",function(){$("nav#side-menu .small.icon").removeClass("selected"),$("nav#side-menu .small.icon.index").addClass("selected"),window.location.hash="home",i("index")}),$("html").on("click",".profile-menu-item",function(){a($(this).attr("destination-div"))}),$("html").on("mouseenter","li.tech",function(){c($(this).offset().left,$(this).offset().top,$(this).attr("tech-name"),$(this).width())}),$("html").on("mouseleave","li.tech",function(){l()}),$(window).scroll(function(){t()}),window.addEventListener("hashchange",function(){""===window.location.hash&&window.location.reload()})});