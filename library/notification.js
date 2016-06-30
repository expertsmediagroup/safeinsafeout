$(document).on('device-initialize',function() {
  alert = function(text) {
    navigator.notification.alert(text,function(){},"Notification","OK");
  }
});
