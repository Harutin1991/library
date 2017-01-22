<?php
/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use common\widgets\Printbooks;
?>
<div class="row">
    <div class="col-md-9">
        <div class="row carousel-holder">
            <div class="col-md-12">
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="item active">
                            <img class="slide-image" src="http://placehold.it/800x300" alt="">
                        </div>
                        <div class="item">
                            <img class="slide-image" src="http://placehold.it/800x300" alt="">
                        </div>
                        <div class="item">
                            <img class="slide-image" src="http://placehold.it/800x300" alt="">
                        </div>
                    </div>
                    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>
            </div>

        </div>

        <div class="row">
            <?php
            $object = backend\models\Authors::findOne(Yii::$app->request->get('id'));
            if(!empty($object)){
                echo Printbooks::widget(['param'=>$object]);
            }else{
                echo "Not Found";
            }
            
            ?>
        </div>

    </div>

</div>