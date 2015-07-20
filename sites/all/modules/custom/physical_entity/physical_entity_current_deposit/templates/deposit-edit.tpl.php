<div class="row">
    <div class="col-lg-4">
        <div class="form-group">
            <?php print render($form['personal_id_number_input']); ?>
        </div>

        <div class="form-group">
            <?php print render($form['personal_id_numbers']); ?>
        </div>

        <div class="form-group">
            <?php print render($form['physical_entity']); ?>
        </div>

        <div class="form-group">
            <?php print render($form['currency']); ?>
        </div>

        <div class="form-group">
            <?php print render($form['amount']); ?>
        </div>

        <div class="form-group">
            <?php print render($form['date']); ?>
        </div>

        <div class="form-group">
            <?php print render($form['submit']); ?>
        </div>

    </div>

    <div class="col-lg-8">
        <div class="loan-history-block">
        </div>
    </div>

</div>


<?php print drupal_render_children($form); ?>