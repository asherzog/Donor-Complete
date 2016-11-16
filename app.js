$(document).ready(function() {
  $.getJSON(API +'costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&max=12&APIKey=DONORSCHOOSE',
  appendPage);
  $('.parallax').parallax();
  $('form').submit(citySearch);
  $('#close').click(resetPage);
  $('.brand-logo').click(resetPage);
});

var API = 'https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?';


function citySearch(event) {
  event.preventDefault();
  var $val = $('input').val();
  if ($val.split(' ').length < 2) {
    $val = $val.charAt(0).toUpperCase() + $val.slice(1);
  }else{
    $val = $val.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }
  $('.main').fadeOut(750);
  $('.search').html('').fadeOut(750).fadeIn();
  $('input').val('');
  document.getElementById("main").scrollIntoView();
  $.getJSON(API +'sortBy=2&description=true&concise=true&max=12&cityName=' + $val +  '&APIKey=DONORSCHOOSE',
  searchReturn);
};

function resetPage() {
  $('.main').fadeIn(750);
  $('.search').fadeOut(750);
  $('html, body').animate({scrollTop: 0},500);
};


function appendPage(data) {
  var $proposals = data["proposals"];
  $('.main').append('<div id="main" class="row"></div>');
  $proposals.forEach(addCardsToPage);

  $('.xtra-info').click(moreInfoButton);
};


function addCardsToElement(selector, item) {
  var itemId = ('#' + item['id']);
  $(selector).append('<div class="card-panel hoverable center-align grey lighten-4" id=' + item['id'] + '></div>');
  $(itemId).append('<img class="responsive-img z-depth-3" src='+ item['imageURL'] + ' style="max-width: 30vw;"></img>');
  $(itemId).append('<h5 class="grey-text text-darken-3">' + item['title'] + '</h5>');
  $(itemId).append('<h6>' + item['city'] + ', ' + item['state'] + '</h6>');
  $(itemId).append('<h4 class="green-text text-darken-2 center-align"> $' + item['costToComplete'] + '<br> Remaining</h4>');
  $(itemId).append('<p>' + item['shortdescription'] + '</p>');
  $(itemId).append('<button id=btn' + itemId + ' type="button" class= "btn grey darken-3 hoverable btn xtra-info">Explore</button>');

  $.getJSON(API +'keywords=' + item['id'] + '&APIKey=DONORSCHOOSE', function(data) {
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
}


function addCardsToPage(item) {
  addCardsToElement('#main', item);
};


function moreInfoButton() {
  var $id = $(event.target)[0].id.replace(/\D/g,'');
  var $button = $('#' + $id + ' button');
  $button.siblings().toggle('display');
  if ($button.html() == 'Explore') {
    $button.html('Back');
  }
  else {
    $button.html('Explore');
  }
};


function searchReturn(data) {
  var proposals = data['proposals'];
  var $searchSection = $('.search');
  $searchSection.fadeIn();
  $('.search').append('<div id="new" class="row"></div>');
  proposals.forEach(function(item) {
    addCardsToElement('#new', item);
  });
  $('.xtra-info').click(moreInfoButton);
};
