var contactURL = 'http://13.233.163.224:8000/webportal/api/web-enquiries/create/';
var totalCountURL = 'http://13.233.163.224:8000/lms/api/null/null/website-count';
var saveMobileURL = 'http://13.233.163.224:8000/webportal/api/save-mobile/'
var token = 'Bearer NyyRqHe3Z9tLQGI5FB6WmTzG2tYf1N';
$('.m-error').addClass('hidden');

getTotalCount();

(function ($) {
    'use strict';

    $('#form-data-thankyou').css('display', 'none');
    $('#form-data-title').css('display', 'block');

    // Sticky Menu
    $(window).scroll(function () {
        if ($('header').offset().top > 10) {
            $('.top-header').addClass('hide');
            $('.navigation').addClass('nav-bg');
        } else {
            $('.top-header').removeClass('hide');
            $('.navigation').removeClass('nav-bg');
        }
    });

    // Background-images
    $('[data-background]').each(function () {
        $(this).css({
            'background-image': 'url(' + $(this).data('background') + ')'
        });
    });

    //Hero Slider
    $('.hero-slider').slick({
        autoplay: true,
        autoplaySpeed: 7500,
        pauseOnFocus: false,
        pauseOnHover: false,
        infinite: true,
        arrows: true,
        fade: true,
        prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
        nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
        dots: true
    });
    $('.hero-slider').slickAnimation();

    // venobox popup
    $(document).ready(function () {
        $('.venobox').venobox();
    });


    // mixitup filter
    var containerEl = document.querySelector('[data-ref~="mixitup-container"]');
    var mixer;
    if (containerEl) {
        mixer = mixitup(containerEl, {
            selectors: {
                target: '[data-ref~="mixitup-target"]'
            }
        });
    }

    //  Count Up
    function counter() {
        var oTop;
        if ($('.count').length !== 0) {
            oTop = $('.count').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            $('.count').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    }

    $(window).on('scroll', function () {
        counter();
    });

})(jQuery);

$(function () {
    var $elements = $('.animateBlock.notAnimated'); //contains all elements of nonAnimated class
    var $window = $(window);
    $window.on('scroll', function (e) {
        $elements.each(function (i, elem) { //loop through each element
            if ($(this).hasClass('animated')) // check if already animated
                return;
            animateMe($(this));
        });
    });
});

function animateMe(elem) {
    var winTop = $(window).scrollTop(); // calculate distance from top of window
    var winBottom = winTop + $(window).height();
    var elemTop = $(elem).offset().top; // element distance from top of page
    var elemBottom = elemTop + $(elem).height();
    if ((elemBottom <= winBottom) && (elemTop >= winTop)) {
        // exchange classes if element visible
        $(elem).removeClass('notAnimated').addClass('animated');
    }
}

function getAPI() {
    //get ip address
    $.get("https://ipinfo.io", function (response) {
        localStorage.setItem('ipAdress', response.ip);
    }, "json");
}

//send register request to database
//function to send post request

function getIpAddress() {
    return $.get('https://ipinfo.io', function (response) {
        return response.ip;
    });
}

function postEmailData() {
    // event.preventDefault();

    // ipaddress = $.get("https://ipinfo.io", function (response) {
    //     alert(response.ip);
    //     return response.ip;
    // }, "json");
    var ipaddress = getIpAddress();

    let email = document.getElementById('newsletter').value;
    // let body = document.getElementById('body').value;
    console.log(email);
    console.log(ipaddress);

    const emailData = {
        "appcode": "NWL",
        "email": email,
        "ipaddress": '',
        "referrallink": "http:/sdsdsddsds/"
    };

    console.log(emailData);

    // fetch('http://staging.eduauraa.com/website/pushwebdata', {
    //     method: 'POST',
    //     headers : new Headers(),
    //     body:JSON.stringify({tittle:tittle, body:body})
    // }).then((res) => res.json())
    // .then((data) =>  console.log(data))
    // .catch((err)=>console.log(err))
}

function changeGrade(id) {
    console.log(id);
    var className = document.getElementById(id).innerHTML;
    document.cookie = className;
}

window.onload = function () {
    getAPI();
}

function validateRegister() {
    var fname = document.forms['registerForm']['fname'].value;
    var lname = document.forms['registerForm']['lname'].value;
    var email = document.forms['registerForm']['email'].value;
    var phone = document.forms['registerForm']['phone'].value;

    let referrer = document.referrer;

    var form = $("#form-data")

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (fname == '' || lname == '' || email == '' || phone == '') {
        form.addClass('was-validated');
    } else {
        if (referrer === '') {
            referrer = 'http://eduauraa.com';
        }

        let mailData = {
            "appcode": "CTF",
            "mobile": phone,
            "firstname": fname,
            "lastname": lname,
            "email": email,
            "message": '',
            "ipaddress": localStorage.getItem('ipAdress'),
            "referrallink": referrer
        }

        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            console.log("success!");
            $('#form-data-thankyou').css('display', 'block');
            $('#form-data-title').css('display', 'none');
            var message = document.getElementById('message-thank-you');
            var formData = document.getElementById('form-data');
            var formDataTitle = document.getElementById('form-data-title');
            formDataTitle.style.display = 'none';
            formData.style.display = 'none';
            message.style.display = 'block';
            if (data.status != 200) {
                console.log(error);
            } else {
                data.json().then(data => {
                    console.log(data)
                })
            }
        });
    }
}

function contactUs() {
    var fname = document.forms['contactForm']['fname'].value;
    var email = document.forms['contactForm']['email'].value;
    var phone = document.forms['contactForm']['phone'].value;
    var messg = document.forms['contactForm']['message'].value;
    console.log(fname + " " + lname + " " + email + " " + phone);

    // Fetch form to apply custom Bootstrap validation
    var form = $("#contactForm");

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    let referrer = document.referrer;

    if (referrer === '') {
        referrer = 'http://eduauraa.com';
    }

    let mailData = {
        "appcode": "CTF",
        "mobile": phone,
        "firstname": fname,
        "lastname": '',
        "email": email,
        "message": messg,
        "ipaddress": localStorage.getItem('ipAdress'),
        "referrallink": referrer
    }

    if (fname != '' && messg != '' && email != '' && phone != '') {

        var mob = /^[7-9]{1}[0-9]{9}$/;

        if (mob.test(phone) == false) {
            $('.m-error').removeClass("hidden");
        } else {
            //save data
            fetch('http://staging.eduauraa.com/website/pushwebdata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(mailData)
            }).then((data) => {
                console.log("success!");
                // alert('Thank you for the details!');
                var form = document.getElementById('contact-data');
                form.reset();
                if (data.status != 200) {
                    console.log(error);
                } else {
                    data.json().then(data => {
                        console.log(data)
                    })
                }
            });

            sendContactData(mailData);
        }

    } else {
        form.addClass('was-validated');
    }
}

function sendContactData(contactData) {
    try {
        var request_ = new XMLHttpRequest();
        request_.open('POST', contactURL);
        request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send(JSON.stringify(contactData));
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj);
                var form = document.getElementById('contactForm');
                form.reset();
                $('#thankyouContactModal').modal('show');
            } else {
                $('#failedContactModal').modal('show');
            }
        }
    } catch (error) {
        $('#failedContactModal').modal('show');
    }
}

function redirectLogin() {
    window.open("http://web.eduauraa.com", "_blank");
}

function sendMobileNumber() {
    $('.m-error').addClass('hidden');
    let mobileNumb = document.getElementById('mobilenumb').value;

    let referrer = document.referrer;

    if (referrer === '') {
        referrer = 'http://eduauraa.com';
    }

    let mailData = {
        "appcode": "MBR",
        "mobile": mobileNumb,
        "ipaddress": localStorage.getItem('ipAdress'),
        "referrallink": referrer
    }

    let mobileData = {
        "mobile": mobileNumb
    }

    if (mobileNumb != '') {
        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            document.getElementById('mobilenumb').value = '';
            if (data.status != 200) {
                console.log(error);
            } else {
                data.json().then(data => {
                    console.log(data)
                })
            }
        });
    } else {
        console.log("Please enter mobile number!");
        $('.m-error').removeClass('hidden');
    }

    saveMobileNumber(mobileData);
}

function sendClassMobileNumber() {
    $('.m-error').addClass('hidden');
    let mobileNumb = document.getElementById('mobilenumb_class').value;

    let referrer = document.referrer;

    if (referrer === '') {
        referrer = 'http://eduauraa.com';
    }

    let mailData = {
        "appcode": "MBR",
        "mobile": mobileNumb,
        "ipaddress": localStorage.getItem('ipAdress'),
        "referrallink": referrer
    }

    let mobileData = {
        "mobile": mobileNumb
    }

    if (mobileNumb != '') {
        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            // alert('Thank you for the details!');
            document.getElementById('mobilenumb_class').value = '';
            if (data.status != 200) {
                console.log(error);
            } else {
                data.json().then(data => {
                    console.log(data)
                })
            }
        });
    } else {
        console.log("Please enter mobile number!");
        $('.m-error').removeClass('hidden');
    }

    saveMobileNumberSTT(mobileData);
}

function saveMobileNumber(mobileData) {
    try {
        var request_ = new XMLHttpRequest();
        request_.open('POST', saveMobileURL);
        request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send(JSON.stringify(mobileData));
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj);
                document.getElementById('mobilenumb_class').value = '';
                $('#thankyouContactModal').modal('show');
            } else {
                $('#failedContactModal').modal('show');
                document.getElementById('mobilenumb_class').value = '';
            }
        }
    } catch (error) {
        $('#failedContactModal').modal('show');
        document.getElementById('mobilenumb_class').value = '';
    }
}

function saveMobileNumber(mobileData) {
    try {
        var request_ = new XMLHttpRequest();
        request_.open('POST', saveMobileURL);
        request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send(JSON.stringify(mobileData));
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj);
                document.getElementById('mobilenumb').value = '';
                $('#thankyouContactModal').modal('show');
            } else {
                $('#failedContactModal').modal('show');
                document.getElementById('mobilenumb').value = '';
            }
        }
    } catch (error) {
        $('#failedContactModal').modal('show');
        document.getElementById('mobilenumb').value = '';
    }
}

(function ($) {
    'use strict';

    $(function () {

        $(document).ready(function () {
            function triggerClick(elem) {
                $(elem).click();
            }
            var $progressWizard = $('.stepper'),
                $tab_active,
                $tab_prev,
                $tab_next,
                $btn_prev = $progressWizard.find('.prev-step'),
                $btn_next = $progressWizard.find('.next-step'),
                $tab_toggle = $progressWizard.find('[data-toggle="tab"]'),
                $tooltips = $progressWizard.find('[data-toggle="tab"][title]');

            // To do:
            // Disable User select drop-down after first step.
            // Add support for payment type switching.

            //Initialize tooltips
            $tooltips.tooltip();

            //Wizard
            $tab_toggle.on('show.bs.tab', function (e) {
                var $target = $(e.target);

                if (!$target.parent().hasClass('active, disabled')) {
                    $target.parent().prev().addClass('completed');
                }
                if ($target.parent().hasClass('disabled')) {
                    return false;
                }
            });

            // $tab_toggle.on('click', function(event) {
            //     event.preventDefault();
            //     event.stopPropagation();
            //     return false;
            // });

            $btn_next.on('click', function () {
                $tab_active = $progressWizard.find('.active');

                $tab_active.next().removeClass('disabled');

                $tab_next = $tab_active.next().find('a[data-toggle="tab"]');
                triggerClick($tab_next);

            });
            $btn_prev.click(function () {
                $tab_active = $progressWizard.find('.active');
                $tab_prev = $tab_active.prev().find('a[data-toggle="tab"]');
                triggerClick($tab_prev);
            });
        });
    });

}(jQuery, this));

$(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allPrevBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

function closedRegisterForm() {
    $('#form-data')[0].reset();
    $('#form-data').css('display', 'block');
    $('#form-data-thankyou').css('display', 'none');
    $('#form-data-title').css('display', 'block');
    $('#message-thank-you').css('display', 'none');
}

function validateTeacherRegister() {
    var fname = document.forms['registerForm']['fname'].value;
    var lname = document.forms['registerForm']['lname'].value;
    var email = document.forms['registerForm']['email'].value;
    var phone = document.forms['registerForm']['phone'].value;

    let referrer = document.referrer;

    var form = $("#form-data")

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (fname == '' || lname == '' || email == '' || phone == '') {
        form.addClass('was-validated');
    } else {
        if (referrer === '') {
            referrer = 'http://eduauraa.com';
        }

        let mailData = {
            "appcode": "TWU",
            "mobile": phone,
            "firstname": fname,
            "lastname": lname,
            "email": email,
            "message": '',
            "ipaddress": localStorage.getItem('ipAdress'),
            "referrallink": referrer
        }

        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            console.log("success!");
            $('#form-data-thankyou').css('display', 'block');
            $('#form-data-title').css('display', 'none');
            var message = document.getElementById('message-thank-you');
            var formData = document.getElementById('form-data');
            var formDataTitle = document.getElementById('form-data-title');
            formDataTitle.style.display = 'none';
            formData.style.display = 'none';
            message.style.display = 'block';
            if (data.status != 200) {
                console.log(error);
            } else {
                data.json().then(data => {
                    console.log(data)
                })
            }
        });
    }
}

function getTotalCount() {
    try {
        var request_ = new XMLHttpRequest();
        request_.open('GET', totalCountURL);
        request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj);

                $('.total-videos').html(obj.video);
                $('.total-ebooks').html(obj.ebook);
                $('.total-testpaper').html(obj.test_papers);
                $('.total-mentors').html(obj.tutors);

                // $('.total-videos').attr('data-count') = obj.video;
                // $('.total-ebooks').attr('data-count') = obj.ebook;
                // $('.total-testpaper').attr('data-count') = obj.test_papers;
                // $('.total-mentors').attr('data-count') = obj.tutors;

            } else {
                $('.total-videos').html('0');
                $('.total-ebooks').html('0');
                $('.total-testpaper').html('0');
                $('.total-mentors').html('0');
            }
        }
    } catch (error) {
        $('.total-videos').html('0');
        $('.total-ebooks').html('0');
        $('.total-testpaper').html('0');
        $('.total-mentors').html('0');
    }
}

$('.carousel-item', '.multi-item-carousel').each(function () {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
}).each(function () {
    var prev = $(this).prev();
    if (!prev.length) {
        prev = $(this).siblings(':last');
    }
    prev.children(':nth-last-child(2)').clone().prependTo($(this));
});

$('#carouselExample').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});