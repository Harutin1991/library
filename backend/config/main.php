<?php

$params = array_merge(
        require(__DIR__ . '/../../common/config/params.php'), require(__DIR__ . '/../../common/config/params-local.php'), require(__DIR__ . '/../../common/config/i18n.php'), require(__DIR__ . '/params.php'), require(__DIR__ . '/params-local.php')
);
$db = array_merge(require(__DIR__ . '/../../common/config/db-local.php'));
return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'bootstrap' => ['log'],
    'modules' => [],
    'components' => [
        'db' => $db,
        'language' => 'en',
        'sourceLanguage' => 'en',
        'i18n' => [
            'translations' => [
                'app*' => [
                    'class' => 'yii\i18n\DbMessageSource',
                //'sourceLanguage' => 'en',
                ],
            ],
        ],
        'request' => [
            'csrfParam' => '_csrf-backend',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'advanced-backend',
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
        'urlManager' => [
            'class' => 'codemix\localeurls\UrlManager',
            'languages' => ['en', 'de', 'se'],
            'enableDefaultLanguageUrlCode' => true,
            'enableLanguagePersistence' => false,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
    ],
    'params' => $params,
];
