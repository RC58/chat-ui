window.onload = function () {
    if(localStorage.getItem('gradeID') != '' || localStorage.getItem('boardID') != '' || localStorage.getItem('boardID') != '') {
        localStorage.removeItem('gradeID');
        localStorage.removeItem('boardID');
        localStorage.removeItem('subjectID');
    }

    const course = 'CLASS_11_TO_12';
    const token_new = "Bearer XwnpKuAYtfOW0sPKnlbp4UyIpRDVjz";
    // const commonDomain = 'http://13.233.163.224:8000';
    const commonDomain = 'http://13.233.163.224:8000';
    const boardURL = commonDomain + '/lms/api/board-list/?course=' + course;
    const gradeURL = commonDomain + '/lms/api/grade-list/?search=';
    const subjectURL = commonDomain + '/lms/api/';
    const chapterURL = commonDomain + '/lms/api/';
    const languageURL = commonDomain + '/lms/api/';

    getBoardData(token_new, boardURL);
    getGradeData(token_new, gradeURL);
    this.setTimeout( () => {
        getLanguageData(token_new, languageURL);
        getSubjectData(token_new, subjectURL);
        getChapterData(token_new, chapterURL);
    }, 500)
}

const spinner = document.getElementById("spinner-syllabus");
const fError = document.getElementById("failedError");
const cData = document.getElementById('chapter-data');

function showSpinner() {
    spinner.className = "show";
}

function closedSpinner() {
    spinner.className = spinner.className.replace("show", "");
}

function showError() {
    fError.className = "show";
}

function closedError() {
    fError.className = fError.className.replace("show", "");
}

function showData() {
    cData.className = "show";
}

function closedData() {
    cData.className = cData.className.replace("show", "");
}

//get board data from api
function getBoardData(token, url) {
    try {
        var request_ = new XMLHttpRequest();
        closedData();
        closedError();
        showSpinner();
        request_.open("GET", url, true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                localStorage.setItem('boardID', obj[0].id);
                // handle data as needed...
                obj.forEach((setBoard) => {
                    boardSelect = document.getElementById('boards');
                    boardSelect.options[boardSelect.options.length] = new Option(setBoard.name, setBoard.id);
                });
                closedError();
                closedSpinner();
                showData();

            } else {
                console.log(request_.status);
                closedSpinner();
                showError();
                closedData();
            }
        }
    } catch (error) {
        closedSpinner();
        showError();
        closedData();
    }
}

//get grade data from api
function getGradeData(token, url) {
    try {
        var request_ = new XMLHttpRequest();
        closedData();
        closedError();
        showSpinner();
        request_.open("GET", url + 'CBSE&course=CLASS_11_TO_12', true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                localStorage.setItem('gradeID', obj[0].id);
                // handle data as needed...
                obj.forEach((setGrade) => {
                    gradeSelect = document.getElementById('grades');
                    gradeSelect.options[gradeSelect.options.length] = new Option(setGrade.name, setGrade.id);
                });
                closedError();
                closedSpinner();
                showData();
            } else {
                console.log(request_.status);
                closedSpinner();
                showError();
                closedData();
            }
        }
    } catch (error) {
        closedSpinner();
        showError();
        closedData();
    }
}

function getLanguageData(token, url) {
    try {
        var request_ = new XMLHttpRequest();
        closedData();
        closedError();
        showSpinner();
        var baseLanguageURL = `${url}3/30/language-list/`;
        console.log(baseLanguageURL);
        request_.open("GET", baseLanguageURL, true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                console.log(obj)
                localStorage.setItem('languageID', obj[0].id);
                // handle data as needed...
                obj.forEach((setLanguage) => {
                    languageSelect = document.getElementById('language');
                    languageSelect.options[languageSelect.options.length] = new Option(setLanguage.name, setLanguage.id);
                });
                closedError();
                closedSpinner();
                showData();
            } else {
                console.log(request_.status);
                closedSpinner();
                showError();
                closedData();
            }
        }
    } catch (error) {
        closedSpinner();
        showError();
        closedData();
    }
}

//get grade data from api
function getSubjectData(token, url) {
    try {
        var boardID = localStorage.getItem('boardID');
        var gradeID = localStorage.getItem('gradeID');
        var langID = localStorage.getItem('languageID');
        var baseURL = url + boardID + "/" + gradeID + "/" + langID +"/subject-list/";
        console.log(baseURL);
        var request_ = new XMLHttpRequest();
        closedData();
        closedError();
        showSpinner();
        request_.open("GET", baseURL, true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                localStorage.setItem('subjectID', obj[0].id);
                // handle data as needed...
                obj.forEach((setSubject) => {
                    subjectSelect = document.getElementById('subjects');
                    subjectSelect.options[subjectSelect.options.length] = new Option(setSubject.name, setSubject.id);
                });
                closedError();
                closedSpinner();
                showData();
            } else {
                console.log(request_.status);
                closedSpinner();
                showError();
                closedData();
            }
        }
    } catch (error) {
        closedSpinner();
        showError();
        closedData();
    }
}

//get subjects
function getChapterData(token, url) {

    try {
        var baseURL = url + "179" + "/chapter-list/";

        var request_ = new XMLHttpRequest();
        closedData();
        closedError();
        showSpinner();
        request_.open("GET", baseURL, true);
        request_.setRequestHeader("Authorization", token);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                // handle data as needed...
                obj.forEach((setSubjects) => {
                    var chapterList = document.getElementById('chapters');
                    var li = document.createElement("li");
                    li.setAttribute('id', setSubjects.id);
                    li.appendChild(document.createTextNode(setSubjects.name));
                    chapterList.appendChild(li);
                });
                closedError();
                closedSpinner();
                showData();
            } else {
                console.log(request_.status);
                closedSpinner();
                showError();
                closedData();
            }
        }
    } catch (error) {
        closedSpinner();
        showError();
        closedData();
    }
}

function setChapterData() {
    try {

        const token_new = "Bearer XwnpKuAYtfOW0sPKnlbp4UyIpRDVjz";

        var subCode = document.getElementById('subjects');

        localStorage.setItem('subjectID', subCode.options[subCode.selectedIndex].value);

        var subjectID = localStorage.getItem('subjectID');

        var baseURL = "http://13.233.163.224:8000/lms/api/" + subjectID + "/chapter-list/";

        var request_ = new XMLHttpRequest();
        closedData();
        closedError();
        showSpinner();
        request_.open("GET", baseURL, true);
        request_.setRequestHeader("Authorization", token_new);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                // handle data as needed...
                var chapterList = document.getElementById('chapters');
                chapterList.innerHTML = "";
                obj.forEach((setSubjects) => {
                    var li = document.createElement("li");
                    li.setAttribute('id', setSubjects.id);
                    li.appendChild(document.createTextNode(setSubjects.name));
                    chapterList.appendChild(li);
                });
                closedError();
                closedSpinner();
                showData();
            } else {
                console.log(request_.status);
                closedSpinner();
                showError();
                closedData();
            }
        }
    } catch (error) {
        console.log(error);
        closedSpinner();
        showError();
        closedData();
    }
}

//change data based on board
function onChangeBoard() {
    var selectedBoard = document.getElementById('boards');
    var selBoard = selectedBoard.options[selectedBoard.selectedIndex].text;
    localStorage.setItem('boardID', selectedBoard.options[selectedBoard.selectedIndex].value);
    changeGradeData(selBoard);
}

//change grade based on board
function changeGradeData(selBoard) {
    try {
        const token_new = "Bearer XwnpKuAYtfOW0sPKnlbp4UyIpRDVjz";
        const commonDomain = 'http://13.233.163.224:8000';
        const gradeURL = commonDomain + '/lms/api/grade-list/?search=';

        var request_ = new XMLHttpRequest();

        // closedData();
        closedError();
        showSpinner();
        // var encodedParams = encodeURIComponent(params);
        request_.open("GET", gradeURL + `${selBoard}` + '&course=CLASS_11_TO_12', true);
        request_.setRequestHeader("Authorization", token_new);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                var grade = document.getElementById('grades');
                grade.innerHTML = "";
                obj.forEach((setGrade) => {
                    gradeSelect = document.getElementById('grades');
                    gradeSelect.options[gradeSelect.options.length] = new Option(setGrade.name, setGrade.id);
                });

                closedError();
                closedSpinner();
                // showData();
                //change subject data
                onChangeGrades();

            } else {
                console.log(request_.status);
                showError();
                closedSpinner();
                // closedData();
            }
        }
    } catch (error) {
        console.log(error);
        showError();
        closedSpinner();
        // closedData();
    }
}

function onChangeGrades() {
    var selectedGrades = document.getElementById('grades');
    var selGrade = selectedGrades.options[selectedGrades.selectedIndex].text;
    localStorage.setItem('gradeID', selectedGrades.options[selectedGrades.selectedIndex].value);
    changeLanguageData(selGrade);
}

//change grade based on board
function changeLanguageData(selGrade) {

    try {
        const token_new = "Bearer XwnpKuAYtfOW0sPKnlbp4UyIpRDVjz";
        var boardID = localStorage.getItem('boardID');
        var gradeID = localStorage.getItem('gradeID');
        var baseURL = "http://13.233.163.224:8000/lms/api/" + boardID + "/" + gradeID + "/language-list/";

        var request_ = new XMLHttpRequest();
        // closedData();
        closedError();
        showSpinner();
        request_.open("GET", baseURL, true);
        request_.setRequestHeader("Authorization", token_new);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                // handle data as needed...
                var lang = document.getElementById('language');
                lang.innerHTML = "";
                localStorage.setItem('languageID', obj[0].id);
                obj.forEach((setLanguage) => {
                    languageSelect = document.getElementById('language');
                    languageSelect.options[languageSelect.options.length] = new Option(setLanguage.name, setLanguage.id);
                });
                closedError();
                closedSpinner();
                // showData();
                onChangeLanguage();

            } else {
                console.log(request_.status);
                showError();
                closedSpinner();
                // closedData();
            }
        }
    } catch (error) {
        showError();
        closedSpinner();
        // closedData();
    }
}

//change data based on board
function onChangeLanguage() {
    var selectedLang = document.getElementById('language');
    var selLang = selectedLang.options[selectedLang.selectedIndex].text;
    localStorage.setItem('languageID', selectedLang.options[selectedLang.selectedIndex].value);
    changeSubjectData(selLang);
}

function changeSubjectData() {
    try {
        const token_new = "Bearer XwnpKuAYtfOW0sPKnlbp4UyIpRDVjz";
        var boardID = localStorage.getItem('boardID');
        var gradeID = localStorage.getItem('gradeID');
        var langID = localStorage.getItem('languageID');
        var baseURL = "http://13.233.163.224:8000/lms/api/" + boardID + "/" + gradeID + "/" + langID + "/subject-list/";

        var request_ = new XMLHttpRequest();
        // closedData();
        closedError();
        showSpinner();
        request_.open("GET", baseURL, true);
        request_.setRequestHeader("Authorization", token_new);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = JSON.parse(response);
                // handle data as needed...
                var subj = document.getElementById('subjects');
                subj.innerHTML = "";
                localStorage.setItem('subjectID', obj[0].id);
                obj.forEach((setSubject) => {
                    subjectSelect = document.getElementById('subjects');
                    subjectSelect.options[subjectSelect.options.length] = new Option(setSubject.name, setSubject.id);
                });
                closedError();
                closedSpinner();
                // showData();
            } else {
                console.log(request_.status);
                showError();
                closedSpinner();
                // closedData();
            }
        }
    } catch (error) {
        showError();
        closedSpinner();
        // closedData();
    }
}
