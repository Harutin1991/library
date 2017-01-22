<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "authors_books".
 *
 * @property integer $id
 * @property string $book_id
 * @property string $author_id
 *
 * @property Authors $authors
 * @property Books $book
 */
class AuthorsBooks extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'authors_books';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['book_id', 'author_id'], 'required'],
            [['book_id', 'author_id'], 'integer'],
            [['book_id'], 'exist', 'skipOnError' => true, 'targetClass' => Books::className(), 'targetAttribute' => ['book_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'book_id' => Yii::t('app', 'Book ID'),
            'author_id' => Yii::t('app', 'Author ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAuthors()
    {
        return $this->hasOne(Authors::className(), ['id' => 'author_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getBook()
    {
        return $this->hasOne(Books::className(), ['id' => 'book_id']);
    }
}
