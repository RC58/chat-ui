window.onload = function () {
    const username = "cbsei6";
    const password = "cbse6@123";
    var token = username + ":" + password;
    var hash = "Basic " + btoa(token);
    const token_ = hash;//get token from username and pasword

    getFaqData(token_);

}

function getFaqData(token) {
    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", "http://staging.eduauraa.com/global_faq_list", true);
    request_.setRequestHeader("Authorization", token);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            // handle data as needed...
            obj.forEach((setFaq, index) => {

                var accord = document.getElementById('faq-accordian');
                var li = document.createElement('li');
                li.setAttribute('class', 'd-md-table mb-4 w-100 hover-shadow');
                li.innerHTML = '<button class="accordion" onclick="togglefaq()"><div class="bg-acc-btn" style="padding-top: 3%;"><span class="h4 bg-acc-text">' + (index + 1) + '</span></div><div class="d-md-table-cell px-4 vertical-align-middle mb-4 mb-md-0"><a class="h4 mb-3 d-block mt-4">' + setFaq.question + '</a></div><div class="d-md-table-cell text-right pr-0 pr-md-4 btn-custome"><span class="btn btn-primary">read more</span></div></button><div class="panel"><p>' + setFaq.answer + '</p></div>';
                accord.appendChild(li);

            });

        } else {
            console.log(request_.status);
        }
    }
}

function togglefaq() {
    console.log("toggle function is calling!");
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            for (var j = 0; j < acc.length; j++) {
                acc[j].nextElementSibling.style.maxHeight = null;
                acc[j].classList.remove('active');
            }
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }
}

