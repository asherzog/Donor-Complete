$(document).ready(function() {
  $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&max=21&APIKey=DONORSCHOOSE', function(data) {
    var $proposals = data["proposals"];
    $('section').append('<div id="main" class="row grey lighten-1"></div>');
    $proposals.forEach(function(item) {
      $('#main').append('<div class="card-panel hoverable center-align" id=' + item['id'] + '></div>');
      $('#' + item['id']).append('<figure></figure>');
      $('#' + item['id'] +' figure').append('<img class="responsive-img z-depth-3" src='+ item['imageURL'] + '></img>');
      $('#' + item['id']).append('<h5 class="grey-text text-darken-3">' + item['title'] + '</h5>');
      $('#' + item['id']).append('<h6>' + item['city'] + ', ' + item['state'] + '</h6>');
      $('#' + item['id']).append('<h4 class="green-text text-darken-2 center-align"> $' + item['costToComplete'] + '</h4>');
      $('#' + item['id']).append('<p>' + item['shortdescription'] + '</p>');
      $('#' + item['id']).append('<button type="button" class="waves-effect waves-light btn grey darken-2 hoverable">More Info</button>');
    });
  });
});
