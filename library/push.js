$(document).on('device-initialize',function() {
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
    token = data.registrationId;
  });

  push.on('notification',function(data) {
    load('invitation.html',true);
  });
});
