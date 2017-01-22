<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property integer $id
 * @property string $username
 * @property string $auth_key
 * @property string $password
 * @property integer $role
 * @property string $password_token
 * @property string $created
 * @property string $updated
 * @property string $api_key
 *
 * @property Customer[] $customers
 * @property DeviceTokens[] $deviceTokens
 * @property Repairer[] $repairers
 * @property UserImages[] $userImages
 */
class User extends \common\models\User
{
    const ADMIN = 0;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['username', 'auth_key', 'password', 'created', 'updated'], 'required'],
            [['role'], 'integer'],
            [['created', 'updated'], 'safe'],
            [['username'], 'string', 'max' => 50],
            [['auth_key'], 'string', 'max' => 32],
            [['password', 'password_token', 'api_key'], 'string', 'max' => 255],
            [['username'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'username' => Yii::t('app', 'Username'),
            'auth_key' => Yii::t('app', 'Auth Key'),
            'password' => Yii::t('app', 'Password'),
            'status' => Yii::t('app', 'Status'),
            'password_token' => Yii::t('app', 'Password Token'),
            'created' => Yii::t('app', 'Created'),
            'updated' => Yii::t('app', 'Updated'),
            'api_key' => Yii::t('app', 'Api Key'),
        ];
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }
}
