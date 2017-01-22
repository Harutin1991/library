<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "authors".
 *
 * @property string $id
 * @property string $firstname
 * @property string $lastname
 * @property string $email
 * @property string $country
 * @property string $address
 * @property string $city
 * @property string $phone
 * @property string $birthday
 * @property integer $status
 * @property string $created_at
 * @property string $updated_at
 */
class Authors extends \yii\db\ActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'authors';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['firstname', 'lastname', 'email', 'country', 'address', 'city', 'phone', 'birthday', 'status'], 'required'],
            [['birthday', 'created_at', 'updated_at'], 'safe'],
            [['status'], 'integer'],
            [['email'], 'unique'],
            ['email', 'email'],
            [['firstname', 'lastname', 'email', 'country', 'address', 'city', 'phone'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels() {
        return [
            'id' => Yii::t('app', 'ID'),
            'firstname' => Yii::t('app', 'Firstname'),
            'lastname' => Yii::t('app', 'Lastname'),
            'email' => Yii::t('app', 'Email'),
            'country' => Yii::t('app', 'Country'),
            'address' => Yii::t('app', 'Address'),
            'city' => Yii::t('app', 'City'),
            'phone' => Yii::t('app', 'Phone'),
            'birthday' => Yii::t('app', 'Birthday'),
            'status' => Yii::t('app', 'Status'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

}
