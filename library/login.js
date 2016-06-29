function login() {
  alert('login');
  alert(token);

  $.ajax({
    type: 'post',
    url: 'http://www.safein-safeout.com/application_customer/index.php?action=login&step=hash',
    data: 'hash='+localStorage.getItem('hash'),
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
