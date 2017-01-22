<?php
/* @var $this \yii\web\View */
/* @var $content string */

use backend\assets\AppAsset;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use common\widgets\Alert;
use yii\widgets\ActiveForm;
use kartik\select2\Select2;

AppAsset::register($this);
$currentUrl = trim(substr($_SERVER['REQUEST_URI'], 3));
$com = strcmp($currentUrl, "/site/index");

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta name="keywords" content="HTML5 Bootstrap 3 Admin Template UI Theme"/>
        <meta name="description" content="AdminDesigns - A Responsive HTML5 Admin UI Framework">
        <meta name="author" content="AdminDesigns">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?= Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?></title>
        <?php $this->head() ?>

        <link rel="shortcut icon" href="/img/favicon.ico">
        <style>

            /* demo page styles */
            body {
                min-height: 2300px;
            }

            .content-header b,
            .admin-form .panel.heading-border:before,
            .admin-form .panel .heading-border:before {
                transition: all 0.7s ease;
            }

            /* responsive demo styles */
            @media (max-width: 800px) {
                .admin-form .panel-body {
                    padding: 18px 12px;
                }

                .option-group .option {
                    display: block;
                }

                .option-group .option + .option {
                    margin-top: 8px;
                }
            }

        </style>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    </head>
    <body class="dashboard-page sb-l-o sb-r-c">
        <?php $this->beginBody() ?>


        <!-- End: Theme Settings Pane -->

        <!-- Start: Main -->
        <section id="main">

            <!-----------------------------------------------------------------+
               ".navbar" Helper Classes:
            -------------------------------------------------------------------+
               * Positioning Classes:
                '.navbar-static-top' - Static top positioned navbar
                '.navbar-static-top' - Fixed top positioned navbar
        
               * Available Skin Classes:
                 .bg-dark    .bg-primary   .bg-success
                 .bg-info    .bg-warning   .bg-danger
                 .bg-alert   .bg-system
            -------------------------------------------------------------------+
              Example: <header class="navbar navbar-fixed-top bg-primary">
              Results: Fixed top navbar with blue background
            ------------------------------------------------------------------->

            <!-- Start: Header -->
            <header class="navbar navbar-fixed-top">
                <div class="navbar-branding">
                    <a class="navbar-brand" href="javascript:void(0)">
                        <?= Html::img("@web/images/logo.png?"); ?>
                    </a>
                    <span id="toggle_sidemenu_l" class="ad ad-lines"></span>
                </div>
                <!--ul class="nav navbar-nav navbar-left">
                    <li>
                        <a class="sidebar-menu-toggle" href="javascript:void(0);">
                            <span class="ad ad-ruby fs18"></span>
                        </a>
                    </li>
                    <li>
                        <a class="topbar-menu-toggle" href="javascript:void(0);">
                            <span class="ad ad-wand fs16"></span>
                        </a>
                    </li>
                    <li class="hidden-xs">
                        <a class="request-fullscreen toggle-active" href="javascript:void(0);">
                            <span class="ad ad-screen-full fs18"></span>
                        </a>
                    </li>
                </ul>
                <form class="navbar-form navbar-left navbar-search" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search..." value="Search...">
                    </div>
                </form -->
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <!--                <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);">-->
                        <!--                    <span class="ad ad-radio-tower fs18"></span>-->
                        <!--                </a>-->

                    </li>
                    
                    <li class="menu-divider hidden-xs">
                        <i class="fa fa-circle"></i>
                    </li>
                    <!--li>
                        <a href="javascript:;" onclick="sendMessage()">
                            <span class="glyphicons glyphicons-message_out"></span>
                        </a>
                    </li -->
                    <li class="dropdown">
                        <a href="javascript:void(0);" class="dropdown-toggle fw600 p15" data-toggle="dropdown">
                            <?= Html::img("@web/img/avatars/1.jpg", ["alt" => "avatar", "class" => "mw30 br64 mr15"]) ?>
                            <?php echo Yii::$app->user->identity->username ?>
                            <span class="caret caret-tp hidden-xs"></span>
                        </a>
                        <ul class="dropdown-menu list-group dropdown-persist w250" role="menu">
                            <li class="list-group-item">
                                <a href="#" class="animated animated-short fadeInUp">
                                    <span class="fa fa-gear"></span> Account Settings </a>
                            </li>
                            <li class="dropdown-footer">
                                <?php
                                echo Html::beginForm(['/site/logout'], 'post')
                                . Html::submitButton(
                                        '<span class="fa fa-power-off pr5"></span>Logout (' . Yii::$app->user->identity->username . ')', ['class' => 'btn btn-link']
                                )
                                . Html::endForm()
                                ?>

                            </li>
                        </ul>
                    </li>
                </ul>

            </header>
            <aside id="sidebar_left" class="nano nano-primary affix">

                <!-- Start: Sidebar Left Content -->
                <div class="sidebar-left-content nano-content">

                    <!-- Start: Sidebar Header -->
                    <header class="sidebar-header">

                        <!-- Sidebar Widget - Menu (Slidedown) -->
                        <div class="sidebar-widget menu-widget">
                            <div class="row text-center mbn">
                                <div class="col-xs-4">
                                    <a href="/site/index" class="text-primary" data-toggle="tooltip" data-placement="top"
                                       title="Dashboard">
                                        <span class="glyphicon glyphicon-home"></span>
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="pages_messages.html" class="text-info" data-toggle="tooltip" data-placement="top"
                                       title="Messages">
                                        <span class="glyphicon glyphicon-inbox"></span>
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="pages_profile.html" class="text-alert" data-toggle="tooltip" data-placement="top"
                                       title="Tasks">
                                        <span class="glyphicon glyphicon-bell"></span>
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="pages_timeline.html" class="text-system" data-toggle="tooltip" data-placement="top"
                                       title="Activity">
                                        <span class="fa fa-desktop"></span>
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="pages_profile.html" class="text-danger" data-toggle="tooltip" data-placement="top"
                                       title="Settings">
                                        <span class="fa fa-gears"></span>
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="pages_gallery.html" class="text-warning" data-toggle="tooltip" data-placement="top"
                                       title="Cron Jobs">
                                        <span class="fa fa-flask"></span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Widget - Author (hidden)  -->
                        <div class="sidebar-widget author-widget hidden">
                            <div class="media">
                                <a class="media-left" href="#">
                                    <?= Html::img("@web/img/avatars/3.jpg", ["class" => "img-responsive"]) ?>
                                </a>
                                <div class="media-body">
                                    <div class="media-links">
                                        <a href="#" class="sidebar-menu-toggle">User Menu -</a> <a href="pages_login(alt).html">Logout</a>
                                    </div>
                                    <div class="media-author">Michael Richards</div>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Widget - Search (hidden) -->
                        <div class="sidebar-widget search-widget hidden">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </span>
                                <input type="text" id="sidebar-search" class="form-control" placeholder="Search...">
                            </div>
                        </div>

                    </header>
                    <!-- End: Sidebar Header -->

                    <!-- Start: Sidebar Left Menu -->
                    <ul class="nav sidebar-menu">
                        <li class="sidebar-label pt20">Menu</li>
                        <li class="menu-link <?php if (!strcmp($currentUrl, '/site/index')): ?> active <?php endif ?>">
                            <?= Html::a('<span class="ti-dashboard"></span>
                        <span class="sidebar-title">Dashboard</span>', Url::to(['site/index'])) ?>
                        </li>
                        <li class="menu-link <?php if ($currentUrl == "/authors/index"): ?>active<?php endif ?>">
                            <?= Html::a('<span class="ti-user"></span>
                        <span class="sidebar-title">Authors</span>', Url::to(['authors/index'])) ?>
                        </li>
                        <li class="menu-link <?php if ($currentUrl == "/books/index"): ?>active<?php endif ?>">
                            <?= Html::a('<span class="ti-comments"></span>
                        <span class="sidebar-title">Books</span>', Url::to(['books/index'])) ?>
                        </li>
                    </ul>

                </div>
            </aside>
            <section id="content_wrapper">

                <!-- Start: Topbar-Dropdown -->
                <div id="topbar-dropmenu">
                    <div class="topbar-menu row">
                        <div class="col-xs-4 col-sm-2">
                            <a href="#" class="metro-tile">
                                <span class="glyphicon glyphicon-inbox"></span>
                                <span class="metro-title">Messages</span>
                            </a>
                        </div>
                        <div class="col-xs-4 col-sm-2">
                            <a href="#" class="metro-tile">
                                <span class="glyphicon glyphicon-user"></span>
                                <span class="metro-title">Users</span>
                            </a>
                        </div>
                        <div class="col-xs-4 col-sm-2">
                            <a href="#" class="metro-tile">
                                <span class="glyphicon glyphicon-headphones"></span>
                                <span class="metro-title">Support</span>
                            </a>
                        </div>
                        <div class="col-xs-4 col-sm-2">
                            <a href="#" class="metro-tile">
                                <span class="fa fa-gears"></span>
                                <span class="metro-title">Settings</span>
                            </a>
                        </div>
                        <div class="col-xs-4 col-sm-2">
                            <a href="#" class="metro-tile">
                                <span class="glyphicon glyphicon-facetime-video"></span>
                                <span class="metro-title">Videos</span>
                            </a>
                        </div>
                        <div class="col-xs-4 col-sm-2">
                            <a href="#" class="metro-tile">
                                <span class="glyphicon glyphicon-picture"></span>
                                <span class="metro-title">Pictures</span>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- End: Topbar-Dropdown -->

                <!-- Start: Topbar -->
                <header id="topbar">
                    <div class="topbar-left">
                        <?=
                        Breadcrumbs::widget([
                            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
                        ])
                        ?>
                    </div>
                    <!--            <div class="topbar-right">-->
                    <!--                <div class="ib topbar-dropdown">-->
                    <!--                    <label for="topbar-multiple" class="control-label pr10 fs11 text-muted">Reporting Period</label>-->
                    <!--                    <select id="topbar-multiple" class="hidden">-->
                    <!--                        <optgroup label="Filter By:">-->
                    <!--                            <option value="1-1">Last 30 Days</option>-->
                    <!--                            <option value="1-2" selected="selected">Last 60 Days</option>-->
                    <!--                            <option value="1-3">Last Year</option>-->
                    <!--                        </optgroup>-->
                    <!--                    </select>-->
                    <!--                </div>-->
                    <!--                <div class="ml15 ib va-m" id="toggle_sidemenu_r">-->
                    <!--                    <a href="javascript:void(0);" class="pl5">-->
                    <!--                        <i class="fa fa-sign-in fs22 text-primary"></i>-->
                    <!--                        <span class="badge badge-danger badge-hero">3</span>-->
                    <!--                    </a>-->
                    <!--                </div>-->
                    <!--            </div>-->
                </header>
                <!-- End: Topbar -->

                <!-- Begin: Content -->
                <section id="content" class="animated fadeIn">
                    <?= Alert::widget() ?>
                    <div id="admin-alerts" class="alert-success alert" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <div></div>
                    </div>
                    <?= $content ?>
                </section>

            </section>

        </section>
        <footer id="content-footer">
            <div class="row">
                <div class="col-md-6">
                    <span class="footer-legal">© 2016 Oden's Snus</span>
                </div>
                <div class="col-md-6 text-right">
                    <a href="#content" class="footer-return-top">
                        <span class="fa fa-arrow-up"></span>
                    </a>
                </div>
            </div>
        </footer>
        <!--<footer class="footer">-->
        <!--    <div class="container">-->
        <!--        <p class="pull-left">&copy; My Company --><? //= date('Y') ?><!--</p>-->
        <!---->
        <!--        <p class="pull-right">--><? //= Yii::powered() ?><!--</p>-->
        <!--    </div>-->
        <!--</footer>-->

        <?php $this->endBody() ?>
        <script type="text/javascript">
            jQuery(document).ready(function () {

                "use strict";

                // Init Theme Core
                Core.init();

                // Init Demo JS
                Demo.init();

                // Init Widget Demo JS
                // demoHighCharts.init();

                // Because we are using Admin Panels we use the OnFinish
                // callback to activate the demoWidgets. It's smoother if
                // we let the panels be moved and organized before
                // filling them with content from various plugins

                // Init plugins used on this page
                // HighCharts, JvectorMap, Admin Panels

                // Init Admin Panels on widgets inside the ".admin-panels" container
                $('.admin-panels').adminpanel({
                    grid: '.admin-grid',
                    draggable: true,
                    preserveGrid: true,
                    mobile: false,
                    onStart: function () {
                        // Do something before AdminPanels runs
                    },
                    onFinish: function () {
                        $('.admin-panels').addClass('animated fadeIn').removeClass('fade-onload');

                        // Init the rest of the plugins now that the panels
                        // have had a chance to be moved and organized.
                        // It's less taxing to organize empty panels
                        demoHighCharts.init();
                        runVectorMaps(); // function below
                    },
                    onSave: function () {
                        $(window).trigger('resize');
                    }
                });




            });

            function sendMessage() {
                $.magnificPopup.open({
                    removalDelay: 500, //delay removal by X to allow out-animation,
                    items: {
                        src: '#message-form'
                    },
                    // overflowY: 'hidden', //
                    callbacks: {
                        beforeOpen: function (e) {
                            var Animation = 'mfp-slideDown';
                            this.st.mainClass = Animation;
                        }
                    },
                    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                });
            }
        </script>
    </body>
</html>
<?php $this->endPage() ?>
