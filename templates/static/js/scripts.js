$(document).ready(function($) {
    var $overlay = $('#overlay');

    $('.js-close').click(function() {
        $('.b-sticky').fadeOut('fast');
    });

    // Main nav logic
    $('.js-nav-trigger').click(function() {
        $('.b-main-menu').addClass('m-active');
        $overlay.addClass('m-active');
    });

    $overlay.click(function() {
        $('.b-main-menu').removeClass('m-active');
        $(this).removeClass('m-active');
    });

    // Search Logic
    $('.js-search-trigger').click(function() {
        $('.e-search').addClass('m-active');
        $overlay.addClass('m-active');
    });

    $overlay.click(function() {
        $('.e-search').removeClass('m-active');
        $(this).removeClass('m-active');
    });

    // Tooltip Logic
    $('.js-tooltip-trigger').click(function() {
        $(this).addClass('m-active');
        $overlay.addClass('m-active');
    });

    $overlay.click(function() {
        $('.e-project-item').removeClass('m-active');
        $overlay.removeClass('m-active');
    });

    // Projects Grid/List View Logic
    $('.js-view-list-trigger').click(function() {
        // Switch Classes for the Project Listing
        $('.b-project-view').addClass('m-list');
        $('.b-project-view').removeClass('m-grid');

        // Adds 'active' state to the button
        $(this).addClass('m-active');
        $('.js-view-grid-trigger').removeClass('m-active');
    });

    $('.js-view-grid-trigger').click(function() {
        // Switch Classes for the Project Listing
        $('.b-project-view').addClass('m-grid');
        $('.b-project-view').removeClass('m-list');

        // Adds 'active' state to the button
        $(this).addClass('m-active');
        $('.js-view-list-trigger').removeClass('m-active');
    });

    $('.swipe').Swipe().data('Swipe');

    $('.m-prev').click(function() {
        $(this).closest('.swipe').data('Swipe').prev();
    });

    $('.m-next').click(function() {
        $(this).closest('.swipe').data('Swipe').next();
    });
});
