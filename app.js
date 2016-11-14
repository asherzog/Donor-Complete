$(document).ready(function() {
  $.get('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?state=CO&costToCompleteRange=0+TO+200&sortBy=2&APIKey=DONORSCHOOSE', function(data) {
    console.log(data);
  });
});
