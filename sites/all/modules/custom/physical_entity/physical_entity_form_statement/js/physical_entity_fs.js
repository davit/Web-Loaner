jQuery(document).ready(function($) {

    $('#edit-personal-id-number-input').on('keyup', function () {
        var $personalIdNumbers = $('#edit-personal-id-numbers');
        var $pattern = $(this).val();

        $personalIdNumbers.find('option').each(function() {
            if ($(this).text().match("^"+$pattern) && $pattern.length !== 0) {
                $(this).attr('selected', true);
                var $physicalEntity = $('#edit-physical-entity');
                $physicalEntity.find('option[value="'+$(this).val()+'"]').attr('selected', true);
                $physicalEntity.trigger('change');
            }else if ($pattern.length === 0){
                $personalIdNumbers.find('option:first').attr('selected', true);
                $('#edit-physical-entity').find('option:first').attr('selected', true);
            }
        });
    });

    $('#edit-personal-id-numbers').on('change', function() {
        var $physicalEntity = $('#edit-physical-entity');

        $physicalEntity.find('option[value="'+$(this).val()+'"]').attr('selected', true);
        $physicalEntity.trigger('change');
    });

    $('#edit-annual-interest-rate').on('change', function () {
        if ($(this).val() == 'Other') {
            $('.form-item-interest-rate-other').show();
        }else {
            $('.form-item-interest-rate-other').hide();
        }
    });


    $('body').on('dblclick', '.view-physical-entity-statement-forms', function() {
        var table = $(this).find('table');

        if (!(table.hasClass('table-layout-auto'))) {
            table.addClass('table-layout-auto');
        }else {
            table.removeClass('table-layout-auto');
        }
    });


});