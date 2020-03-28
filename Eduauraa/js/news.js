var newsURL = 'http://13.233.163.224:8000/webportal/api/news-list/';

try {
    var request_ = new XMLHttpRequest();
    request_.open('GET', newsURL);

    request_.send();

    request_.onreadystatechange = () => {
        if (request_.readyState == 4 && request_.status == 200) {
            console.log("API is success!");
            var response = request_.responseText;
            var obj = JSON.parse(response);
            console.log(obj);
            obj.forEach((setNews, index) => {
                var newsRow = document.getElementById('new-row');
                var div = document.createElement('div');
                var dateArray = setNews.newsdate.split("-");
                var newsData = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
                div.setAttribute('class', 'col-lg-6 col-md-6 col-sm-12 pt-20');
                div.innerHTML = '<a class="custom-color-black" href="' + setNews.newlink + '"target="_blank" rel="noopener noreferrer"><div class="card h-100"><div class="card-body d-flex flex-column"><p class="card-text"><small class="text-muted">' + newsData + '</small></p><div class="text-center p-20"><img src="' + setNews.newsownerlogo + '" class="news-logo" alt=""></div><div class="learn-bottom-btn"><p class="custom-bold text-center"><a class="custom-color-black" href="' + setNews.newlink + '"target="_blank" rel="noopener noreferrer">' + setNews.newsheading + '</a></p></div></div></div></a>';
                newsRow.appendChild(div);
            });
        } else {
            console.log("API is failed!");
        }
    }
} catch(error) {
    console.log(error);
}