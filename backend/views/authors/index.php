<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel backend\models\CustomerSearch */
/* @var $model backend\models\Customer */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Authors');
$this->params['breadcrumbs'][] = Yii::t('app', $this->title);
?>
<div class="table-layout">
    <div class="tray tray-center">
        
       <div id="category-form_cont">
            <?= Html::a(Yii::t('app', '<span class="fa fa-plus pr5"></span> Create New Author'), ['/authors/create'], ['class' => 'btn btn-system mb15']) ?>
        </div>
        <div class="panel">
            <div class="panel-body pn">
                <div class="table-responsive">
                    <?php Pjax::begin(['id' => 'customerPjaxtbl']) ?>
                    <?=
                    GridView::widget([
                        'dataProvider' => $dataProvider,
                        'tableOptions' => [
                            'class' => 'table admin-form theme-warning tc-checkbox-1 fs13',
                            'id' => 'tbl_customer'
                        ],
                        'filterRowOptions' => [
                            'role' => "row",
                        ],
                        'rowOptions' => [
                            'role' => "row",
                            'class' => 'odd'
                        ],
                        'summary' => false,
                        'columns' => [
                            [
                                'class' => 'yii\grid\CheckboxColumn',
                                'checkboxOptions' => [
                                    'style' => 'display:none',
                                    'label' => '<span class="checkbox mn"></span>',
                                    'class' => 'option block mn chk-usr',
                                    'value' => $model->id
                                ],
                                'header' => '<label for="select-all-users" class="option block mn chk-usrs" data-toggle="tooltip" data-placement="top" title="" data-original-title="Select All Users">
                                              <input id="select-all-users" type="checkbox" name="select-all" class="select-on-check-all">
                                              <span class="checkbox mn"></span>
                                            </label>',
                            ],
                            ['attribute' => 'firstname',
                                "format" => 'html',
                                'value' => function($model) {
                                    return Html::a($model->firstname, \yii\helpers\Url::to(['view', "id" => $model->id]));
                                }
                                    ],
                                    ['attribute' => 'lastname',
                                    ],
                                    ['attribute' => 'email',
                                        'format' => 'email',
                                    ],
                                    ['attribute' => 'phone',
                                    ],
                                    ['attribute' => 'status',
                                        'contentOptions' => function ($model) {
                                            if ($model->status == 0) {
                                                return ['class' => "label list-status label-rounded label-danger"];
                                            } elseif ($model->status == 1) {
                                                return ['class' => "label list-status label-rounded label-system"];
                                            }
                                        },
                                                'value' => function ($model) {
                                            if ($model->status == 0) {
                                                return Yii::t('app', "Pasive");
                                            } else {
                                                return Yii::t('app', "Active");
                                            }
                                        },
                                            ],
                                            ['class' => 'yii\grid\ActionColumn',
                                                'template' => '{update}{delete}',
                                                'buttons' => [
                                                    'update' => function ($url, $model) {
                                                        return Html::a('<span class="glyphicon glyphicon-edit"></span> Edit', $url, [
                                                                    'title' => 'Edit',
                                                                    'aria-label' => 'Edit',
                                                                    'data-key' => $model->id,
                                                                    'class' => 'btn btn-info btn-xs btn-rounded pdrl10 ml10'
                                                        ]);
                                                    },
                                                            'delete' => function ($url, $model) {
                                                        return Html::a('<span class="glyphicon glyphicon-trash"></span> Delete', $url, [
                                                                    'title' => 'Delete',
                                                                    'aria-label' => 'Delete',
                                                                    'data-confirm' => 'Are you sure! You whant delete this item?',
                                                                    'data-method' => 'post',
                                                                    'data-pjax' => '0',
                                                                    'data-key' => $model->id,
                                                                    'class' => 'btn btn-danger btn-xs btn-rounded pdrl10 ml10'
                                                        ]);
                                                    },
                                                        ],
                                                    ],
                                                ],
                                            ]);
                                            ?>
                                            <?php Pjax::end() ?>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end: .tray-center -->

                            <!-- begin: .tray-right -->
                            <aside class="tray tray-right tray290 filter">
                                <!-- menu quick links -->
                                <div class="admin-form mw250">
                                    <h4> Filter Customers</h4>
                                    <hr class="short">
                                    <?php echo $this->render('_search', ['model' => $searchModel]); ?>
        </div>
    </aside>
    <!-- end: .tray-right -->
</div>

