<?php

namespace backend\controllers;

use Yii;
use backend\models\Books;
use backend\models\BooksSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use backend\models\User;
use backend\models\AuthorsBooks;

/**
 * BooksController implements the CRUD actions for Books model.
 */
class BooksController extends Controller {

    /**
     * @inheritdoc
     */
    public function behaviors() {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'index' => ['GET', 'POST'],
                    'view' => ['GET'],
//                    'create' => ['POST'],
                    'update' => ['POST', 'GET'],
                    'delete' => ['POST'],
                ],
            ],
            'access' => [
                'class' => AccessControl::className(),
                'ruleConfig' => [
                    'class' => 'common\components\CAccessRule',
                ],
                'only' => ['index', 'view', 'create', 'update', 'delete'],
                'rules' => [
                    // allow authenticated users
                    [
                        'actions' => ['index', 'view', 'create', 'update', 'delete'],
                        'allow' => true,
                        // Allow users, moderators and admins to create
                        'roles' => [
                            User::ADMIN,
                        ],
                    ],
                // everything else is denied
                ],
            ],
        ];
    }

    /**
     * Lists all Books models.
     * @return mixed
     */
    public function actionIndex() {
        $searchModel = new BooksSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
                    'searchModel' => $searchModel,
                    'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Books model.
     * @param string $id
     * @return mixed
     */
    public function actionView($id) {
        return $this->render('view', [
                    'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Books model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate() {
        $model = new Books();
        $authorsBooks = new AuthorsBooks();
        if ($model->load(Yii::$app->request->post())) {
            $model->created = date('Y-m-d', strtotime(Yii::$app->request->post('Books')['created']));
            if ($model->save()) {
                foreach (Yii::$app->request->post('AuthorsBooks')['author_id'] as $author_id) {
                    $AuthorsBooks = new AuthorsBooks();
                    $AuthorsBooks->author_id = $author_id;
                    $AuthorsBooks->book_id = $model->id;
                    $AuthorsBooks->save();
                }
                return $this->redirect(['view', 'id' => $model->id]);
            }
        } else {
            return $this->render('create', [
                        'model' => $model,
                        'authorsBooks' => $authorsBooks,
            ]);
        }
    }

    /**
     * Updates an existing Books model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $id
     * @return mixed
     */
    public function actionUpdate($id) {
        $model = $this->findModel($id);
        $authorsBooks = new AuthorsBooks();
        if ($model->load(Yii::$app->request->post())) {
            $model->created = date('Y-m-d', strtotime(Yii::$app->request->post('Books')['created']));
            if ($model->save()) {
                foreach (Yii::$app->request->post('AuthorsBooks')['author_id'] as $author_id) {
                    $AuthorsBooks = new AuthorsBooks();
                    $AuthorsBooks->author_id = $author_id;
                    $AuthorsBooks->book_id = $model->id;
                    $AuthorsBooks->save();
                }
                return $this->redirect(['view', 'id' => $model->id]);
            }
        } else {
            return $this->render('update', [
                        'model' => $model,
                        'authorsBooks' => $authorsBooks,
            ]);
        }
    }

    /**
     * Deletes an existing Books model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $id
     * @return mixed
     */
    public function actionDelete($id) {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Books model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $id
     * @return Books the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id) {
        if (($model = Books::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }

}
