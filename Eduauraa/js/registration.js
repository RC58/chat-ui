var messageBlock = document.getElementById('mobile-number');
var basicDetailsBlock = document.getElementById('register-basic-details');
var otpBlock = document.getElementById('otp');
var classBlock = document.getElementById('form-class');
var joinCourseBlock = document.getElementById('join-course');
var otpErrorMessage = document.getElementById('validate-otp-message');
var globalOTP = '';
var currentGrade = '';
const course_reg = 'CLASS_6_TO_10';
// http://13.233.163.224:8000
const commonDomain = 'http://13.233.163.224:8000';
const boardURL = commonDomain + '/lms/api/board-list/?course=' + course_reg;
const gradeURL = commonDomain + '/lms/api/grade-list/?search=';
const countURL = commonDomain + '/lms/api/';
var saveDataURL = commonDomain + '/webportal/api/web-enquiries/create/';
var pushDataURL = 'http://staging.eduauraa.com/website/pushwebdata';
var mobileValidate = commonDomain + '/webportal/api/mobile-validate/';
$('.otp-resend').css('display', 'none');
$('.m-error').addClass("hidden");
$('.c-error').addClass('hidden');

var token = 'Bearer NyyRqHe3Z9tLQGI5FB6WmTzG2tYf1N';

getIPAddress();
getRegBoardData(token, boardURL);
getRegGradeData(token, gradeURL);

const spinnerDefault = document.getElementById("spinner");

//get board data from api
function getRegBoardData(token, url) {
    try {
        var request_ = new XMLHttpRequest();
        request_.open("GET", url, true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.status == 201 || request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                localStorage.setItem('regBoardID', obj[0].id);
                console.log(obj);
                // handle data as needed...
                var grades = document.getElementById('board');
                grades.innerHTML = "";
                grades.options[grades.options.length] = new Option('Select Board', '');
                obj.forEach((setBoard) => {
                    boardSelect = document.getElementById('board');
                    boardSelect.options[boardSelect.options.length] = new Option(setBoard.name, setBoard.id);
                });

            } else {
                console.log(request_.status);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

//get grade data from api
function getRegGradeData(token, url) {
    try {
        var request_ = new XMLHttpRequest();
        request_.open("GET", url + 'ICSE&course=CLASS_6_TO_10', true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj);
                localStorage.setItem('regGradeID', obj[0].id);
                // handle data as needed...
                obj.forEach((setGrade) => {
                    $(".radio-tile-group.class-selection").append(`<div class="input-container"><input class="radio-button" type="radio" name="radio" value="${setGrade.name}" onclick="getValue('${setGrade.name}', '${setGrade.id}')" id="${setGrade.id}"/><div class="radio-tile"><label class="radio-tile-label">${setGrade.code}</label></div></div>`);
                });
            } else {
                console.log(request_.status);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function showRegSpinner() {
    spinnerDefault.className = "show";
}

function closedRegSpinner() {
    spinnerDefault.className = spinnerDefault.className.replace("show", "");
}

function sendOTP() {
    $('.m-register').html('');

    //form data
    var mobileNumber = document.forms['registerFormMobile']['mnumber'];

    // Fetch form to apply custom Bootstrap validation
    var form = $("#register_mobile");

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (mobileNumber.value == '') {
        form.addClass('was-validated');
    } else {
        var mob = /^[7-9]{1}[0-9]{9}$/;

        if (mob.test(mobileNumber.value) == false) {
            $('.m-error').removeClass("hidden");
        } else {
            $('.m-error').addClass("hidden");
            isExistingUser(mobileNumber.value);
        }
    }
}

function isExistingUser(mblNum) {
    showRegSpinner();
    try {
        var userData = {
            "appcode": "MBR",
            "mobile": mblNum
        }

        var request_ = new XMLHttpRequest();

        request_.open('POST', mobileValidate);

        request_.setRequestHeader('Content-Type', 'application/json');

        request_.send(JSON.stringify(userData));

        request_.onreadystatechange = () => {
            if (request_.status == 201 || request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj);
                if (obj.message == 'Mobile number already registered. ') {
                    $('.m-register').html(obj.message);
                    closedRegSpinner();
                } else {
                    $('.m-register').html('');
                    gotoOtpPage(mblNum);
                    closedRegSpinner();
                }
            } else {
                $('.m-register').html('Failed to validate your mobile number');
                console.log(request_.status);
                closedRegSpinner();
            }
        }
    } catch (error) {
        $('.m-register').html('Failed to validate your mobile number');
        console.log(error);
        closedRegSpinner();
    }
}

function gotoOtpPage(mblNum) {
    //generate random otp
    globalOTP = onGenerateOTP();

    sendOTPDetails(globalOTP, mblNum);

    otpErrorMessage.style.display = 'none';
    messageBlock.style.display = 'none';
    basicDetailsBlock.style.display = 'none';
    otpBlock.style.display = 'block';
    classBlock.style.display = 'none';
    joinCourseBlock.style.display = 'none';
}

sendOTPDetails = function (randomOTP, mobileNumber) {
    try {
        var message = "Your OTP(One Time Password) for registration on Eduauraa is " + randomOTP + ". Do not share it with anyone.";

        var options = mobileNumber + '&message=' + message;

        var baseOTPUrl = 'https://api.textlocal.in/send/?apiKey=sFbRFEIzPXs-X8d4ZNk4kVbcZEA3Thyu9HVnMWfldZ&sender=EDUARA&numbers=' + options;

        // console.log(randomOTP);

        // console.log(baseOTPUrl);

        var request_ = new XMLHttpRequest();

        request_.open('GET', baseOTPUrl);

        request_.send();

        request_.onreadystatechange = () => {
            if (request_.readyState == 4 && request_.status == 200) {
                console.log("OTP send successfully!");
                var response = request_.responseText;
                var obj = JSON.parse(response);
            } else {
                console.log(request_.status);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function verifyOTP() {

    //set error and required to default to none
    $('.otp-required').css('display', 'none');
    $('#validate-otp-message').css('display', 'none');

    var otp1 = document.getElementById('otp1').value;
    var otp2 = document.getElementById('otp2').value;
    var otp3 = document.getElementById('otp3').value;
    var otp4 = document.getElementById('otp4').value;
    var otp5 = document.getElementById('otp5').value;

    var finalotp = otp1 + otp2 + otp3 + otp4 + otp5;

    // Fetch form to apply custom Bootstrap validation
    var form = $("#register_otp");

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (finalotp.length != 5) {
        form.addClass('was-validated');
        $('.otp-required').css('display', 'block');
    } else {

        var isValid = checkValidOTP(finalotp, globalOTP);

        if (isValid) {
            console.log("OTP is verify!");
            messageBlock.style.display = 'none';
            basicDetailsBlock.style.display = 'block';
            otpBlock.style.display = 'none';
            classBlock.style.display = 'none';
            joinCourseBlock.style.display = 'none';
        } else {
            $('#validate-otp-message').css('display', 'block');
        }
    }
}

function resendOTP() {
    console.log("OTP is resend!");

    //form data
    var mobileNumber = document.forms['registerFormMobile']['mnumber'];

    $('.otp-resend').css('display', 'block');
    globalOTP = onGenerateOTP();

    sendOTPDetails(globalOTP, mobileNumber.value);
}

function sendDetails() {

    //form data
    var fname = document.forms['registerFormBasic']['fname'];
    var lname = document.forms['registerFormBasic']['lname'];
    var email = document.forms['registerFormBasic']['email'];

    // Fetch form to apply custom Bootstrap validation
    var form = $("#register_basic")

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (fname.value == '' || lname.value == '' || email.value == '') {
        form.addClass('was-validated');
    } else {
        messageBlock.style.display = 'none';
        basicDetailsBlock.style.display = 'none';
        otpBlock.style.display = 'none';
        classBlock.style.display = 'block';
        joinCourseBlock.style.display = 'none';
    }
}

function courseNext() {

    //form data
    var state = document.forms['registerFormClass']['state'];
    var school = document.forms['registerFormClass']['school'];
    var board = document.forms['registerFormClass']['board'];

    // Fetch form to apply custom Bootstrap validation
    var form = $("#register_class");

    console.log($('.choosen-class span').text);

    $('.choosen-class span').text(currentGrade + 'th');

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (state.value == '' || school.value == '' || board.value == '') {
        form.addClass('was-validated');
    } else {
        if (currentGrade == '') {
            $('.c-error').removeClass('hidden');
        } else {
            getTotalCount();
            $('.c-error').addClass('hidden');
            console.log("check on next course!");
            messageBlock.style.display = 'none';
            basicDetailsBlock.style.display = 'none';
            otpBlock.style.display = 'none';
            classBlock.style.display = 'none';
        }
    }
}

function getTotalCount() {
    showRegSpinner();
    try {
        var getBoard = localStorage.getItem('regBoardID');
        var getGrade = localStorage.getItem('regGradeID');
        var baseURL = `${countURL}${getBoard}/${getGrade}/website-count/`;

        var request_ = new XMLHttpRequest();
        request_.open("GET", baseURL, true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.status == 201 || request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                $('.video-count').html(`${obj.video} <br />videos`);
                $('.tutor-count').html(`${obj.tutors} <br />avail tutors`);
                $('.testpaper-count').html(`${obj.test_papers} <br />test paper`);
                $('.ebook-count').html(`${obj.ebook} <br />eBooks`);
                joinCourseBlock.style.display = 'block';
                closedRegSpinner();
                console.log(obj);
            } else {
                closedRegSpinner();
                console.log(request_.status);
            }
        }
    } catch (error) {
        closedRegSpinner();
        console.log(error);
    }
}

function joinCourse() {
    console.log("join course!");
    saveUserData();
}

function closedRegisterForm() {
    messageBlock.style.display = 'block';
    basicDetailsBlock.style.display = 'none';
    otpBlock.style.display = 'none';
    classBlock.style.display = 'none';
    joinCourseBlock.style.display = 'none';
    $('#form-data-thankyou').css('display', 'none');
    $('#form-data-title').css('display', 'block');
    $('#message-thank-you').css('display', 'none');
    $('#failedRegister-message').css('display', 'none');
    clearData();
}

function clearData() {
    $('#register_mobile')[0].reset();
    $('#register_otp')[0].reset();
    $('#register_basic')[0].reset();
    $('#register_class')[0].reset();
    $('.m-register').html('');
}

function checkValidOTP(currentOTP, sendOTP) {
    if (currentOTP != sendOTP) {
        return false;
    } else {
        return true;
    }
}

function onGenerateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 5; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    // console.log(OTP);
    return OTP;
}

function getValue(value, gradeId) {
    currentGrade = value;
    localStorage.setItem('regGradeID', gradeId);
}

function onChangeBoard() {
    var selectBoard = document.getElementById('board');
    console.log(selectBoard.options[selectBoard.selectedIndex].value);
    var boardId = selectBoard.options[selectBoard.selectedIndex].value;
    var boardText = selectBoard.options[selectBoard.selectedIndex].text;
    localStorage.setItem('regBoardID', boardId);

    changeGradeData(boardText);
}

function changeGradeData(board) {
    showRegSpinner();
    try {
        var request_ = new XMLHttpRequest();
        request_.open("GET", `${gradeURL}${board}&course=CLASS_6_TO_10`, true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj);
                localStorage.setItem('regGradeID', obj[0].id);
                var chapterList = $(".radio-tile-group.class-selection");
                chapterList.html('');
                // handle data as needed...
                obj.forEach((setGrade) => {
                    $(".radio-tile-group.class-selection").append(`<div class="input-container"><input class="radio-button" type="radio" name="radio" value="${setGrade.name}" onclick="getValue('${setGrade.name}', '${setGrade.id}')" id="${setGrade.id}"/><div class="radio-tile"><label class="radio-tile-label">${setGrade.code}</label></div></div>`);
                });
                closedRegSpinner();
            } else {
                closedRegSpinner();
                console.log(request_.status);
            }
        }
    } catch (error) {
        closedRegSpinner();
        console.log(error);
    }
}

$("input").bind("input", function () {
    var $this = $(this);
    if ($this.val().length >= parseInt($this.attr("maxlength"), 10)) {
        var nextEmpty = $this.nextAll("input[value=''], input:not([value])")[0];
        if (nextEmpty) {
            nextEmpty.focus();
        }
    }
});

function submitFormData() {
    console.log("Form data is going to submitting!");

}

function saveUserData() {
    var mobileNumber = document.forms['registerFormMobile']['mnumber'];
    var fname = document.forms['registerFormBasic']['fname'];
    var lname = document.forms['registerFormBasic']['lname'];
    var email = document.forms['registerFormBasic']['email'];
    var state = document.forms['registerFormClass']['state'];
    var school = document.forms['registerFormClass']['school'];
    var board = document.forms['registerFormClass']['board'];

    let referrer = document.referrer;

    if (referrer === '') {
        referrer = 'http://eduauraa.com';
    }

    registrationData = {
        'appcode': 'MBR',
        'mobile': mobileNumber.value,
        'firstname': fname.value,
        'lastname': lname.value,
        'email': email.value,
        'message': '',
        'grade': currentGrade,
        'state': state.value,
        'school': school.value,
        'board': board.value,
        'ipaddress': localStorage.getItem('ipAdress'),
        'referrallink': referrer
    }

    try {
        sendEmail(registrationData);
        sendUserData(registrationData);

    } catch (error) {
        console.log(error);
    }
}

function getIPAddress() {
    //get ip address
    $.get("https://ipinfo.io", function (response) {
        localStorage.setItem('ipAdress', response.ip);
    }, "json");
}

function sendEmail(MBRData) {
    fetch(pushDataURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(MBRData)
    }).then((data) => {
        console.log(data);
    });
}

function sendUserData(MBRData) {
    showRegSpinner();
    messageBlock.style.display = 'none';
    basicDetailsBlock.style.display = 'none';
    otpBlock.style.display = 'none';
    classBlock.style.display = 'none';
    joinCourseBlock.style.display = 'none';
    $('#form-data-title').css('display', 'none');
    try {
        var request_ = new XMLHttpRequest();
        request_.open('POST', saveDataURL);
        request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send(JSON.stringify(MBRData));
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj.creationdate);
                closedRegSpinner();
                $('#form-data-thankyou').css('display', 'block');
                $('#message-thank-you').css('display', 'block');
            } else {
                closedRegSpinner();
                $('#failedRegister-message').css('display', 'block');
                $('#form-data-thankyou').html('Error!');
                console.log(error);
            }
        }
    } catch (error) {
        closedRegSpinner();
        $('#failedRegister-message').css('display', 'block');
        $('#form-data-thankyou').html('Error!');
        console.log(error);
    }
}