$(document).ready(function($) {
    //Cookies for sticky implementation
    function createCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

   //New Sticky behavior using cookies for home page

    $('.js-close').click(function() {
        $('.b-sticky--index').fadeOut('fast');
        createCookie('govlab-disable-sticky', true, false);
    });

    $(window).scroll(function(){
        if (readCookie('govlab-disable-sticky') == null && $(document).scrollTop() > 500) {
            $('.b-sticky--index').fadeIn('slow');
        } else {
            $('.b-sticky--index').css('display','none');
        }
    });

   //New Sticky behavior using cookies for home page

   $('.js-close-community').click(function() {
    $('.b-sticky--community').fadeOut('fast');
    createCookie('govlab-community-disable-sticky', true, false);
});

$(window).scroll(function(){
    if (readCookie('govlab-community-disable-sticky') == null && $(document).scrollTop() > 500) {
        $('.b-sticky--community').fadeIn('slow');
    } else {
        $('.b-sticky--community').css('display','none');
    }
});


    var $overlay = $('#overlay');

    //Old Sticky behavior
    // var closed = false;
    // $('.js-close').click(function() {
    //     $('.b-sticky').fadeOut('fast');
    //     closed = true;
    // });

    // $(window).scroll(function(){
    //     if (!closed && $(document).scrollTop() > 0) {
    //         $('.b-sticky--index').fadeIn('fast');
    //     } else {
    //         $('.b-sticky--index').css('display','none');
    //     }
    // });

    // Main nav logic
    $('.js-nav-trigger').click(function() {
        $('.b-main-menu').addClass('m-active');
        $overlay.addClass('m-active');
    });

    $overlay.click(function() {
        $('.b-main-menu').removeClass('m-active');
        $(this).removeClass('m-active');
    });

    // Search Field Logic
    // $('.js-search-trigger').click(function() {
    //     $('.e-search').addClass('m-active');
    //     $overlay.addClass('m-active');
    // });

    // $overlay.click(function() {
    //     $('.e-search').removeClass('m-active');
    //     $(this).removeClass('m-active');
    // });

    // Tooltip Logic (OLD)
    // $('.js-tooltip-trigger').click(function() {
    //     $(this).addClass('m-active');
    //     $overlay.addClass('m-active');
    // });

    // Tooltip Logic
    $('.js-tooltip-trigger').click(function(e) {
        e.preventDefault();
        $($(this).attr('data-open')).addClass('m-active');
        $overlay.addClass('m-active');
    });

    $overlay.click(function() {
        // $('.e-project-item').removeClass('m-active');
        $('.b-modal').removeClass('m-active');
        $overlay.removeClass('m-active');
    });

    $('.js-close-modal').click (function (e) {
        e.preventDefault();
        $('.b-modal').removeClass('m-active');
        $overlay.removeClass('m-active');
    });

    // Team page

    // $('.js-bio-toggle').click(function() {
    //     $(this).parent().toggleClass('m-active');
    // })

    // Job board

    $('.js-job-toggle').click(function() {
        $(this).toggleClass('m-active');
        $('#post-' + $(this).attr('id')).toggleClass('m-active');
    })

     // Publications

     $('.sort').click(function() {
        $(this).toggleClass('m-active');
        $(this).siblings().removeClass('m-active');
    })


    // Beth + Stefaan's pages fixes

    // $('.js-project-toggle').click(function() {
    //     $(this).parent().toggleClass('m-show');
    // }) // This one is also present on the team page

    // $('.js-publications-toggle').click(function() {
    //     $(this).parent().toggleClass('m-show-publications');
    // }) // This one is also present on the team page


    // $('.js-articles-toggle').click(function() {
    //     $(this).parent().parent().toggleClass('m-expand');
    // })

    // $('.js-resources-toggle').click(function() {
    //     $(this).parent().parent().toggleClass('m-display');
    // })



    // Search
    $('.js-search-submit').click(function(event) {
        var param = $('.js-search-value').val();
        event.preventDefault();
        if (param != '') {
            window.location.href = "http://thegovlab.org/?s=" + param;
        }
    });

    // Events Page
    $('.e-list-selector .e-show-passed').click(function() {
        $('.e-show-upcoming').removeClass('m-active');
        $(this).addClass('m-active');
        $('.e-show-upcoming').parent().removeClass('m-upcoming');
        $(this).parent().addClass('m-passed');

        $('.b-event-list .e-event-upcoming').hide();
        $('.b-event-list .e-event-passed').show();
    });

    $('.e-list-selector .e-show-upcoming').click(function() {
        $('.e-show-passed').removeClass('m-active');
        $(this).addClass('m-active');
        $('.e-show-passed').parent().removeClass('m-passed');
        $(this).parent().addClass('m-upcoming');

        $('.b-event-list .e-event-passed').hide();
        $('.b-event-list .e-event-upcoming').show();
    });


    $('.js-event-trigger').click(function() {
        $(this).parent().parent().parent().parent().addClass('m-active');
        $overlay.addClass('m-active');
    });

    $('.js-close').click(function() {
        $('.e-event-item').removeClass('m-active');
        // $(this).removeClass('m-active');
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


        // Language switching language 
        $('.js-en').click(function() {
            // Switch Classes for the Project Listing
            $('.m-spanish').addClass('m-hide');
            $('.m-english').removeClass('m-hide');
    
            // Adds 'active' state to the button
            $(this).addClass('m-active');
            $('.js-es').removeClass('m-active');
        });
    
        $('.js-es').click(function() {
            // Switch Classes for the Project Listing
            $('.m-english').addClass('m-hide');
            $('.m-spanish').removeClass('m-hide');
    
            // Adds 'active' state to the button
            $(this).addClass('m-active');
            $('.js-en').removeClass('m-active');
        });
    

    $('.e-banner-container').slick({
        arrows: false,
        draggable: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 800,
            settings: {
                draggable: true,
            }
        }
        ]
    });

    $('.m-prev').click(function() {
        $(this).closest('.e-banner-container').slick('slickPrev');
    });

    $('.m-next').click(function() {
        $(this).closest('.e-banner-container').slick('slickNext');
    });

    $('.b-project-slider').slick({
        arrows: false,
        infinite: false,
        draggable: false,
        centerMode: true,
        slidesToShow: 1,
        variableWidth: true,
        focusOnSelect: true,
        swipeToSlide: true,
        responsive: [
        {
            breakpoint: 800,
            settings: {
                draggable: true,
                slidesToShow: 1,
            }
        }
        ]
    });
});

var render = function(posts) {
    posts.forEach(function (element, index) {
        var title = element.title,
        content = element.content;

        if (title.length > 100) {
            title = title.substr(0, 100) + '...';
        }

        if (content.length > 500) {
            content = content.substr(0, 500) + '...';
        }

        $('.js-article-' + (index + 1) + '-title').text(title);
        $('.js-article-' + (index + 1) + '-author').text(element.author);
        $('.js-article-' + (index + 1) + '-content').html(content);
        $('.js-article-' + (index + 1) + '-link').attr('href', element.link);
    });

    $('.e-banner-container').each(function() {
        var $wraps = $(this).find('.b-featured-content > div.e-wrap'),
        max = Math.max.apply(
            null,
            $wraps.map(function() {
                return $(this).outerHeight(true);
            }).get()
            );

        $wraps.height(max);
    });
};


// Note that this assumes that thegovlab.org has CORS headers.
//This is only temporary to pull specific blog posts instead of the latest
// $.get('http://thegovlab.org/featured-website/feed/', function(xml) {
    $.get('http://thegovlab.org/website-feature/feed/', function(xml) {
    var posts = [];
    $('item', xml).each(function() {
        posts.push({
            title: $('title', this).text(),
            author: $('dc\\:creator', this).text() /* Firefox */ ||
            $('creator', this).text() /* Webkit */,
            content: $('description', this).text(),
            link: $('link', this).text()
        });
    });
    render(posts);
}).error(function(d,e) { console.log(e); });


// functions for the effect on the homepage main banner

(function() {
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // This is a temporary fix for
    // https://github.com/GovLab/www.thegovlab.org/issues/4.
    return;

    // Main
    if (document.getElementById('homepage-banner')) {
        initHeader();
        initAnimation();
        addListeners();
    }

    function initHeader() {
        width = window.innerWidth;
        height = $('#homepage-banner').outerHeight(true);
        target = {x: width / 2, y: height / 2};

        largeHeader = document.getElementById('homepage-banner');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];

        for (var x = 0; x < width; x = x + width / 20) {
            for (var y = 0; y < height; y = y + height / 20) {
                var px = x + Math.random() * width / 20,
                py = y + Math.random() * height / 20,
                p = {x: px, originX: px, y: py, originY: py};

                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for (var i = 0; i < points.length; i++) {
            var p1 = points[i],
            closest = [];

            for(var j = 0; j < points.length; j++) {
                var p2 = points[j];

                if (p1 != p2) {
                    var placed = false;

                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                placed = true;
                                closest[k] = p2;
                            }
                        }
                    }

                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                placed = true;
                                closest[k] = p2;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in points) {
            var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.4)');

            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }

        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = 0,
        posy = 0;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }

        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) {
            animateHeader = false;

        } else {
            animateHeader = true;
        }
    }

    function resize() {
        width = window.innerWidth;
        height = $('#homepage-banner').outerHeight(true);
        canvas.width = width;
        canvas.height = height;
        largeHeader.style.height = height + 'px';
    }

    // animation
    function initAnimation() {
        animate();

        for (var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);

            for(var i in points) {
                // detect points in range
                if (Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.2;

                } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;

                } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;

                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }

        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random()*3, {
            x: p.originX - 50 + Math.random()*100,
            y: p.originY - 50 + Math.random()*100,
            ease:Circ.easeInOut,
            onComplete: function() { shiftPoint(p); }
        });
    }

    // Canvas manipulation
    function drawLines(p) {
        if (!p.active) return;

        for (var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(255,255,255,' + p.active + ')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if (!_this.active) return;

            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,' + _this.active + ')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

})();
