$(document).on('initialize',function() {
  var option,field;

  if($('form').find('[name="contact"]').length || $('span').data('contact')) { 
    alert('Contact Fix #13');

    option = new ContactFindOptions();
  
    option.filter = '';
    option.multiple = true;
    option.hasPhoneNumber = true;

    field = [navigator.contacts.fieldType.displayName,navigator.contacts.fieldType.phoneNumbers];

    navigator.contacts.find(field,contact_success,contact_fail,option);
  }
})

function contact_success(data) {
  alert('Contact Fix #13-2');
  alert(JSON.stringify(data));

  var name='',phone='',list=[],list_bypass=[],phoneparser=[];
  
  for(a=0;a<data.length;a++) {
    if(data[a][navigator.contacts.fieldType.displayName] != null && data[a][navigator.contacts.fieldType.displayName] != undefined) {
      name = data[a][navigator.contacts.fieldType.displayName];
      name = name.replace(/[^A-Za-z0-9 +]/g,'');
    
      if(data[a][navigator.contacts.fieldType.phoneNumbers] != null && data[a][navigator.contacts.fieldType.phoneNumbers].length > 0) for(b=0;b<data[a][navigator.contacts.fieldType.phoneNumbers].length;b++) if(data[a][navigator.contacts.fieldType.phoneNumbers][b].value != null && data[a][navigator.contacts.fieldType.phoneNumbers][b].value != undefined) {            
        phone = data[a][navigator.contacts.fieldType.phoneNumbers][b].value;
        phone = phone.replace(/[^0-9+]/g,'');
  
        if(phone.indexOf('+') < 0) phone = localStorage.getItem('prefix')+phone;

        if(!list_bypass[phone]) list[list.length] = name+'|'+phone;

        list_bypass[phone] = true;
      }
    }
  }

  alert('Contact Fix #13-3');  
  alert(JSON.stringify(list));

  list.sort();

  alert('Contact Fix #13-4');  
  alert(JSON.stringify(list));

  for(a=0;a<list.length;a++) {
    list[a] = list[a].split('|');
    
    phoneparser = parsePhone(list[a][1]);

    if(phoneparser) {
      phone = '+'+phoneparser.countryCode+'-'+phoneparser.areaCode+'-'+phoneparser.number;

      $('span[data-contact="'+phone+'"]').html(list[a][0]+' ('+phone+')');

      $('#form').find('[name="contact"]').append('<option value="'+phone+'">'+list[a][0]+' ('+phone+')</option>');        
    }
  }

  alert('Contact Fix #13-5');  

  if($('#form').find('[name="phone"]').val()) $('#form').find('[name="contact"]').val($('#form').find('[name="phone"]').val());

  alert('Contact Fix #13-6');  
}

function contact_fail(message) {
}
