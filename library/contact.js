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

  contact = [];
  
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
  var contact_split=[],code='';

  if(interval) {
    if($('span').data('contact')) {
      $('span[data-contact]').html('Unknown');

      for(a=0;a<contact.length;a++) {
        contact_split = contact[a].split('|');
      
        phoneparser = parsePhone(contact_split[1]);
     
        if(phoneparser) {
          phone = '+'+phoneparser.countryCode+'-'+phoneparser.areaCode+'-'+phoneparser.number;
     
          $('span[data-contact="'+phone+'"]').html(contact_split[0]);
        }
      }
    }

    if($('form').find('[name="contact"]').length) {
      code = '<option value="">Unknown';

      for(a=0;a<contact.length;a++) {
        contact_split = contact[a].split('|');

        phoneparser = parsePhone(contact_split[1]);

        if(phoneparser) {
          phone = '+'+phoneparser.countryCode+'-'+phoneparser.areaCode+'-'+phoneparser.number;

          if($('#form').find('[name="phone"]').val() == phone) code += '<option value="'+phone+'" selected>'+contact_split[0]+' ('+phone+')';
          else                                                 code += '<option value="'+phone+'">'+contact_split[0]+' ('+phone+')';

          if($('#form').find('[name="phone"]').val() == phone) alert('match ['+$('#form').find('[name="phone"]').val()+'] - ['+phone+']');
        }
      }

      $('#form').find('[name="contact"]').html(code);
    }
  } else {
    setTimeout(contact_success_interval,100);
  }
}

function contact_fail(message) {
}
