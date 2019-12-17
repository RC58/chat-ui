window.onload = function () {
    const username = "cbsei6";
    const password = "cbse6@123";
    var token = username + ":" + password;
    var hash = "Basic " + btoa(token);
    const token_ = hash;//get token from username and pasword

    getBoardData(token_);
    getGradeData(token_);
    getSubjectData(token_);
    getChapterData(token_);
}

//get board data from api
function getBoardData(token) {
    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", "http://staging.eduauraa.com/global_board_list", true);
    request_.setRequestHeader("Authorization", token);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            // handle data as needed...
            obj.forEach((setBoard) => {
                boardSelect = document.getElementById('boards');
                boardSelect.options[boardSelect.options.length] = new Option(setBoard.name, setBoard.code);
            });

        } else {
            console.log(request_.status);
        }
    }
}

//get grade data from api
function getGradeData(token) {
    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", "http://staging.eduauraa.com/global_grade_list?boardcode=1002", true);
    request_.setRequestHeader("Authorization", token);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            // handle data as needed...
            obj.forEach((setGrade) => {
                gradeSelect = document.getElementById('grades');
                gradeSelect.options[gradeSelect.options.length] = new Option(setGrade.gradename, setGrade.gradecode);
            });

        } else {
            console.log(request_.status);
        }
    }
}

//get grade data from api
function getSubjectData(token) {
    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", "http://staging.eduauraa.com/global_subject_list?gradecode=10021009", true);
    request_.setRequestHeader("Authorization", token);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            // handle data as needed...
            obj.forEach((setSubject) => {
                subjectSelect = document.getElementById('subjects');
                subjectSelect.options[subjectSelect.options.length] = new Option(setSubject.subjectname, setSubject.subjectcode);
            });

        } else {
            console.log(request_.status);
        }
    }
}

//get subjects
function getChapterData(token) {
    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", "http://staging.eduauraa.com/chapter_list?subjectcode=PH10021009", true);
    request_.setRequestHeader("Authorization", token);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            // handle data as needed...
            console.log(obj);
            obj.forEach((setSubjects) => {
                var chapterList = document.getElementById('chapters');
                var li = document.createElement("li");
                li.setAttribute('id', setSubjects.chaptername);
                li.appendChild(document.createTextNode(setSubjects.chaptername));
                chapterList.appendChild(li);
            });

        } else {
            console.log(request_.status);
        }
    }
}

function setChapterData() {
    const username = "cbsei6";
    const password = "cbse6@123";
    var token = username + ":" + password;
    var hash = "Basic " + btoa(token);
    const token_ = hash;//get token from username and pasword

    var subCode = document.getElementById('subjects');
    var selectedSubject = subCode.options[subCode.selectedIndex].value;

    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", `http://staging.eduauraa.com/chapter_list?subjectcode=${selectedSubject}`, true);
    request_.setRequestHeader("Authorization", token_);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            // handle data as needed...
            console.log(obj);
            var chapterList = document.getElementById('chapters');
            chapterList.innerHTML = "";
            obj.forEach((setSubjects) => {
                var li = document.createElement("li");
                li.setAttribute('id', setSubjects.chaptername);
                li.appendChild(document.createTextNode(setSubjects.chaptername));
                chapterList.appendChild(li);
            });

        } else {
            console.log(request_.status);
        }
    }
}

//change data based on board
function onChangeBoard() {
    var selectedBoard = document.getElementById('boards');
    var selBoard = selectedBoard.options[selectedBoard.selectedIndex].value;
    changeGradeData(selBoard);
}

//change grade based on board
function changeGradeData(selBoard) {
    const username = "cbsei6";
    const password = "cbse6@123";
    var token = username + ":" + password;
    var hash = "Basic " + btoa(token);
    const token_ = hash;//get token from username and pasword

    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", `http://staging.eduauraa.com/global_grade_list?boardcode=${selBoard}`, true);
    request_.setRequestHeader("Authorization", token_);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            var grade = document.getElementById('grades');
            grade.innerHTML = "";
            obj.forEach((setGrade) => {
                gradeSelect = document.getElementById('grades');
                gradeSelect.options[gradeSelect.options.length] = new Option(setGrade.gradename, setGrade.gradecode);
            });

            //change subject data
            onChangeGrades();

        } else {
            console.log(request_.status);
        }
    }
}

function onChangeGrades() {
    console.log("grade is click!");
    var selectedGrades = document.getElementById('grades');
    var selGrade = selectedGrades.options[selectedGrades.selectedIndex].value;
    changeSubjectData(selGrade);
}

//change grade based on board
function changeSubjectData(selGrade) {
    console.log(selGrade);
    const username = "cbsei6";
    const password = "cbse6@123";
    var token = username + ":" + password;
    var hash = "Basic " + btoa(token);
    const token_ = hash;//get token from username and pasword

    var request_ = new XMLHttpRequest();
    // var encodedParams = encodeURIComponent(params);
    request_.open("POST", `http://staging.eduauraa.com/global_subject_list?gradecode=${selGrade}`, true);
    request_.setRequestHeader("Authorization", token_);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);
            // handle data as needed...
            var subj = document.getElementById('subjects');
            subj.innerHTML = "";
            console.log(obj);
            obj.forEach((setSubject) => {
                subjectSelect = document.getElementById('subjects');
                subjectSelect.options[subjectSelect.options.length] = new Option(setSubject.subjectname, setSubject.subjectcode);
            });

        } else {
            console.log(request_.status);
        }
    }
}
