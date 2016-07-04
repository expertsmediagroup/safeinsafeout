var confirm_native = confirm;

confirm = function(text) {
  if(confirm_native(text)) $(document).trigger('confirm');
}

$(document).on('device-initialize',function() {
  $(document).on('confirm',function() {
    alert('trigger process');
  });

  confirm = function(text) {
    alert('trigger');

    $(document).trigger('confirm');
  }
});
