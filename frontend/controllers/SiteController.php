<?php

namespace frontend\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\helpers\Url;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use backend\models\Authors;
use backend\models\Books;
use backend\models\AuthorsBooks;
use backend\models\AuthorSearch;
use backend\models\BooksSearch;

/**
 * Site controller
 */
class SiteController extends Controller {

    /**
     
    /**
     * Displays homepage.
     *
     * @return mixed
     */
    public function actionIndex() {
        $authors = Authors::find()->asArray()->all();
        return $this->render('index',['authors'=>$authors]);
    }

    public function actionBook($id) {

        return $this->render('index');
    }

    public function actionAuthor($id) {
        
        return $this->render('author');
    }

}
