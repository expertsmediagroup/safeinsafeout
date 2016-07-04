var confirm_native = confirm;

confirm = function(text) {
  if(confirm_native(text)) $(document).trigger('confirm');
}

$(document).on('device-initialize',function() {
  confirm = function(text) {
    $(document).trigger('confirm');
  }
});
