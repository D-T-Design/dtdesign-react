$(document).ready(function() {
    $('.scroll-me a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
        event.preventDefault()
    });
    $('#carousel-slider').carousel({
        interval: 7500
    });
    $.vegas('overlay', {
        src: 'assets/js/vegas/overlays/05.png'
    });
    $('.fancybox-media').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });
    $(window).load(function() {
        var $container = $('#work-div');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: !1
            }
        });
        $('.caetgories a').click(function() {
            $('.categories .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: !1
                }
            });
            return !1
        })
    })
})


$(document).ready(function() {
    $('input').focus(function() {
        $(this).closest('.form-group').find('label').css('color','#ffffff');
    });
    $('textarea').focus(function() {
        $(this).closest('.form-group').find('label').css('color','#ffffff');
    });
    $('input').blur(function() {
        $(this).closest('.form-group').find('label').css('color','rgb(57,171,111)');
    });
    $('textarea').blur(function() {
        $(this).closest('.form-group').find('label').css('color','rgb(57,171,111)');
    });
});

$(function() {
    var form = $('#contact-form');
    var formMessages = $('#form-messages');
    $(form).submit(function(e) {
        e.preventDefault();
        var formData = $(form).serialize();
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');
            $(formMessages).text(response);
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        }).fail(function(data) {
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});

$(document).ready(function() {
    $('body').on('click', function(){
        var navbar = $('.navbar-collapse');
        if (navbar.hasClass('show')) {
            $('.navbar-collapse').collapse('hide');
        };
    });
    $('.navbar-nav>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });
});

 function getYear() {
        document.write(new Date().getFullYear());
    }
