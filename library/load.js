function load(page,history) {
  var url='';

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

  $('#content').hide();
  $('#content').html('');
  $('#button').hide();
  $('#button').html('');
  $('#overlay').show();
  $('#progress').show();

  if(sessionStorage.getItem('url')) url = sessionStorage.getItem('url');

  $.ajax({
    url: url+page[0],
    cache: false,
    success: function(result) {
      $(document).off('submit');

      $('#content').html(result);

      $(document).trigger('load');
      $(document).off('load');
    }
  })
}

function load_display() {
  if(device) $(document).trigger('initialize');

  $('#content').fadeIn(750);
  $('#button').fadeIn(750);
  $('#overlay').fadeOut(750);
  $('#progress').hide();
  $('#connectivity').hide();
}
