(function ($) {
    'use strict';

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

//accordian css
//   var acc = document.getElementsByClassName("accordion");
//   var i;

//   for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//       this.classList.toggle("active");
//       var panel = this.nextElementSibling;
//       console.log(panel);
//       if (panel.style.maxHeight) {
//         panel.style.maxHeight = null;
//       } else {
//         panel.style.maxHeight = panel.scrollHeight + "px";
//       } 
//     });
//   }

// var acc = document.getElementsByClassName("accordion");
// var i;
// for (i = 0; i < acc.length; i++) {
//     acc[i].onclick = function () {
//         for (var j = 0; j < acc.length; j++) {
//             acc[j].nextElementSibling.style.maxHeight = null;
//             acc[j].classList.remove('active');
//         }
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//             panel.style.maxHeight = null;
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//     }
// }

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

// Newsletter API:
// http://staging.eduauraa.com/website/pushwebdata
// {
//     "appcode":"NWL",
//     "email":"some@email.com",
//     "ipaddress":"202.10.10.10",
//  "referrallink":"http:/sdsdsddsds/"
// }

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
    console.log(fname + " " + lname + " " + email + " " + phone);

    let referrer = document.referrer;

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

    if (fname != '' && lname != '' && email != '' && phone != '') {
        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            console.log("success!");
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
    } else {
        alert("Please fill all the deatils!");
        console.log("Fill details!");
    }
}

function contactUs() {
    var fname = document.forms['contactForm']['fname'].value;
    var email = document.forms['contactForm']['email'].value;
    var phone = document.forms['contactForm']['phone'].value;
    var messg = document.forms['contactForm']['message'].value;
    console.log(fname + " " + lname + " " + email + " " + phone);

    let referrer = document.referrer;

    if (referrer === '') {
        referrer = 'http://eduauraa.com';
    }

    let mailData = {
        "appcode": "TWU",
        "mobile": phone,
        "firstname": fname,
        "lastname": '',
        "email": email,
        "message": messg,
        "ipaddress": localStorage.getItem('ipAdress'),
        "referrallink": referrer
    }

    if (fname != '' && messg != '' && email != '' && phone != '') {
        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            console.log("success!");
            alert('Thank you for the details!');
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
    } else {
        alert('Please fill all the details!');
        console.log("fill details!");
    }
}

function redirectLogin() {
    window.open("http://web.eduauraa.com", "_blank");
}

function sendMobileNumber() {
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

    if (mobileNumb != '') {
        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            alert('Thank you for the details!');
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
        alert('Please enter mobile number');
    }
}

function sendClassMobileNumber() {
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

    if (mobileNumb != '') {
        fetch('http://staging.eduauraa.com/website/pushwebdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(mailData)
        }).then((data) => {
            alert('Thank you for the details!');
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
        alert('Please enter mobile number');
    }
}