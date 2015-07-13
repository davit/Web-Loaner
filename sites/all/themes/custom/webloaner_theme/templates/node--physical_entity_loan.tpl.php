<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

    <?php print $user_picture; ?>

    <?php print render($title_prefix); ?>
    <?php if (!$page): ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
    <?php endif; ?>
    <?php print render($title_suffix); ?>

    <?php if ($display_submitted): ?>
        <div class="submitted">
            <?php print $submitted; ?>
        </div>
    <?php endif; ?>

    <div class="content"<?php print $content_attributes; ?>>
        <?php
        // We hide the comments and links now so that we can render them later.
        hide($content['comments']);
        hide($content['links']);
        print render($content);
        ?>
    </div>

    <?php print render($content['links']); ?>

</div>

<div class="col-lg-8 loan-calculator-table">
    <table class="table table-responsive">
        <thead>
        <tr>
            <th>Repayment Date</th>
            <th>Total Payment</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Balance</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
        <tfoot></tfoot>

    </table>
    <div class="pdf-export-ajax">
        <a href="#" target="_blank">
            <img typeof="foaf:Image" src="http://webloaner.ge/sites/all/modules/contrib/views_pdf/images/pdf.png"
                 alt="Physical Entity Statement Forms" title="Physical Entity Statement Forms">
        </a>
    </div>
</div>
