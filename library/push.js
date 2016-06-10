$(document).on('initialize',function() {
  var push;

  push = PushNotification.init({
    android: {
        senderID: "386444212972",
        forceShow: "true"
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
  });

  push.on('registration',function(data) {
    if($('#form').find('[name="device[3]"]').val() != undefined) {
      $('#form').find('[name="device[3]"]').val(data.registrationId);
    }
  });

  push.on('notification',function(data) {
    load('invitation.html',true);
  });
});
