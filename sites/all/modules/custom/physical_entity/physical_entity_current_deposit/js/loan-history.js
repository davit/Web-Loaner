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
            var overdueAccrued = $('.views-field-field-overdue-accrued').filter('td');
            var tempBalance = $(this).val();

            if ($(this).val() >= parseFloat(overdueAccrued.text())) {
                if (overdueAccrued.hasClass('insufficient-amount')) {
                    overdueAccrued.removeClass('insufficient-amount');
                }
                tempBalance -= parseFloat(overdueAccrued.text());
                tempBalance = tempBalance.toFixed(2);
                overdueAccrued.addClass('sufficient-amount');
            }else {
                overdueAccrued.addClass('insufficient-amount');
            }

            if (overdueAccrued.hasClass('sufficient-amount')) {
                if (tempBalance > 0 && tempBalance >= parseFloat(accruedInterest.text())) {
                    if (accruedInterest.hasClass('insufficient-amount')) {
                        accruedInterest.removeClass('insufficient-amount');
                    }
                    tempBalance -= parseFloat(accruedInterest.text());
                    accruedInterest.addClass('sufficient-amount');
                }else {
                    accruedInterest.addClass('insufficient-amount');
                }
            }

            if (accruedInterest.hasClass('sufficient-amount')) {
                if (tempBalance > 0 && tempBalance >= parseFloat(principal.text())) {
                    if (principal.hasClass('insufficient-amount')) {
                        principal.removeClass('insufficient-amount');
                    }
                    tempBalance -= parseFloat(principal.text());
                    principal.addClass('sufficient-amount');
                }else {
                    principal.addClass('insufficient-amount');
                }
            }


            //if ($(this).val() - parseInt(accruedInterest.text()) >= parseInt(principal.text())) {
            //    if (principal.hasClass('insufficient-amount')) {
            //        principal.removeClass('insufficient-amount');
            //    }
            //    principal.addClass('sufficient-amount');
            //}else {
            //    if (principal.hasClass('sufficient-amount')) {
            //        principal.removeClass('sufficient-amount');
            //    }
            //    principal.addClass('insufficient-amount');
            //}

            if ($(this).val().length == 0) {
                accruedInterest.removeClass('insufficient-amount');
                accruedInterest.removeClass('sufficient-amount');
                principal.removeClass('insufficient-amount');
                principal.removeClass('sufficient-amount');
                overdueAccrued.removeClass('insufficient-amount');
                overdueAccrued.removeClass('sufficient-amount');
            }

        });

    });
})(jQuery);