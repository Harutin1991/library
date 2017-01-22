<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "books".
 *
 * @property string $id
 * @property string $title
 * @property string $description
 * @property string $short_description
 * @property integer $price
 * @property integer $pagecount
 * @property integer $rate
 * @property string $url
 * @property string $created
 * @property integer $status
 * @property string $created_at
 * @property string $updated_at
 */
class Books extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'books';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'description', 'short_description', 'price', 'pagecount','url', 'created'], 'required'],
            [['description'], 'string'],
            [['price', 'pagecount', 'rate', 'status'], 'integer'],
            [['created', 'created_at', 'updated_at'], 'safe'],
            [['title', 'short_description', 'url'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'title' => Yii::t('app', 'Title'),
            'description' => Yii::t('app', 'Description'),
            'short_description' => Yii::t('app', 'Short Description'),
            'price' => Yii::t('app', 'Price'),
            'pagecount' => Yii::t('app', 'Pagecount'),
            'rate' => Yii::t('app', 'Rate'),
            'url' => Yii::t('app', 'Url'),
            'created' => Yii::t('app', 'Created'),
            'status' => Yii::t('app', 'Status'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }
}