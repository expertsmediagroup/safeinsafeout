function login() {
  $.ajax({
    type: 'post',
    url: 'http://www.safein-safeout.com/application_customer/api.php?action=login&step=hash&hash='+localStorage.getItem('hash'),
    data: 'token='+token,
    cache: false,
    success: function(result) {
      result = JSON.parse(result);

      /* PROCEED */
      if(result.status == '1') {
        localStorage.setItem('hash','');
        localStorage.setItem('country','');
        localStorage.setItem('prefix','');

        $('#content').html('');

        window.location = 'index.html';
      }
    }
  });

  return false;
}
