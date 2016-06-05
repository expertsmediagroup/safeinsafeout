function login() {
  $.ajax({
    type: 'post',
    url: 'http://www.safein-safeout.com/application_customer/index.php?action=login&step=hash',
    data: 'hash='+localStorage.getItem('hash'),
    cache: false,
    success: function(result) {
      result = JSON.parse(result);

      /* PROCEED */
      if(result.status == '1') {
        localStorage.setItem('country','');
        localStorage.setItem('hash','');
        localStorage.setItem('prefix','');

        $('#wrapper').html('');

        window.location = 'index.html';
      }
    }
  })

return false;
}
