jQuery(document).ready(function($) {

    $('#edit-personal-id-numbers').on('change', function () {
        var $nid = $(this).val();
        $('#edit-physical-entities').find('option[value="'+$nid+'"]').attr('selected', 'selected');
    });

    $('#edit-annual-interest-rate').on('change', function () {
       if ($(this).val() == 'other') {
           $('.form-item-interest-rate-other').show();
       }else {
           $('.form-item-interest-rate-other').hide();
       }
    });
});