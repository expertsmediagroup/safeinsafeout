function load(page,history) {
  page = page.split('#');

  if(history) {   
    if(page[1]) window.history.pushState(page[0]+'#'+page[1], '', 'index.html#'+page[0].replace('.html','')+'/'+page[1]);
    else        window.history.pushState(page[0], '', 'index.html#'+page[0].replace('.html',''));
  }

  if(localStorage.getItem('hash')) {
    $('#bar_outside').css('visibility','hidden');
    $('#tabs_outside').css('visibility','hidden');

    $('#bar_inside').css('visibility','visible');
    $('#tabs_inside').css('visibility','visible');
  } else {
    $('#bar_outside').css('visibility','visible');
    $('#tabs_outside').css('visibility','visible');

    $('#bar_inside').css('visibility','hidden');
    $('#tabs_inside').css('visibility','hidden');
  }

  $('#wrapper').html('');
  $('#overlay').show();

  $.ajax({
    url: 'http://www.safein-safeout.com/development/'+page[0],
    cache: false,
    success: function(result) {
      $(document).off("submit");

      $('#wrapper').html(result);

      $(document).trigger("load");
      $(document).off("load");
    }
  })
}

function load_display() {
  if(device) $(document).trigger("initialize");

  $('#overlay').fadeOut(750);
  $('#content').fadeIn(750);
  $('#button').fadeIn(750);
}
