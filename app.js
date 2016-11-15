$(document).ready(function() {
  $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&max=21&APIKey=DONORSCHOOSE',
  appendPage);

});


function appendPage(data) {
  var $proposals = data["proposals"];
  $('section').append('<div id="main" class="row grey lighten-1"></div>');
  $proposals.forEach(addStuffToPage);

  $('button').click(function() {
    var $id = $(event.target)[0].id.replace(/\D/g,'');
    $(event.target).remove();
    $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?keywords=' + $id + '&APIKey=DONORSCHOOSE', function(data) {
      var info = data['proposals'][0];
      $('#' + $id).append('<h3>' + info['schoolName'] + '</h5>');
      $('#' + $id).append('<h5>' + info['teacherName'] + '</h5>');
      $('#' + $id).append('<h6>' + info['gradeLevel']['name'] + '</h6>');
      $('#' + $id).append('<h6>' + info['povertyLevel'] + '</h6>');
      $('#' + $id).append('<h6>' + info['subject']['name'] + '</h6>');
      $('#' + $id).append('<h6>' + info['resource']['name'] + '</h6>');
    });
  });
};


function addStuffToPage(item) {
  var itemId = ('#' + item['id']);
  $('#main').append('<div class="card-panel hoverable center-align" id=' + item['id'] + '></div>');
  $(itemId).append('<figure class="z-depth-4"></figure>');
  $(itemId +' figure').append('<img class="responsive-img z-depth-3" src='+ item['imageURL'] + '></img>');
  $(itemId).append('<h5 class="grey-text text-darken-3">' + item['title'] + '</h5>');
  $(itemId).append('<h6>' + item['city'] + ', ' + item['state'] + '</h6>');
  $(itemId).append('<h4 class="green-text text-darken-2 center-align"> $' + item['costToComplete'] + '</h4>');
  $(itemId).append('<p>' + item['shortdescription'] + '</p>');
  $(itemId).append('<button id=btn' + itemId + ' type="button" class= "btn grey darken-3 hoverable btn'+ itemId + '">More Info</button>');
};
