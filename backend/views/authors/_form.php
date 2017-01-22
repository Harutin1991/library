<?php

use kartik\date\DatePicker;
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\Url;
use kartik\select2\Select2;


/* @var $this yii\web\View */
/* @var $model backend\models\Books */
/* @var $form yii\widgets\ActiveForm */


if (!$model->isNewRecord) {
    $formId = 'authorsUpdate';
    $action = '/authors/update?id=' . $model->id;
} else {
    $formId = 'authorsCreate';
    $action = '/authors/create';
    $model->status = 1;
}
?>


<div class="authors-form">
    <?= Html::a('Back to book list', ['/authors/index'], ['class' => 'btn btn-primary mb15']) ?>
    <div class="panel sort-disable mb50" id="p2" data-panel-color="false" data-panel-fullscreen="false"
         data-panel-remove="false" data-panel-title="false">
        <div class="panel-heading">
            <span class="panel-title">
                <?php echo ($model->isNewRecord) ? Yii::t('app', 'Add New Book') : Yii::t('app', 'Update Book') ?>
            </span>
        </div>

        <div class="panel-body" style="display: block;">
            <div class="tab-content pn br-n admin-form">
                <div class="tab-pane" id="tr_blog"></div>

                <div class="tab-pane active" id="tab_1">
                    <?php
                    $form = ActiveForm::begin([
                                'action' => [$action],
                                'id' => $formId,
                    ]);
                    ?>
                    <div class="tab-content pn br-n admin-form">
                        <div class="section row">
                            <div class="col-md-3">
                                <?=
                                        $form->field($model, 'firstname', ['template' => '<div class="col-md-12" style="padding: 0"><label for="repairer-title" class="field prepend-icon">
                                    {input}<label for="books-title" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                        ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'First Name')])->label(false)
                                ?>
                            </div>
                            <div class="col-md-3">
                                <?=
                                        $form->field($model, 'lastname', ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-short_description" class="field prepend-icon">
                                    {input}<label for="books-short_description" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                        ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Last Name')])->label(false)
                                ?>
                            </div>
                            <div class="col-md-3">
                                <?=
                                        $form->field($model, 'email', ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-short_description" class="field prepend-icon">
                                    {input}<label for="books-short_description" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                        ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Email')])->label(false)
                                ?>
                            </div>
                            <div class="col-md-3">
                                <?=
                                        $form->field($model, 'phone', ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-short_description" class="field prepend-icon">
                                    {input}<label for="books-short_description" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                        ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Phone')])->label(false)
                                ?>
                            </div>
                        </div>
                        <div class="section row">
                            <div class="col-md-4">
                                <?=
                                        $form->field($model, 'country', ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-url" class="field prepend-icon">
                                    {input}<label for="books-url" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                        ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Country')])->label(false)
                                ?>
                            </div>
                            <div class="col-md-4">
                                <?=
                                        $form->field($model, 'city', ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-url" class="field prepend-icon">
                                    {input}<label for="books-url" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                        ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'City')])->label(false)
                                ?>
                            </div>
                            <div class="col-md-4">
                                <?=
                                        $form->field($model, 'address', ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-url" class="field prepend-icon">
                                    {input}<label for="books-url" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                        ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Address')])->label(false)
                                ?>
                            </div>
                        </div>
                        <div class="section row">
                            <div class="col-md-6">
                                <?=
                                $form->field($model, 'birthday', ['template' => '<div class="col-md-10">{label}{input}{error}</div>'])->widget(DatePicker::classname(), [
                                    'model' => $model,
                                    'attribute' => 'birthday',
                                ])->label("<h5 class='p2'>".Yii::t('app', 'Birth Day')."</h5>")
                                ?>
                            </div>
                            <div class="col-md-6">
                                <?= $form->field($model, 'status')->widget(Select2::className(), [
                                    'data' => ["Pasive", "Active"],
                                    'language' => Yii::$app->language,
                                    'options' => ['placeholder' => 'Select Status ...'],
                                    'pluginOptions' => [
                                        'allowClear' => true,
                                        'multiple' => false
                                    ],
                                ])->label("<h5 class='p2'>".Yii::t('app', 'Author Status')."</h5>") ?>
                            </div>

                        </div>


                        <div class="form-group col-md-12">
                            <?=
                            Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), [
                                'class' => $model->isNewRecord ? 'btn btn-sm btn-primary pull-right ' : 'btn btn-sm btn-success pull-right',
                                'id' => $formId,
                                'type' => 'button'
                            ])
                            ?>
                            <?php
                            if (!$model->isNewRecord) {
                                echo Html::a(Yii::t('app', 'Reset'), Url::to('/' . Yii::$app->language . '/blog/index', true), ['class' => 'btn btn-default btn-sm ph25 reste-button pull-right']);
                            }
                            ?>
                        </div>
                    </div>
<?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
echo $this->registerJs("
jQuery(document).ready(function () {
$('#authors-phone').mask('99-99-9999-9999');
})
") ?>

