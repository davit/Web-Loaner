(function ($) {
    $(document).ready(function () {

        $('.form-item-physical-entity').on('change', function () {
            var physical_entity_id =  $(this).find('option:selected').val();

            $.get(Drupal.settings.basePath + 'add-deposit/history/'+physical_entity_id+'/'+'2015-07-12', function (data) {
                $('.loan-history-block').html(data);
                $('.views-ui-edit').hide();
            });
        });

        $('#edit-amount').on('input', function() {
            var totalAmount = $('.views-field-field-total-amount').filter('td');
            var accruedInterest = $('.views-field-field-interest-accrued').filter('td');
            var principal = $('.views-field-field-principal').filter('td');

            if ($(this).val() >= parseInt(accruedInterest.text())) {
                if (accruedInterest.hasClass('insufficient-amount')) {
                    accruedInterest.removeClass('insufficient-amount');
                }
                accruedInterest.addClass('sufficient-amount');
            }else {
                if (accruedInterest.hasClass('sufficient-amount')) {
                    accruedInterest.removeClass('sufficient-amount');
                }
                accruedInterest.addClass('insufficient-amount');
            }

            if ($(this).val() - parseInt(accruedInterest.text()) >= parseInt(principal.text())) {
                if (principal.hasClass('insufficient-amount')) {
                    principal.removeClass('insufficient-amount');
                }
                principal.addClass('sufficient-amount');
            }else {
                if (principal.hasClass('sufficient-amount')) {
                    principal.removeClass('sufficient-amount');
                }
                principal.addClass('insufficient-amount');
            }

            if ($(this).val().length == 0) {
                accruedInterest.removeClass('insufficient-amount');
                accruedInterest.removeClass('sufficient-amount');
                principal.removeClass('insufficient-amount');
                principal.removeClass('sufficient-amount');
            }

        });

    });
})(jQuery);