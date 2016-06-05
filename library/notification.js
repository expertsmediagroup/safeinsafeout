function notification(title,message) {
  if(navigator.notification) {
    navigator.notification.alert(message,false,title,'Proceed'); 
  } else {
    alert(message);
  }
}
