var native_confirm = confirm;
confirm = function(text) {
  if(native_confirm(text)) $(document).trigger('confirm');
}

$(document).on('device-initialize',function() {
  confirm = function(text) {
    navigator.notification.confirm(text,confirm_success,'Confirmation',['Cancel','OK']);
  }
});

function confirm_success(result) {
  alert(result);
}

/*
      if(result == 2) $(document).trigger('confirm');
*/
