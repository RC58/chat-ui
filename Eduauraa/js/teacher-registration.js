var basicInfo = document.getElementById('teacher-basic-info-block');
var teacherOTP = document.getElementById('teacher-otp-block');
var teacherQualify = document.getElementById('teacher-qualify-block');
var teacherWeeklyPlan = document.getElementById('teacher-weekly-block');
var teacherBasicSteps = document.getElementById('teacher-basic-info-steps');
var teacherQualifySteps = document.getElementById('teacher-qualify-steps');
var teacherWeeklySteps = document.getElementById('teacher-weekly-steps');
var globalOTP = '';
const commonDomain = 'http://13.233.163.224:8000';
const baseURL = commonDomain + '/webportal/api/';
var mobileValidate = commonDomain + '/webportal/api/mobile-validate/';

var pushDataURL = 'http://staging.eduauraa.com/website/pushwebdata';
$('#message-thank-you-teach').css('display', 'none');
$('#message-error-teach').css('display', 'none');
$('.m-error').addClass("hidden");
const spinner = document.getElementById("spinner");

var available_dates = [];

getIPAddress();

function showSpinner() {
    spinner.className = "show";
}

function closedSpinner() {
    spinner.className = spinner.className.replace("show", "");
}

var teachURL = baseURL + 'reg-enquiry/create/';
var timeSlotURL = baseURL + 'time-slot/list/';

var token = 'Bearer NyyRqHe3Z9tLQGI5FB6WmTzG2tYf1N';

getTimeslotData();

function getTimeslotData() {
    try {
        var request_ = new XMLHttpRequest();
        request_.open('GET', timeSlotURL);
        request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText
                var obj = JSON.parse(response)
                console.log(obj);
                $('.slots').html('');

                obj.forEach((slotData) => {
                    $('.slots').append(`
                        <label>
                            <input type="checkbox" class="btn-dark" id="${slotData.id}" onclick="isSlotChecked('${slotData.id}')">
                            <span>${slotData.slot_time}</span>
                        </label>`);
                });
            } else {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function isSlotChecked(slotID) {
    var slotDate = document.forms['teacher_weekly_planner']['slot_date'];
    var slot = document.getElementById(slotID);

    if (slot.checked) {

        var selectedSlot = {
            "date": slotDate.value,
            "available_times": slotID
        }

        available_dates.push(selectedSlot);
    
    } else {
    
        for(var i=0; i< available_dates.length; i++) {
            if(available_dates[i].available_times == slotID) {
                available_dates.splice(i, 1);
            }
        }

        console.log(available_dates);
    }
}

sendOTPDetails = function (randomOTP, mobileNumber) {
    try {
        var message = "Your OTP(One Time Password) for registration on Eduauraa is " + randomOTP + ". Do not share it with anyone.";

        var options = mobileNumber + '&message=' + message;

        var baseOTPUrl = 'https://api.textlocal.in/send/?apiKey=sFbRFEIzPXs-X8d4ZNk4kVbcZEA3Thyu9HVnMWfldZ&sender=EDUARA&numbers=' + options;

        // console.log(baseOTPUrl);
        // console.log(randomOTP);
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

function teacherFormNext() {

    var fname = document.forms['teacherBasicInfo']['tfname'];
    var lname = document.forms['teacherBasicInfo']['tlname'];
    var mnumber = document.forms['teacherBasicInfo']['tmnumber'];
    var email = document.forms['teacherBasicInfo']['temail'];
    var date = document.forms['teacherBasicInfo']['date'];
    var gender = document.forms['teacherBasicInfo']['gender'];

    console.log(typeof (new Date(date.value)));
    console.log(new Date(date.value));

    $('.m-register').html('');

    // Fetch form to apply custom Bootstrap validation
    var form = $("#basic_info")

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (fname.value == '' || lname.value == '' || mnumber.value == '' || email.value == '' || date.value == '' || gender.value == '') {
        form.addClass('was-validated');
    } else {
        var mob = /^[7-9]{1}[0-9]{9}$/;

        if (mob.test(mnumber.value) == false) {
            $('.m-error').removeClass("hidden");
        } else {
            $('.m-error').addClass("hidden");
            isExistingUser(mnumber.value);
        }
    }
}

function isExistingUser(mblNum) {
    showSpinner();
    try {
        var userData = {
            "appcode": "TWU",
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
                    closedSpinner();
                } else {
                    $('.m-register').html('');
                    gotoOtpPage(mblNum);
                    closedSpinner();
                }
            } else {
                $('.m-register').html('Failed to validate your mobile number');
                console.log(request_.status);
                closedSpinner();
            }
        }
    } catch (error) {
        $('.m-register').html('Failed to validate your mobile number');
        console.log(error);
        closedSpinner();
    }
}

function gotoOtpPage(mblNum) {
    //generate OTP video
    globalOTP = onGenerateOTP();

    sendOTPDetails(globalOTP, mblNum);

    console.log("basic details submitted!");
    basicInfo.style.display = 'none';
    teacherOTP.style.display = 'block';
    teacherQualify.style.display = 'none';
    teacherWeeklyPlan.style.display = 'none';
    teacherBasicSteps.style.display = 'block';
    teacherQualifySteps.style.display = 'none';
    teacherWeeklySteps.style.display = 'none';

    //set mobile number
    $("h4.mobile-number").html(mblNum);
}

function otpSubmit() {

    //set otp required and error to none
    $('.otp-required').css('display', 'none');
    $('.otp-error').css('display', 'none');

    var otp1 = document.getElementById('otp1').value;
    var otp2 = document.getElementById('otp2').value;
    var otp3 = document.getElementById('otp3').value;
    var otp4 = document.getElementById('otp4').value;
    var otp5 = document.getElementById('otp5').value;

    var finalotp = otp1 + otp2 + otp3 + otp4 + otp5;

    // Fetch form to apply custom Bootstrap validation
    var form = $("#teacher_otp");

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (finalotp.length != 5) {
        form.addClass('was-validated');
        $('.otp-required').css('display', 'block');

    } else {

        //check is valid otp
        var isValid = checkValidOTP(finalotp, globalOTP);

        if (isValid) {
            console.log("OTP validate successfully!");
            basicInfo.style.display = 'none';
            teacherOTP.style.display = 'none';
            teacherQualify.style.display = 'block';
            teacherWeeklyPlan.style.display = 'none';
            teacherBasicSteps.style.display = 'none';
            teacherQualifySteps.style.display = 'block';
            teacherWeeklySteps.style.display = 'none';
        } else {
            $('.otp-error').css('display', 'block');
        }
    }
}

function resendOTP() {
    console.log("OTP is resend!");

    //form data
    var mnumber = document.forms['teacherBasicInfo']['tmnumber'];

    globalOTP = onGenerateOTP();

    console.log(globalOTP);

    sendOTPDetails(globalOTP, mnumber.value);
}

function qualifySubmit() {

    var qualify = document.forms['techQualification']['hqualify'];
    var yearExp = document.forms['techQualification']['yexp'];
    var certificate = document.forms['techQualification']['tcertificate'];
    var subject = document.forms['techQualification']['tsubject'];
    var tclass = document.forms['techQualification']['tclass'];
    var language = document.forms['techQualification']['tlanguage'];
    var board = document.forms['techQualification']['tboard'];

    // Fetch form to apply custom Bootstrap validation
    var form = $("#teacher_qualify")

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (qualify.value == '' || yearExp.value == '' || certificate.value == '' || subject.value == '' ||
        tclass.value == '' || language.value == '' || board.value == '') {
        form.addClass('was-validated');
    } else {
        console.log("Qualification send successfully!");
        basicInfo.style.display = 'none';
        teacherOTP.style.display = 'none';
        teacherQualify.style.display = 'none';
        teacherWeeklyPlan.style.display = 'block';
        teacherBasicSteps.style.display = 'none';
        teacherQualifySteps.style.display = 'none';
        teacherWeeklySteps.style.display = 'block';
    }
}

function slotSubmit() {
    var slotDate = document.forms['teacher_weekly_planner']['slot_date'];

    // Fetch form to apply custom Bootstrap validation
    var form = $("#teacher_weekly_planner")

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (slotDate.value == '') {
        form.addClass('was-validated');
    } else {
        console.log("Slot submitted!");
        basicInfo.style.display = 'none';
        teacherOTP.style.display = 'none';
        teacherQualify.style.display = 'none';
        teacherWeeklyPlan.style.display = 'block';
        teacherBasicSteps.style.display = 'none';
        teacherQualifySteps.style.display = 'none';
        teacherWeeklySteps.style.display = 'block';

        saveTeachersData();
    }
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

function closeTeacherRegister() {

    console.log("closed modal data!");

    $('#basic_info')[0].reset();
    $('#teacher_otp')[0].reset();
    $('#teacher_qualify')[0].reset();
    $('#teacher_weekly_planner')[0].reset();
    basicInfo.style.display = 'block';
    teacherOTP.style.display = 'none';
    teacherQualify.style.display = 'none';
    teacherWeeklyPlan.style.display = 'none';
    teacherBasicSteps.style.display = 'block';
    teacherQualifySteps.style.display = 'none';
    teacherWeeklySteps.style.display = 'none';
    $('#message-thank-you-teach').css('display', 'none');
    $('#message-error-teach').css('display', 'none');
    $('.form-title').css('display', 'block');
    // $('.stepper').css('display', 'block');
    $('.form-message').css('display', 'none');
    $('.m-register').html('');
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

function saveTeachersData() {

    //basic details
    var fname = document.forms['teacherBasicInfo']['tfname'];
    var lname = document.forms['teacherBasicInfo']['tlname'];
    var mnumber = document.forms['teacherBasicInfo']['tmnumber'];
    var email = document.forms['teacherBasicInfo']['temail'];
    var date = document.forms['teacherBasicInfo']['date'];
    var gender = document.forms['teacherBasicInfo']['gender'];

    //teaching experience
    var qualify = document.forms['techQualification']['hqualify'];
    var yearExp = document.forms['techQualification']['yexp'];
    var certificate = document.forms['techQualification']['tcertificate'];
    var subject = document.forms['techQualification']['tsubject'];
    var tclass = document.forms['techQualification']['tclass'];
    var language = document.forms['techQualification']['tlanguage'];
    var board = document.forms['techQualification']['tboard'];
    var teachExp = '';

    if($('.teach_yes').checked) {
        teachExp = 'Yes'
    } else {
        teachExp = 'No'
    }

    let referrer = document.referrer;

    if (referrer === '') {
        referrer = 'http://eduauraa.com';
    }

    var teacherData = {
        "appcode": "TWU",
        "firstname": fname.value,
        "lastname": lname.value,
        "dob": date.value,
        "mobile": mnumber.value,
        "email": email.value,
        "gender": gender.value,
        "qualification": qualify.value,
        "teaching_experience": teachExp,
        "total_experience": yearExp.value,
        "certificates": certificate.value,
        "subject": subject.value,
        "grade": tclass.value,
        "language": language.value,
        "board": board.value,
        "demo_video": "",
        "available_dates": available_dates,
        "ipaddress": localStorage.getItem('ipAdress'),
        "referrallink": referrer
    }

    console.log(teacherData);
    sendEmailResponseData(teacherData);
    sendResponseData(teacherData);
}

function sendResponseData(Data) {

    showSpinner();
    teacherWeeklyPlan.style.display = 'none';
    teacherWeeklySteps.style.display = 'none';
    $('.form-message').css('display', 'block');
    $('.form-title').css('display', 'none');
    $('.stepper').css('display', 'none');
    try {
        var request_ = new XMLHttpRequest();
        request_.open('POST', teachURL);
        request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send(JSON.stringify(Data));
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText
                var obj = JSON.parse(response)
                console.log(obj);
                closedSpinner();
                $('.form-message').html('<h3>Thank You!</h3>');
                $('#message-thank-you-teach').css('display', 'block');
            } else {
                closedSpinner();
                $('#message-error-teach').css('display', 'block');
                $('.form-message').html('<h3>Error!</h3>');
            }
        }
    } catch (error) {
        console.log(error);
        closedSpinner();
        $('#message-error-teach').css('display', 'block');
        $('.form-message').html('<h3>Error!</h3>');
    }
}

function sendEmailResponseData(TWUData) {
    fetch(pushDataURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(TWUData)
    }).then((data) => {
        console.log(data);
    });
}

function getIPAddress() {
    //get ip address
    $.get("https://ipinfo.io", function (response) {
        localStorage.setItem('ipAdress', response.ip);
    }, "json");
}
