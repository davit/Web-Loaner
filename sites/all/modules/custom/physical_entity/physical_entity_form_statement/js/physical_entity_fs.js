jQuery(document).ready(function($) {

    $('#edit-personal-id-number-input').on('keyup', function () {
        var $personalIdNumbers = $('#edit-personal-id-numbers');
        var $pattern = $(this).val();

        $personalIdNumbers.find('option').each(function() {
            if ($(this).text().match("^"+$pattern) && $pattern.length !== 0) {
                $(this).attr('selected', true);
                $('#edit-physical-entity').find('option[value="'+$(this).val()+'"]').attr('selected', true);
            }else if ($pattern.length === 0){
                $personalIdNumbers.find('option:first').attr('selected', true);
                $('#edit-physical-entity').find('option:first').attr('selected', true);
            }
        });
    });

    $('#edit-annual-interest-rate').on('change', function () {
       if ($(this).val() == 'Other') {
           $('.form-item-interest-rate-other').show();
       }else {
           $('.form-item-interest-rate-other').hide();
       }
    });
});