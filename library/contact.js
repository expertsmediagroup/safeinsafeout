$(document).on('initialize',function() {
  var option,field;

  if($('form').find('[name="contact"]').length || $('span').data('contact')) { 
    alert('Contact Fix #8');

    option = new ContactFindOptions();
  
    option.filter = '';
    option.multiple = true;
    option.hasPhoneNumber = true;
    option.desiredFields = [navigator.contacts.fieldType.id];

    field = [navigator.contacts.fieldType.displayName,navigator.contacts.fieldType.phoneNumbers];

    navigator.contacts.find(field,contact_success,contact_fail,option);
  }
})

function contact_success(data) {
for(a=0;a<data.length;a++) {
  alert(data[a].displayName);
}

/*
  var name='',phone='',list=[],list_bypass=[],phoneparser=[];
  
  for(a=0;a<data.length;a++) {
    if(data[a].displayName != null && data[a].displayName != undefined) {
      name = data[a].displayName;
      name = name.replace(/[^A-Za-z0-9 +]/g,'');
    
      if(data[a].phoneNumbers != null && data[a].phoneNumbers.length > 0) for(b=0;b<data[a].phoneNumbers.length;b++) if(data[a].phoneNumbers[b].value != null && data[a].phoneNumbers[b].value != undefined) {            
        phone = data[a].phoneNumbers[b].value;
        phone = phone.replace(/[^0-9+]/g,'');
  
        if(phone.indexOf('+') < 0) phone = localStorage.getItem('prefix')+phone;

        if(!list_bypass[phone]) list[list.length] = name+'|'+phone;

        list_bypass[phone] = true;
      }
    }
  }
    alert('Contact Fix #5-2');
  
  list.sort();

    alert('Contact Fix #5-3');

  for(a=0;a<list.length;a++) {
    list[a] = list[a].split('|');
    
    phoneparser = parsePhone(list[a][1]);

    phone = '+'+phoneparser.countryCode+'-'+phoneparser.areaCode+'-'+phoneparser.number;

    $('span[data-contact="'+phone+'"]').html(list[a][0]+' ('+phone+')');

    $('#form').find('[name="contact"]').append('<option value="'+phone+'">'+list[a][0]+' ('+phone+')</option>');        
  }

    alert('Contact Fix #5-4');
*/

  if($('#form').find('[name="phone"]').val()) $('#form').find('[name="contact"]').val($('#form').find('[name="phone"]').val());
}

function contact_fail(message) {
  alert(message);
}
