var confirm_native = confirm;
confirm = function(text) {
  alert(confirm_native('test 1'));

  if(confirm_native('test 2') === true) alert('test 2 true');
 

/*
  if(confirm_native(text)) $(document).trigger('confirm');
*/
}

/*
$(document).on('device-initialize',function() {
  confirm = function(text) {
    navigator.notification.confirm(text,function(result){alert(result)},'Confirmation',['Cancel','OK']);
  }
});
*/
