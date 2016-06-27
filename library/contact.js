/* if(data[a].phoneNumbers != null && data[a].phoneNumbers.length > 0) for(b=0;b<data[a].phoneNumbers.length;b++) if(data[a].phoneNumbers[b].value != null && data[a].phoneNumbers[b].value != undefined && data[a].phoneNumbers[b].type == 'mobile') { */

$(document).on('initialize',function() {
  var option,field;

  if($('form').find('[name="contact"]').length || $('span').data('contact')) { 
    alert('Contact Fix');

    option = new ContactFindOptions();
  
    option.filter = '';
    option.multiple = true;
    option.hasPhoneNumber = true;
  
    field = ['displayName','phoneNumbers'];

    navigator.contacts.find(field,contact_success,contact_fail,option);
  }
})

function contact_success(data) {
  alert(JSON.stringify(data));
  var name='',phone='',list=[],list_bypass=[],phoneparser=[];
  
  for(a=0;a<data.length;a++) {
    if(data[a].displayName != null && data[a].displayName != undefined) {
      name = data[a].displayName;
      name = name.replace(/'/g,"''");
    
      if(data[a].phoneNumbers != null && data[a].phoneNumbers.length > 0) for(b=0;b<data[a].phoneNumbers.length;b++) if(data[a].phoneNumbers[b].value != null && data[a].phoneNumbers[b].value != undefined) {            
        phone = data[a].phoneNumbers[b].value;
        phone = phone.replace(/[^0-9+]/g,'');
  
        if(phone.indexOf('+') < 0) phone = localStorage.getItem('prefix')+phone;
  
        if(!list_bypass[phone]) list[list.length] = name+'|'+phone;
        
        list_bypass[phone] = true;
      }
    }
  }
  
  list.sort();

  for(a=0;a<list.length;a++) {
    list[a] = list[a].split('|');
    
    phoneparser = parsePhone(list[a][1]);

    phone = '+'+phoneparser.countryCode+'-'+phoneparser.areaCode+'-'+phoneparser.number;

    $('span[data-contact="'+phone+'"]').html(list[a][0]+' ('+phone+')');

    $('#form').find('[name="contact"]').append('<option value="'+phone+'">'+list[a][0]+' ('+phone+')</option>');        
  }

  if($('#form').find('[name="phone"]').val()) $('#form').find('[name="contact"]').val($('#form').find('[name="phone"]').val());
}

function contact_fail(message) {
}
