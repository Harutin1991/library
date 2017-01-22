<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\Url;
use kartik\select2\Select2;
use backend\models\Authors;
use kartik\date\DatePicker;

/* @var $this yii\web\View */
/* @var $model backend\models\Books */
/* @var $form yii\widgets\ActiveForm */

$authors = Authors::find()->asArray()->all();
$authorsSelect2 = array();
foreach ($authors as $value) {
    $authorsSelect2[$value['id']] = $value['firstname'].' '.$value['lastname'];
}

if (!$model->isNewRecord) {
    $formId = 'booksUpdate';
    $action = '/books/update?id=' . $model->id;

} else {
    $formId = 'booksCreate';
    $action = '/books/create';
}
?>
<div class="books-form">
    <?= Html::a('Back to book list', ['/books/index'], ['class' => 'btn btn-primary mb15']) ?>
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
                    <?php $form = ActiveForm::begin([
                        'action' => [$action],
                        'id' => $formId,
                    ]); ?>
                    <div class="tab-content pn br-n admin-form">
                        <div class="section row">
                            <div class="col-md-6">
                                <?= $form->field($model, 'title',
                                    ['template' => '<div class="col-md-12" style="padding: 0"><label for="repairer-title" class="field prepend-icon">
                                    {input}<label for="books-title" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                    ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Title')])->label(false) ?>
                            </div>
                            <div class="col-md-6">
                                <?= $form->field($model, 'short_description',
                                    ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-short_description" class="field prepend-icon">
                                    {input}<label for="books-short_description" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                    ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Short Description')])->label(false) ?>
                            </div>
                        </div>
                        <div class="section row">
                            <div class="col-md-12"><?= $form->field($model, 'description',
                                    ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-description" class="field prepend-icon">
                                    {input}<label for="books-description" class="field-icon"><i class="fa fa-comments-o" aria-hidden="true"></i></label></label>{error}</div>'])
                                    ->textarea(['rows' => 6, 'placeholder' => Yii::t('app', 'Description')])->label(false) ?></div>
                        </div>
                        <div class="section row">
                            <div class="col-md-4">
                                <?= $form->field($model, 'url',
                                    ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-url" class="field prepend-icon">
                                    {input}<label for="books-url" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                    ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Url')])->label(false) ?>
                            </div>
                            <div class="col-md-4">
                                <?php $model->status = 1; ?>
                                <?= $form->field($model, 'status')->widget(Select2::className(), [
                                    'data' => ["Pasive", "Active"],
                                    'language' => Yii::$app->language,
                                    'options' => ['placeholder' => 'Select Status ...'],
                                    'pluginOptions' => [
                                        'allowClear' => true,
                                        'multiple' => false
                                    ],
                                ])->label(false) ?>
                            </div>
                            <div class="col-md-4">
                                <?= $form->field($authorsBooks, 'author_id')->widget(Select2::className(), [
                                    'data' => $authorsSelect2,
                                    'language' => Yii::$app->language,
                                    'options' => ['placeholder' => 'Select Authors ...'],
                                    'pluginOptions' => [
                                        'allowClear' => true,
                                        'multiple' => true
                                    ],
                                ])->label(false) ?>
                            </div>
                        </div>
                        <div class="section row">
                            <div class="col-md-4">
                                <?= $form->field($model, 'price',
                                    ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-url" class="field prepend-icon">
                                    {input}<label for="books-url" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                    ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Price')])->label(false) ?>
                            </div>
                            <div class="col-md-4">
                                <?= $form->field($model, 'pagecount',
                                    ['template' => '<div class="col-md-12" style="padding: 0"><label for="books-url" class="field prepend-icon">
                                    {input}<label for="books-url" class="field-icon"><i class="fa fa-tags" aria-hidden="true"></i></label></label>{error}</div>'])
                                    ->textInput(['maxlength' => true, 'placeholder' => Yii::t('app', 'Pages Count')])->label(false) ?>
                            </div>
                             <div class="col-md-4">
                                <?=
                                $form->field($model, 'created', ['template' => '<div class="col-md-10">{label}{input}{error}</div>'])->widget(DatePicker::classname(), [
                                    'model' => $model,
                                    'attribute' => 'created',
                                ])->label(false)
                                ?>
                            </div>
                        </div>

                        <div class="form-group col-md-12">
                            <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'),
                                [
                                    'class' => $model->isNewRecord ? 'btn btn-sm btn-primary pull-right ' : 'btn btn-sm btn-success pull-right',
                                    'id' => $formId,
                                    'type' => 'button'
                                ]) ?>
                            <?php if (!$model->isNewRecord) {
                                echo Html::a(Yii::t('app', 'Reset'), Url::to('/' . Yii::$app->language . '/blog/index', true), ['class' => 'btn btn-default btn-sm ph25 reste-button pull-right']);
                            } ?>
                        </div>
                    </div>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php echo $this->registerJs("
            CKEDITOR.replace('books-description', {
                height: 210,
                on: {
                    instanceReady: function(evt) {
                        $('.cke').addClass('admin-skin cke-hide-bottom');
                    }
                },
            });
"); ?>
