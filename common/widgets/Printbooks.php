<?php

/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace common\widgets;

use Yii;
use yii\helpers\ArrayHelper;
use backend\models\Authors;
use backend\models\AuthorsBooks;
use backend\models\Books;
use kartik\grid\GridView;
use yii\data\ActiveDataProvider;
use yii\web\NotFoundHttpException;

class Printbooks extends \yii\bootstrap\Widget {

    public $param = [];

    public function init() {
        parent::init();

        $this->initOptions();

        echo $this->renderBodyBegin() . "\n";
    }

    /**
     * Renders the close button if any before rendering the content.
     * @return string the rendering result
     */
    protected function renderBodyBegin() {
        if (empty($this->param)) {
            $books = Books::find()->asArray()->all();
        } else {
            if (is_object($this->param)) {
                
                $bookauthors = AuthorsBooks::find()->where(['author_id' => $this->param->id])->asArray()->all();
            } else {
                $bookauthors = AuthorsBooks::find()->where(['author_id' => $this->param])->asArray()->all();
            }
            $books = [];
            foreach ($bookauthors as $bookauthor) {
                if(!empty(Books::find()->where(['id' => $bookauthor['book_id']])->asArray()->all())){
                    $books[] = Books::find()->where(['id' => $bookauthor['book_id']])->asArray()->one();
                }
                
            }
        }

        return $this->render('books', [
                    'books' => $books,
        ]);
    }

    /**
     * Renders the widget.
     */
    public function run() {

        $this->registerPlugin('printbooks');
    }

    protected function initOptions() {
        
    }

}
