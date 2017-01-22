<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'apns' => [
            'class' => 'bryglen\apnsgcm\Apns',
            'environment' => \bryglen\apnsgcm\Apns::ENVIRONMENT_PRODUCTION,
            'pemFile' => dirname(__FILE__) . '/apnscert/pushcert.pem',
            'dryRun' => false,
//             'retryTimes' => 1,
            'options' => [
                'sendRetryTimes' => 1
            ],
        ],
        
        // using both gcm and apns, make sure you have 'gcm' and 'apns' in your component
        'apnsGcm' => [
            'class' => 'bryglen\apnsgcm\ApnsGcm',
            // custom name for the component, by default we will use 'gcm' and 'apns'
            //'gcm' => 'gcm',
            //'apns' => 'apns',
        ],
        'assetManager' => [
            'bundles' => [
                'dosamigos\google\maps\MapAsset' => [
                    'options' => [
                        'key' => 'AIzaSyD-IGABenWJLtgYCsUVM6UKoeaLjlpox-M',
                        'language' => 'en',
                        'version' => '3.1.18',
                        'libraries' => 'geometry'
                    ]
                ]
            ]
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
    ],
];
