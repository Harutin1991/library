<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel backend\models\BlogSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Books');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="table-layout">

    <div class="tray tray-center filter">
        <!-- create new order panel -->
        <div id="category-form_cont">
            <?= Html::a(Yii::t('app', '<span class="fa fa-plus pr5"></span> Create New Book'), ['/books/create'], ['class' => 'btn btn-system mb15']) ?>
        </div>
        <!-- recent orders table -->
        <div class="panel">
            <div class="panel-body pn">
                <div class="table-responsive">
                    <?php Pjax::begin(['id' => 'blogPjaxtbl']) ?>
                    <?= GridView::widget([
                        'dataProvider' => $dataProvider,
//                        'filterModel' => $searchModel,
                        'tableOptions' => [
                            'class' => 'table table-striped table-hover display dataTable no-footer',
                            'id' => 'tbl_blog'
                        ],
                        'filterRowOptions' => [
                            'role' => "row"
                        ],
                        'rowOptions' => [
                            'role' => "row",
                            'class' => 'odd'
                        ],
                        'summary' => false,
                        'options' => ['class' => 'br-r', 'id'=>'blog'],
                        'columns' => [
                            [
                                'attribute' => 'title',
                            ],
                            [
                                'attribute' => 'short_description',
                            ],
                            [
                                'attribute' => 'status',
                                'contentOptions' => function ($model) {
                                    if ($model->status == 0) {
                                        return ['class' => "label list-status label-rounded label-danger"];
                                    } elseif ($model->status == 1) {
                                        return ['class' => "label list-status label-rounded label-system"];
                                    }
                                },
                                'value' => function ($model) {
                                    if ($model->status == 0) {
                                        return "Pasive";
                                    } else {
                                        return "Active";
                                    }
                                },
                            ],
                            ['class' => 'yii\grid\ActionColumn',
                                'template' => '<div style="width: 170px;">{update}{delete} </div>',
                                'buttons' => [
                                    'update' => function ($url, $model) {
                                        return Html::a('<span class="glyphicon glyphicon-edit"></span> Edit',
                                            $url,
                                            [
                                                'title' => 'Edit',
                                                'aria-label' => 'Edit',
                                                'data-key' => $model->id,
                                                'class' => 'btn btn-info btn-xs btn-rounded pdrl10 ml10'
                                            ]);
                                    },
                                    'delete' => function ($url, $model) {
                                        return Html::a('<span class="glyphicon glyphicon-trash"></span> Delete',
                                            $url,
                                            [
                                                'title' => 'Delete',
                                                'aria-label' => 'Delete',
                                                'data-confirm' => 'Are you sure! You whant delete this item?',
                                                'data-method' => 'post',
                                                'data-pjax' => '0',
                                                'data-key' => $model->id,
                                                'class' => 'btn btn-danger btn-xs btn-rounded pdrl10 ml10'
                                            ]);
                                    },
                                ]
                            ],
                        ],
                    ]); ?>
                    <?php Pjax::end() ?>
                </div>
            </div>
        </div>
    </div>
    <!-- begin: .tray-right -->
    <aside class="tray tray-right tray290 filter">
        <!-- menu quick links -->
        <div class="admin-form mw250">

            <h4> Filter Blogs</h4>

            <hr class="short">
            <?php echo $this->render('_search', ['model' => $searchModel]); ?>
        </div>
    </aside>
    <!-- end: .tray-right -->
</div>


