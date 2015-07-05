jQuery(document).ready(function ($) {

    var loanTable = $('.loan-calculator-table table');
    var loanAmount = $('.field-name-field-principal-amount .field-item');
    var interestRate = $('.field-name-field-annual-interest-rate .field-item');
    var monthRows = $('.field-name-field-number-of-periods .field-item');
    var gracePeriod = $('.field-name-field-grace-period .field-item');

    var tbody = loanTable.find('tbody');
    var tfoot = loanTable.find('tfoot');

    if (monthRows.text().match(/^\d+$/)) {
        if (tbody.first('tr').length) {
            tbody.empty();
            tfoot.empty();
        }

        var interest = parseFloat(interestRate.text() * 0.01 / 12 * loanAmount.text()).toFixed(2); // Per month


        var totalPayment = pmt($, interestRate.text(), monthRows.text(), loanAmount.text());
        var principal = parseFloat(totalPayment - interest).toFixed(2);

        var totalPaymentSum = 0;
        var interestSum = 0;
        var principalSum = 0;

        if (gracePeriod.text() > 0) {
            principal = 0;
            totalPayment = interest;
        }

        var balance = loanAmount.text() - principal;

        if (loanAmount.text().length !== 0
            && interestRate.text().length !== 0
            && monthRows.text().length !== 0
            && gracePeriod.text().length !== 0
        ) {

            for (var rc = 1; rc <= monthRows.text(); rc++) {

                if (rc == monthRows.text()) {
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

                interest = parseFloat(interestRate.text() * 0.01 / 12 * balance).toFixed(2);

                if (rc >= gracePeriod.text()) {
                    totalPayment = pmt($, interestRate.text(), monthRows.text() - gracePeriod.text(), loanAmount.text());
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

        }
    }

    setExportLinkPaths($, loanTable);

});

