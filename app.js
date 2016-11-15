$(document).ready(function() {
  $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?costToCompleteRange=0+TO+100&sortBy=2&description=true&concise=true&max=21&APIKey=DONORSCHOOSE',
  appendPage);
  // $('.parallax').parallax();
});


function appendPage(data) {
  var $proposals = data["proposals"];
  $('.main').append('<div id="main" class="row grey lighten-1"></div>');
  $proposals.forEach(addStuffToPage);

  $('button').click(function() {
    $('.modal-content').html('');
    var $id = $(event.target)[0].parentElement.id;
    $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?keywords=' + $id + '&APIKey=DONORSCHOOSE', function(data) {
      var info = data['proposals'][0];
      $('.modal-content').append('<h5 class="new grey-text text-darken-3"">' + info['schoolName'] + '</h5>');
      $('.modal-content').append('<h5 class="new grey-text text-darken-3"">Teacher: ' + info['teacherName'] + '</h5>');
      $('.modal-content').append('<h6 class="new"">Grade Level: ' + info['gradeLevel']['name'] + '</h6>');
      $('.modal-content').append('<h6 class="new"">Poverty: ' + info['povertyLevel'] + '</h6>');
      $('.modal-content').append('<h6 class="new""> Subject: ' + info['subject']['name'] + '</h6>');
      $('.modal-content').append('<h6 class="new"">Type: ' + info['resource']['name'] + '</h6>');
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
  $(itemId).append('<button type="button" class="btn btn-primary" data-toggle="modal" data-target=.bs-example-modal-lg>Learn More</button>');

  $.getJSON('https://galvanize-cors-proxy.herokuapp.com/https://api.donorschoose.org/common/json_feed.html?keywords=' + item['id'] + '&APIKey=DONORSCHOOSE', function(data) {
    var info = data['proposals'][0];
    $(itemId).append('<h5 class="new grey-text text-darken-3" style="display: none">' + info['schoolName'] + '</h5>');
    $(itemId).append('<h5 class="new grey-text text-darken-3" style="display: none">Teacher: ' + info['teacherName'] + '</h5>');
    $(itemId).append('<h6 class="new" style="display: none">Grade Level: ' + info['gradeLevel']['name'] + '</h6>');
    $(itemId).append('<h6 class="new" style="display: none">Poverty: ' + info['povertyLevel'] + '</h6>');
    $(itemId).append('<h6 class="new" style="display: none"> Subject: ' + info['subject']['name'] + '</h6>');
    $(itemId).append('<h6 class="new" style="display: none">Type: ' + info['resource']['name'] + '</h6>');
  });
};

function moreInfo() {
  var $id = $(event.target)[0].id.replace(/\D/g,'');
  $('#' + $id + ' button').siblings().toggle('display');
};
