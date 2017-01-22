<?php

$params = array_merge(
        require(__DIR__ . '/../../common/config/params.php'), require(__DIR__ . '/../../common/config/params-local.php'), require(__DIR__ . '/params.php'), require(__DIR__ . '/params-local.php')
);

$db = array_merge(require(__DIR__ . '/../../common/config/db-local.php'));
return [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'name' => 'Books',
    'controllerNamespace' => 'frontend\controllers',
    'modules' => [
        'gridview' => [
            'class' => '\kartik\grid\Module',
            // enter optional module parameters below - only if you need to
            // use your own export download action or custom translation
            // message source
            'downloadAction' => 'gridview/export/download',
            'i18n' => [
                'class' => 'yii\i18n\PhpMessageSource',
                'basePath' => '@kvgrid/messages',
                'forceTranslation' => true
            ],
        ]
    ],
    'components' => [
        'db' => $db,
        'request' => [
            'csrfParam' => '_csrf-frontend',
            'cookieValidationKey' => '!SomeRandomString@',
            'enableCookieValidation' => true,
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-frontend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'advanced-frontend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'language' => 'en',
        'sourceLanguage' => 'en',
        'i18n' => [
            'translations' => [
                'app*' => [
                    'class' => 'yii\i18n\DbMessageSource',
                ],
            ],
        ],
        'urlManager' => [
            'class' => 'codemix\localeurls\UrlManager',
            'languages' => ['en', 'ru'],
            'enableDefaultLanguageUrlCode' => true,
            'enableLanguagePersistence' => false,
        ],
    ],
    'params' => $params,
];
