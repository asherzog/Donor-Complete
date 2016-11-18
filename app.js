$(document).ready(function() {
  $.getJSON(API +'costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&max=12&APIKey=DONORSCHOOSE',
  appendPage);
  $('.parallax').parallax();
  $('form').submit(citySearch);
  $('#close').click(resetPage);
  $('.brand-logo').click(resetPage);
});

var API = 'https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?';

var loadMoreCount = 0;

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
  $.getJSON(API +'sortBy=2&description=true&concise=true&max=40&cityName=' + $val +  '&APIKey=DONORSCHOOSE',
  searchReturn);
};

function resetPage() {
  location.reload();
  $('html, body').animate({scrollTop: 0},500);
};


function appendPage(data) {
  var $proposals = data["proposals"];
  $('.main').append('<div id="main" class="row"></div>');
  $proposals.forEach(addCardsToPage);

  $('.xtra-info').click(moreInfoButton);
  if (loadMoreCount < 3) {
    $('.main').append('<button type="button" class= "btn grey darken-3 hoverable btn center-align load-more">More</button>');
    $('.load-more').click(loadMoreItems);
  }
};

function addToPage(data) {
  var $proposals = data["proposals"];
  $proposals.forEach(addCardsToPage);

  $('.xtra-info').click(moreInfoButton);
  if (loadMoreCount < 3) {
    $('.main').append('<button type="button" class= "btn grey darken-3 hoverable btn center-align load-more">More</button>');
    $('.load-more').click(loadMoreItems);
  }
}


function addCardsToElement(selector, item) {
  var itemId = ('#' + item['id']);
  $(selector).append('<div class="card-panel hoverable center-align grey lighten-4" id=' + item['id'] + '></div>');
  $(itemId).append('<img class="old' + item['id'] + ' responsive-img z-depth-3" src='+ item['imageURL'] + ' style="max-width: 30vw;"></img>');
  $(itemId).append('<h5 class="old' + item['id'] + ' grey-text text-darken-3">' + item['title'] + '</h5>');
  $(itemId).append('<h6 class=old' + item['id'] + '>' + item['city'] + ', ' + item['state'] + '</h6>');
  $(itemId).append('<h4 class="old' + item['id'] + ' green-text text-darken-2 center-align"> $' + item['costToComplete'] + '<br> Remaining</h4>');
  $(itemId).append('<p class=old' + item['id'] + '>' + item['shortdescription'] + '</p>');
  $(itemId).append('<button id=btn' + itemId + ' type="button" class=" btn grey darken-3 hoverable btn xtra-info">Explore</button>');

  $.getJSON(API +'keywords=' + item['id'] + '&APIKey=DONORSCHOOSE', function(data) {
    var info = data['proposals'][0];
    var id = info['id'];
    $(itemId).append('<h4 class="new' + id + ' green-text text-darken-2 center-align" style="display: none"> $' + info['costToComplete'] + '<br> Remaining</h4>');
    $(itemId).append('<h5 class="new' + id + ' grey-text darken-3" style="display: none">' + info['percentFunded'] + '% funded</h5>');
    $(itemId).append('<h5 class="new' + id + ' grey-text text-darken-3" style="display: none; text-decoration: underline">' + info['schoolName'] + '</h5>');
    $(itemId).append('<h5 class="new' + id + ' grey-text text-darken-3" style="display: none">' + info['teacherName'] + '</h5>');
    $(itemId).append('<h6 class="new' + id + '" style="display: none">Grade Level: ' + info['gradeLevel']['name'] + '</h6>');
    $(itemId).append('<h6 class="new' + id + '" style="display: none">Poverty: ' + info['povertyLevel'] + '</h6>');
    $(itemId).append('<h6 class="new' + id + '" style="display: none"> Subject: ' + info['subject']['name'] + '</h6>');
    $(itemId).append('<h6 class="new' + id + '" style="display: none">Type: ' + info['resource']['name'] + '</h6>');
    $(itemId).append('<a class="new' + id + ' btn grey darken-2 hoverable" href=' + info['proposalURL'] + ' style="display: none; margin-bottom: 1em;">Readme</a>');
    $(itemId).append('<a class="new' + id + ' btn-large green darken-2 hoverable" href=' + info['fundURL'] + ' style="display: none; margin-bottom: 1em;">DONATE</a>');
    $(itemId).append('<img id="retina" class= new' + id + ' src=' + info['retinaImageURL'] + ' style="display: none;">');
  });
}


function addCardsToPage(item) {
  addCardsToElement('#main', item);
};


function moreInfoButton() {
  var $id = $(event.target)[0].id.replace(/\D/g,'');
  var $button = $('#' + $id + ' button');
  // $button.siblings().toggle('display');
  if ($button.html() == 'Explore') {
    $('.old' + $id).hide();
    $('.new' + $id).show();
    $button.html('Back');
  }
  else {
    $('.new' + $id).hide();
    $('.old' + $id).show();
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

function loadMoreItems() {
  if( loadMoreCount == 0) {
    $('.load-more').remove();
    $.getJSON(API + 'costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&index=14&max=12&APIKey=DONORSCHOOSE',
    addToPage);
    loadMoreCount += 1;
  }
  else if (loadMoreCount == 1) {
    $('.load-more').remove();
    $.getJSON(API + 'costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&index=27&max=12&APIKey=DONORSCHOOSE',
    addToPage);
    loadMoreCount += 1;
  }
  else if (loadMoreCount == 2) {
    $('.load-more').remove();
    $.getJSON(API + 'costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&index=40&max=12&APIKey=DONORSCHOOSE',
    addToPage);
    loadMoreCount += 1;
  }
}
