$(document).on('device-load',function() {
  if($('#form').find('[name="device[0]"]').val() != undefined) $('#form').find('[name="device[0]"]').val(device.platform);

  if($('#form').find('[name="device[1]"]').val() != undefined) $('#form').find('[name="device[1]"]').val(device.version);
});
