var interval,contact=[];
$(document).on('device-initialize device-resume',function() {
  var option,field;

  interval = false;

  option = new ContactFindOptions();
  
  option.filter = '';
  option.multiple = true;
  option.hasPhoneNumber = true;

  field = [navigator.contacts.fieldType.displayName,navigator.contacts.fieldType.phoneNumbers];

  navigator.contacts.find(field,contact_success,contact_fail,option);
});

$(document).on('device-load device-resume',function() {
  if($('form').find('[name="contact"]').length || $('span').data('contact')) { 
    contact_success_interval(); 
  }
})

function contact_success(data) {
  var name='',phone='',contact_bypass=[],phoneparser=[];
  
  for(a=0;a<data.length;a++) {
    if(data[a][navigator.contacts.fieldType.displayName] != null && data[a][navigator.contacts.fieldType.displayName] != undefined) {
      name = data[a][navigator.contacts.fieldType.displayName];
      name = name.replace(/[^A-Za-z0-9 +]/g,'');
    
      if(data[a][navigator.contacts.fieldType.phoneNumbers] != null && data[a][navigator.contacts.fieldType.phoneNumbers].length > 0) for(b=0;b<data[a][navigator.contacts.fieldType.phoneNumbers].length;b++) if(data[a][navigator.contacts.fieldType.phoneNumbers][b].value != null && data[a][navigator.contacts.fieldType.phoneNumbers][b].value != undefined) {            
        phone = data[a][navigator.contacts.fieldType.phoneNumbers][b].value;
        phone = phone.replace(/[^0-9+]/g,'');
   
        if(phone.indexOf('+') < 0) phone = localStorage.getItem('prefix')+phone;
  
        if(!contact_bypass[phone]) contact[contact.length] = name+'|'+phone;
  
        contact_bypass[phone] = true;
      }
    }
  }

  contact.sort();

  interval = true;
}

function contact_success_interval() {
  if(interval) {
    if($('span').data('contact')) {
      for(a=0;a<list.length;a++) {
        list[a] = list[a].split('|');
      
        phoneparser = parsePhone(list[a][1]);
     
        if(phoneparser) {
          phone = '+'+phoneparser.countryCode+'-'+phoneparser.areaCode+'-'+phoneparser.number;
     
          $('span[data-contact="'+phone+'"]').html(list[a][0]+' ('+phone+')');
        }
      }
    }

    alert('int');

    interval = false;
  } else {
    setTimeout(contact_success_interval,1000);
  }
}

function contact_fail(message) {
}
