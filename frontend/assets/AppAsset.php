<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $css = [
        'css/bootstrap.min.css',
        'css/shop-homepage.css'
    ];
    public $baseUrl = '@web';
    public $js = [
        "js/jquery.js",
        "js/bootstrap.min.js",

    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
