
var videos = document.querySelectorAll('video');
for (var i = 0; i < videos.length; i++)
    videos[i].addEventListener('play', function () { pauseAll(this) }, true);


function pauseAll(elem) {
    for (var i = 0; i < videos.length; i++) {
        //Is this the one we want to play?
        if (videos[i] == elem) continue;
        //Have we already played it && is it already paused?
        if (videos[i].played.length > 0 && !videos[i].paused) {
            //Then pause it now
            videos[i].pause();
        }
    }
}

$(window).on('resize', function() {
    if($(window).height() < 210) {
        $('video').addClass('vjs-layout-tiny');
    }else{
        $('video').removeClass('vjs-layout-tiny');
    }
})

