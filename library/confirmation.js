$(document).on('device-initialize',function() {
  confirm = function(text) {
    navigator.notification.confirm(text,function(result){return(result)},'Confirmation',['Cancel','OK']);
  }
});
