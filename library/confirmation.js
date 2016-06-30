$(document).on('device-initialize',function() {
  confirm = function(text) {
    navigator.notification.confirm(text,null,'Confirmation',['Cancel','OK']);
  }
});
