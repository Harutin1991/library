<?php
/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use frontend\assets\AppAsset;
use kartik\growl\Growl;
use yii\helpers\Url;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>

<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">

    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <?= Html::csrfMetaTags() ?>
        <title>
            <?= Yii::$app->name ?> | <?= Html::encode($this->title) ?>
        </title>
        <meta name="description" content="">
        <meta name="author" content="BrainFors">

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
        <?php $this->head() ?>
    </head>

    <body>
        <?php $this->beginBody() ?>
        <?php
        $mess = Yii::$app->session->getFlash('success');
        if (isset($mess) && $mess) {
            echo Growl::widget([
                'type' => Growl::TYPE_SUCCESS,
                'title' => '',
                'icon' => 'fa fa-check-square-o',
                'body' => $mess,
                'showSeparator' => true,
                'delay' => 0,
                'pluginOptions' => [
                    'showProgressbar' => false,
                    'placement' => [
                        'from' => 'top',
                        'align' => 'right',
                    ]
                ]
            ]);
        }
        ?>
        <?php
        $error = Yii::$app->session->getFlash('error');

        if (isset($error) && $error) {
            echo Growl::widget([
                'type' => Growl::TYPE_DANGER,
                'title' => '',
                'icon' => 'fa fa-exclamation-triangle',
                'body' => $error,
                'showSeparator' => true,
                'delay' => 1000,
                'pluginOptions' => [
                    'showProgressbar' => false,
                    'placement' => [
                        'from' => 'top',
                        'align' => 'right',
                    ]
                ]
            ]);
        }
        ?>
        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Start Bootstrap</a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container -->
        </nav>
        <div id="container" class="container">

            <?php echo $content ?>
        </div>

        <?php $this->endBody() ?>
        <div class="container">

            <hr>

            <!-- Footer -->
            <footer>
                <div class="row">
                    <div class="col-lg-12">
                        <p>Copyright &copy; Your Website 2014</p>
                    </div>
                </div>
            </footer>

        </div>
    </body>
</html>
<?php $this->endPage() ?>