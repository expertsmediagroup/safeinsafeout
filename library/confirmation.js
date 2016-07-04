var confirm_native = confirm;
confirm = function(text) {
  if(confirm_native(text)) $(document).trigger('confirm');
}

/*
$(document).on('device-initialize',function() {
  confirm = function(text) {
    navigator.notification.confirm(text,function(result){alert(result)},'Confirmation',['Cancel','OK']);
  }
});
*/
