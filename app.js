$(document).ready(function() {
  $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&max=12&APIKey=DONORSCHOOSE',
  appendPage);

  $('.parallax').parallax();


});


function appendPage(data) {
  var $proposals = data["proposals"];
  $('.main').append('<div id="main" class="row"></div>');
  $proposals.forEach(addStuffToPage);

  $('.more').click(moreInfo);
};


function addStuffToPage(item) {
  var itemId = ('#' + item['id']);
  $('#main').append('<div class="card-panel hoverable center-align" id=' + item['id'] + '></div>');
  $(itemId).append('<img class="responsive-img z-depth-3" src='+ item['imageURL'] + ' style="max-width: 30vw;"></img>');
  $(itemId).append('<h5 class="grey-text text-darken-3">' + item['title'] + '</h5>');
  $(itemId).append('<h6>' + item['city'] + ', ' + item['state'] + '</h6>');
  $(itemId).append('<h4 class="green-text text-darken-2 center-align"> $' + item['costToComplete'] + '<br> Remaining</h4>');
  $(itemId).append('<p>' + item['shortdescription'] + '</p>');
  $(itemId).append('<button id=btn' + itemId + ' type="button" class= "btn grey darken-3 hoverable btn more">Explore</button>');

  $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?keywords=' + item['id'] + '&APIKey=DONORSCHOOSE', function(data) {
    var info = data['proposals'][0];
    $(itemId).append('<h4 class="green-text text-darken-2 center-align" style="display: none"> $' + info['costToComplete'] + '<br> Remaining</h4>');
    $(itemId).append('<h5 class="grey-text darken-3" style="display: none">' + info['percentFunded'] + '% funded</h5>');
    $(itemId).append('<h5 class="new grey-text text-darken-3" style="display: none; text-decoration: underline">' + info['schoolName'] + '</h5>');
    $(itemId).append('<h5 class="new grey-text text-darken-3" style="display: none">' + info['teacherName'] + '</h5>');
    $(itemId).append('<h6 class="new" style="display: none">Grade Level: ' + info['gradeLevel']['name'] + '</h6>');
    $(itemId).append('<h6 class="new" style="display: none">Poverty: ' + info['povertyLevel'] + '</h6>');
    $(itemId).append('<h6 class="new" style="display: none"> Subject: ' + info['subject']['name'] + '</h6>');
    $(itemId).append('<h6 class="new" style="display: none">Type: ' + info['resource']['name'] + '</h6>');
    $(itemId).append('<a class="btn-large green darken-2 hoverable" href=' + info['fundURL'] + ' style="display: none; margin-bottom: 1em;">DONATE</a>');
    $(itemId).append('<img src=' + info['retinaImageURL'] + ' style="display: none; max-width: 30vw;">');
  });
};

function moreInfo() {
  var $id = $(event.target)[0].id.replace(/\D/g,'');
  $('#' + $id + ' button').siblings().toggle('display');
  if ($('#' + $id + ' button').html() == 'Explore') {
    $('#' + $id + ' button').html('Back');
  }
  else {
    $('#' + $id + ' button').html('Explore');
  }
};
