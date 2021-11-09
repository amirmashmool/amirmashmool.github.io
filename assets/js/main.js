/**
 * Created by stanley on 12/31/14.
 */

 toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

$(document).ready(function() {
    var $component = $('#component');

    $('#resume-link').on('click', function(e) {
        e.preventDefault();
        // if resume component is already loaded:
        if ($('#_0_').length)
            return;
        $component.fadeOut(400, function() {
            $component.load('resume', function() {
                resume();
                $(this).fadeIn(400);
            });
        });
    });
 
 
  $('#publication-link').on('click', function(e) {
        e.preventDefault();
        // if publication component is already loaded:
        if ($('#_2_').length)
            return;
        $component.fadeOut(400, function() {
            $component.load('publication', function() {
                resume();
                $(this).fadeIn(400);
            });
        });
    });
 
 
 
  $('#pub-link').on('click', function(e) {
        e.preventDefault();
        // if publication component is already loaded:
        if ($('#_5_').length)
            return;
        $component.fadeOut(400, function() {
            $component.load('pub2', function() {
                resume();
                $(this).fadeIn(400);
            });
        });
    });
 
 
 
 

    $('#gallery-link').on('click', function(e) {
        e.preventDefault();
        // if gallery component is already loaded:
        if ($('#_1_').length)
            return;
        $component.fadeOut(400, function() {
            $component.load('gallery', function() {
                gallery();
                $(this).fadeIn(400);
            });
        });
    });

    $component.load('resume', resume);
});






var minimal = false;

function resume() {
    var $sidebar = $('#sidebar');

    var $sidebar_minimal = $('#sidebar-minimal');
    $sidebar_minimal.hide();

    var $contact_me = $('#contact-me');
    $contact_me.hide();

    $sidebar_minimal.affix({
        offset: {
            top: 76
        }
    });

    $contact_me.affix({
        offset: {
            top: 76
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            return;
        }

        if (!minimal) {
            $sidebar.show();
        }

        else {
            $contact_me.show();
            $sidebar_minimal.show();
        }

        adjustSidebar();
    });

    adjustSidebar();

    $(window).on('scroll', adjustSidebar);

    $('#language').tags({
        readOnly: true,
        tagSize: 'sm',
        tagData: [
            'C',
            'C++',
            'Java',
            'Python',
            'Verilog HDL'
        ]
    });
    $('#web').tags({
        readOnly: true,
        tagSize: 'sm',
        tagData: [
            'J2EE',
            'App Engine',
            'HTML',
            'CSS',
            'Javascript'
        ]
    });
    $('#vv').tags({
        readOnly: true,
        tagSize: 'sm',
        tagData: [
            'Selenium',
            'Alloy',
            'ReAssert',
            'Korat',
            'JPF'
        ]
    });
    $('#fw').tags({
        readOnly: true,
        tagSize: 'sm',
        tagData: [
            'Android',
            'Guava',
            'HIBERNATE (ORM)'
        ]
    });
    $('#pm').tags({
        readOnly: true,
        tagSize: 'sm',
        tagData: [
            'Git',
            'Maven',
            'Jenkins'
        ]
    });
    $('#os').tags({
        readOnly: true,
        tagSize: 'sm',
        tagData: [
            'Linux',
            'Mac',
            'Windows'
        ]
    });
    $('#hobby').tags({
        readOnly: true,
        tagSize: 'sm',
        tagData: [
            'Music',
            'TV Shows',
            'Video Games',
            'Photography'
        ]
    });

    var myEmailList = [
    'mashmol.amir@gmail.com', 
   ]

    $('#send-email-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#guest-name').val().trim();
        var email = $('#guest-email').val().trim();
        var msg = $('#guest-msg').val().trim();

        if (myEmailList.indexOf(email) > -1) {
            toastr.error('Please enter your own email address!');
            return;
        }
        
        var data = {
            name: name,
            email: email,
            message: msg
        };
        $.ajax({
            type: 'POST',
            url: 'contact.php',
            data: data,
            success: function() {
                toastr.success('Your message has been sent.');
            },
            error: function() {
                toastr.success('Message has not been sent!');
            }
        });
    });

    function adjustSidebar() {
        if ($(window).width() < 768) {
            $sidebar.hide();
            $contact_me.hide();
            $sidebar_minimal.hide();
            return;
        }

        if (!minimal && $(window).scrollTop() >= 180) {
            minimal = true;

            $sidebar.animate({ "margin-top": "-=720px" }, 400);
            $sidebar.fadeTo("fast", 0.3);

            $sidebar_minimal.show();
            $sidebar_minimal.animate({ "margin-top": "+=240px" }, 400);

            $contact_me.show();
            $contact_me.animate({ "margin-left": "+=240px" }, 400);
        }

        else if (minimal && $(window).scrollTop() < 180) {
            minimal = false;
            $sidebar_minimal.hide();
            $sidebar_minimal.animate({ "margin-top": "-=240px" }, "fast");

            $contact_me.hide();
            $contact_me.animate({ "margin-left": "-=240px" }, "fast");
            
            $sidebar.animate({ "margin-top": "+=720px" }, 300);
            $sidebar.fadeTo("fast", 1);
        }
    }
}

function gallery() {
    $('#loading').html('<div style="position: absolute; top: 50%; left:50%;"><div class="dots">Loading...</div></div>');

    var $container = $('#img_container');

    $(window).off('scroll');

    $container.imagesLoaded().always(function(instance) {
        $('#loading').html('');

        $container.packery({
            gutter: 10,
            columnWidth: '.img_item',
            itemSelector: '.img_item'
        });

        $container.find('.img_item').each(function(i, itemElem) {
            var draggie = new Draggabilly( itemElem );
            $container.packery('bindDraggabillyEvents', draggie);
        });

        $container.css('visibility', 'visible');
    });
}
