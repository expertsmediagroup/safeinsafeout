$(document).on('initialize',function() {
  if($('#form').find('[name="device[0]"]').val() != undefined) $('#form').find('[name="device[0]"]').val(device.platform);

  if($('#form').find('[name="device[1]"]').val() != undefined) $('#form').find('[name="device[1]"]').val(device.version);

  if($('#form').find('[name="device[2]"]').val() != undefined) $('#form').find('[name="device[2]"]').val(device.uuid);
});
