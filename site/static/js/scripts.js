$(document).ready(function($) {
   
$('.js-close').click(function() {
    $('.b-sticky').fadeOut('fast');
});

// Main nav logic
$('.js-nav-trigger').click(function() {
    $('.b-main-menu').addClass('m-active');
    $('#overlay').addClass('m-active');
});

$('#overlay').click(function() {
    $('.b-main-menu').removeClass('m-active');
    $(this).removeClass('m-active');
});


// Search Logic
$('.js-search-trigger').click(function() {
    $('.e-search').addClass('m-active');
    $('#overlay').addClass('m-active');
});

$('#overlay').click(function() {
    $('.e-search').removeClass('m-active');
    $(this).removeClass('m-active');
});

// Tooltip Logic
$('.js-tooltip-trigger').click(function() {
    $(this).toggleClass('m-active');
});










// Sample Click Feature with overlay
// $('.triggerClass').click(function() {
//     $('.menuClass').toggleClass('m-active');
//     $('#overlay').toggleClass('m-active');
// });

// $('#overlay').click(function() {
//     $('.menuClass').removeClass('m-active');
//     $(this).removeClass('m-active');
// });

});