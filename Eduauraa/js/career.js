
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

$('.m-error').addClass("hidden");
var careerURL = 'http://13.233.163.224:8000/webportal/api/career-form/create/';
var token = 'Bearer NyyRqHe3Z9tLQGI5FB6WmTzG2tYf1N';

const spinner = document.getElementById("spinner");

function showSpinner() {
    spinner.className = "show";
}

function closedSpinner() {
    spinner.className = spinner.className.replace("show", "");
}

function submitCareerForm() {

    var fName = document.forms['careerForm']['fname'];
    var lName = document.forms['careerForm']['lname'];
    var eMail = document.forms['careerForm']['email'];
    var phone = document.forms['careerForm']['phone'];
    var file = document.forms['careerForm']['customFile'];
    // var file = document.getElementById("customFile");

    var data = new FormData();
    data.append("firstname", fName.value);
	data.append("lastname", lName.value);
	data.append("mobile", phone.value);
	data.append("email", eMail.value);
	data.append("doc_file", file.files[0], file.files[0].name);

    var form = $("#careerForm");

    if (form[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }

    if (fName.value == '' || lName.value == '' || eMail.value == '' || phone.value == '') {
        form.addClass('was-validated');
    } else {

        var mob = /^[7-9]{1}[0-9]{9}$/;

        if (mob.test(phone.value) == false) {
            $('.m-error').removeClass("hidden");
        } else {
            $('.m-error').addClass("hidden");
            sendCareerData(data);
        }
    }
}

function sendCareerData(data) {
    showSpinner();
    try {
        var request_ = new XMLHttpRequest();
        request_.open('POST', careerURL);
        // request_.setRequestHeader('Content-Type', 'application/json');
        request_.setRequestHeader('Authorization', token);
        request_.send(data);
        request_.onreadystatechange = function () {
            if (request_.status == 200 || request_.status == 201) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                closedSpinner();
                // console.log(obj);
                var form = document.getElementById('careerForm');
                form.reset();
                $(".custom-file-label").html('Upload file');
                $('#thankyouContactModal').modal('show');
            } else {
                closedSpinner();
                $('#failedContactModal').modal('show');
            }
        }
    } catch (error) {
        console.log(error);
        closedSpinner();
        $('#failedContactModal').modal('show');
    }
}
