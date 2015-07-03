jQuery(document).ready(function ($) {

    $('#loan-amount, #interest-rate, #number-of-months, #grace-period').on('keyup', function () {
        var loanTable = $('.loan-caluclator-table table');
        var loanAmount = $('#loan-amount');
        var interestRate = $('#interest-rate');
        var monthRows = $('#number-of-months');
        var gracePeriod = $('#grace-period');

        var tbody = loanTable.find('tbody');
        var tfoot = loanTable.find('tfoot');

        if (monthRows.val().match(/^\d+$/)) {
            if (tbody.first('tr').length) {
                tbody.empty();
                tfoot.empty();
            }

            var interest = parseFloat(interestRate.val() * 0.01 / monthRows.val() * loanAmount.val()).toFixed(2); // Per month
            var totalPayment = pmt($, interestRate.val(), monthRows.val(), loanAmount.val());
            var principal = parseFloat(totalPayment - interest).toFixed(2);

            var totalPaymentSum = 0;
            var interestSum = 0;
            var principalSum = 0;

            if (gracePeriod.val() > 0) {
                principal = 0;
                totalPayment = interest;
            }

            var balance = loanAmount.val() - principal;

            if (loanAmount.val().length !== 0
                && interestRate.val().length !== 0
                && monthRows.val().length !== 0
                && gracePeriod.val().length !== 0
            ) {

                for (var rc = 1; rc <= monthRows.val(); rc++) {

                    if (rc == monthRows.val()) {
                        totalPayment = parseFloat(parseFloat(totalPayment) + parseFloat(balance)).toFixed(2);
                        principal = parseFloat(principal + balance).toFixed(2);
                        balance = 0;
                    }

                    totalPaymentSum += parseFloat(totalPayment);
                    interestSum += parseFloat(interest);
                    principalSum += parseFloat(principal);

                    tbody.append('<tr><td>' + rc + '</td><td>'
                    + totalPayment + '</td><td>'
                    + interest + '</td><td>'
                    + principal + '</td><td>'
                    + parseFloat(balance).toFixed(2) + '</td></tr>');

                    interest = parseFloat(interestRate.val() * 0.01 / monthRows.val() * balance).toFixed(2);

                    if (rc >= gracePeriod.val()) {
                        totalPayment = pmt($, interestRate.val(), monthRows.val() - gracePeriod.val(), loanAmount.val());
                        principal = parseFloat(totalPayment - interest).toFixed(2);
                    }


                    if (balance - parseInt(balance) > 0) {
                        balance = parseFloat(balance - principal).toFixed(2);
                    } else {
                        balance = parseFloat(balance - principal);
                    }

                }

                tfoot.append('<tr><th class="loan-total"></th><th>' +
                totalPaymentSum.toFixed(2) + '</th><th>' +
                interestSum.toFixed(2) + '</th><th>' +
                Math.round(principalSum).toFixed(2) +
                '</th><th></th></tr>');
                $('.loan-total').html('Total');

                setExportLinkPaths($, loanTable);
            }
        }

    });

});

// nper = number of payments per year * years
var pmt = function ($, interestRate, nper, principal) {

    interestRate = interestRate * 0.01 / 12;

    var payment = principal * interestRate / (1 - Math.pow((1 + interestRate), -nper));

    return parseFloat(payment).toFixed(2);// Round to two decimal places
};


var setExportLinkPaths = function($, table) {

    table.attr('border', '1');
    var tableHtml = table.prop('outerHTML');

    var $basepath = Drupal.settings.basePath;
    var $pdfExportPath = $basepath+'export-pdf-ajax';
    var fileData = {
        html: tableHtml,
        fileName: new Date().getTime()+'.pdf'
    };

    var pdfExport = $('.pdf-export-ajax');
    var body = $('body');

    $.post($pdfExportPath, fileData, function(file) {
        pdfExport.find('a').attr('href', file);
        //pdfExport.show();
    });


    //body.on('mouseover', '.pdf-export-ajax', function(){
    //   $(this).find('i').css('background', '#C5C5C5');
    //});
    //
    //body.on('mouseleave', '.pdf-export-ajax', function(){
    //   $(this).find('i').css('background', 'none');
    //});
};