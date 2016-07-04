var native_confirm = confirm;
confirm = function(text) {
  if(native_confirm(text)) $(document).trigger('confirm');
}

$(document).on('device-initialize',function() {
  confirm = function(text) {
    navigator.notification.confirm(text,confirm_success,'Confirmation',['OK','Cancel']);
  }
});

function confirm_success(result) {
  if(result == 1) $(document).trigger('confirm');
}
