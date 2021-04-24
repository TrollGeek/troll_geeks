//var channelName = 'TechGuyWeb';
var channelId = 'UCGoLw0tC_QAXy0b4KCoxYZw';

$(document).ready(function() {
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            //forUsername: channelName,
            id: channelId,
            key: 'AIzaSyDu67h85hhxehgoFUDPgGtdfVmle4SPEtU'
        },
        function(data) {
            $.each(data.items, function(i, item) {
                var pid = item.contentDetails.relatedPlaylists.uploads;
                getVideos(pid);
            })
        }
    );

    function getVideos(pid) {
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                //forUsername: channelName,
                maxResults: 10000,
                playlistId: pid,
                key: 'AIzaSyDu67h85hhxehgoFUDPgGtdfVmle4SPEtU'
            },
            function(data) {
                var output;
                $.each(data.items, function(i, item) {
                    console.log(item);
                    videoTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;
                    console.log(videoId);
                    console.log(videoTitle);
                    //output = '<div class="col-md-3"> <div class="card shadow"> <img width="100%" class="img-thumbnail" height="auto" src="https://i1.ytimg.com/vi/' + videoId + '/mqdefault.jpg"> </img> <div class="card-body"> ' + videoTitle + '</div>  </div> </div>';
                    output = '<div class="col-md-3"><a href="https://www.youtube.com/watch?v=' + videoId + '" class="card shadow border-0 text-secondary text-center" style="text-decoration: none;"><img width="100%" class="img-thumbnail" height="auto" src="https://i1.ytimg.com/vi/' + videoId + '/mqdefault.jpg"> </img> <div class="card-body"> ' + videoTitle + '</div> </a></div>';
                    $('#results').append(output);
                })
            }
        );
    }

});
