'use strict';

window.jQuery = window.$ = require("jquery");
require('bootstrap-sass/assets/javascripts/bootstrap.js');
require('swiper/dist/js/swiper.jquery.js');
require('lazy-line-painter/jquery.lazylinepainter-1.7.0.js');
require('particles.js/particles.js');
require('./particle-setting.js');
require('./lineart.js');

let distlist = [{
    "name": "debian",
    "displayName": "Debian",
}, {
    "name": "centos",
    "displayName": "CentOS",
}, {
    "name": "fedora",
    "displayName": "Fedora",
}];

$(document).ready(function() {
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        // If we need pagination
        pagination: '.swiper-pagination',
        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
    });

    if (mySwiper.on) {
        mySwiper.on("onSlideChangeStart", function() {
            $('.top').removeClass('top');
            $('#' + distlist[mySwiper.realIndex].name).addClass('top');
        });
    }

    $('#btn-dl').on('mouseover', function() {
        mySwiper.stopAutoplay();
    });

    $('#btn-dl').on('mouseout', function() {
        mySwiper.startAutoplay();
    });

    $('#btn-dl').on('click', function() {
        location.href = "/download/#" + distlist[mySwiper.realIndex].name;
    });

    $('a[data-moveto]').on('click', function() {
        $("html,body").animate({
            scrollTop: $($(this).attr("data-moveto")).offset().top
        });
    });

    $('a[data-moveto]').on('touchend', function() {
        $("html,body").animate({
            scrollTop: $($(this).attr("data-moveto")).offset().top
        });
    });

    $('.closebtn').on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        });
    });

    $('.minbtn').on('click', function() {
        $("html,body").animate({
            scrollTop: $(document).height()
        });
    });

    let prevW = 0;

    $('.maxbtn').on('click', function() {
        if ($("#termart").hasClass("maximized")) {
            $("#termart").removeClass("maximized");
            $("#termart").animate({
                "width": prevW,
                "borderRadius": "5px"
            }, {
                "queue": false
            });
            $("#termart .topbar").animate({
                "borderTopRightRadius": "5px"
            }, {
                "queue": false
            });
            $("#termart .topbar").animate({
                "borderTopLeftRadius": "5px"
            }, {
                "queue": false
            });
            $("#termart .prompt").css({
                "display": "none"
            });
        } else {
            $("#termart").addClass("maximized");
            prevW = $("#termart").css("width");
            $("#termart").animate({
                "width": "100%",
                "borderRadius": "0"
            }, {
                "queue": false
            });
            $("#termart .topbar").animate({
                "borderRadius": "0"
            }, {
                "queue": false
            });
            $("#termart .prompt").css({
                "display": "inline"
            });
        }
    });
});
