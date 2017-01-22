<?php


namespace frontend\controllers;


use common\models\Countries;
use common\models\Favorites;
use common\models\Orders;
use common\models\Product;
use frontend\models\CustomerAddress;
use common\models\User;
use frontend\models\EditPassword;
use Yii;
use frontend\models\Order;
use frontend\models\OrderSearch;
use yii\filters\VerbFilter;
use frontend\models\Customer;
use yii\helpers\ArrayHelper;
use backend\models\Currency;
use frontend\models\Sendmess;
use common\components\CurrencyHelper;
use yii\helpers\Url;
use common\models\OrdersSearch;

class UserController extends \yii\web\Controller

{

    /**
     * @inheritdoc
     */

    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'update-item' => ['POST'],
                    'delete' => ['POST'],
                    'edite-address' => ['POST'],
                ],
            ],

            'access' => [
                'class' => \yii\filters\AccessControl::className(),
                'only' => ['history', 'profile', 'edit-password', 'update-item'],
                'rules' => [
                    // allow authenticated users
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    // everything else is denied
                ],
            ],
        ];

    }


    /**
     * @return string
     */

    public function actionProfile()
    {
        $userModel = Yii::$app->user->identity->customer;
        $userId = $userModel->id;
        $searchModel = new OrdersSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams, $userId);
        $dataProvider->pagination->pageSize=10;
        $this->layout = 'main';

        if(!empty($currency)){
            $currency_details = Currency::find()->where(['id'=>$currency['currenncyID']])->one();
        }else{
            $currency_details = Currency::find()->where(['default'=>1])->one();
        }
        $view_file_path = 'customer/profile';

        $customerAdressObj = CustomerAddress::findOne(['customer_id' => $userModel->id, 'default_address' => 1]);
        $countries = Countries::find()->select(['id', 'name'])->where(['status' => 1])->asArray()->all();
        $countries = ArrayHelper::map($countries, 'name', 'name');

        if ($customerAdressObj) {
            $modelAdd = $customerAdressObj;
            $addresForm = $this->renderPartial('customer/update', array(
                'model' => $modelAdd,
                'countries' => $countries,
            ));
        } else {
            $modelAdd = new CustomerAddress();
            $addresForm = $this->renderPartial('customer/create', array(
                'model' => $modelAdd,
                'countries' => $countries,
            ));

        }

        if (Yii::$app->request->post()) {

            $postArr = Yii::$app->request->post();
            $postArr['CustomerAddress']['customer_id'] = $userModel->id;
            $postArr['CustomerAddress']['default_address'] = 1;
            if ($modelAdd->load($postArr) && $modelAdd->save()) {
                return $this->redirect(['user/profile']);
            } else {
                return $this->render($view_file_path, [
                    'UserModel' => $userModel,
                    'addressForm' => $addresForm,
                    'dataProvider' => $dataProvider,
                ]);

            }

        }

        $user_id = Yii::$app->user->identity->id;
        $favorites = \frontend\models\Product::getFavoritesByUser($user_id);
        
        return $this->render($view_file_path, [
            'UserModel' => $userModel,
            'addressForm' => $addresForm,
            'favorites' => $favorites,
            'currency_details'=>$currency_details,
            'dataProvider' => $dataProvider,
        ]);
    }


    public function actionHistory()
    {
        $this->layout = 'profile';
        $role = Yii::$app->user->identity->role;
        $view_file_path = '';
        if ($role == User::CUSTOMER) {
            $user_id = Yii::$app->user->identity->customer->id;
            $view_file_path = 'customer/history';
        } elseif ($role == User::REPAIRER) {
            $user_id = Yii::$app->user->identity->repairer->id;
            $view_file_path = 'repairer/history';
        }
        $searchModel = new OrderSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams, $user_id, $role);

        return $this->render($view_file_path, [
            'dataProvider' => $dataProvider,
            'searchModel' => $searchModel
        ]);
    }

    /**
     * @return string|\yii\web\Response
     */

    public function actionEditPassword()
    {
        $this->layout = 'profile';
        $model = new EditPassword();
        $model->username = Yii::$app->user->identity->username;
        if ($model->load(Yii::$app->request->post()) && $model->edit()) {
            Yii::$app->session->setFlash('success', 'Your password successfuly updated!');
            return $this->redirect('/user/profile');
        }

        return $this->render('edit-password', [
            'model' => $model,
        ]);
    }

    public function actionProfileImage()
    {
        $this->layout = 'profile';
        return $this->render('profile-image');
    }

    public function actionUpdateItem()
    {
        if (Yii::$app->request->isAjax) {
            $post = Yii::$app->request->post();

            $Customer = Customer::findOne(Yii::$app->user->identity->customer->id);
            if ($Customer->load($post) && $Customer->validate()) {
                $Customer->update();
            } else {
                return json_encode($Customer->errors);
            }
        }
    }
    public function actionSendMessage(){
        $this->layout = 'main';
        $sendMess = new Sendmess();
        $id  = Yii::$app->user->identity->customer->id;

        $query = ("SELECT * FROM message_system WHERE recipient_user_id = '$id' or sender_user_id = '$id' ");
        $sendMessV = Sendmess::findBySql($query)->asArray()->all();

//        echo '<pre>';
//      print_r(Yii::$app->user->identity->customer->name);die;
//        echo '</pre>';
        if (Yii::$app->request->isAjax) {
            $post = Yii::$app->request->post();
            if ($sendMess->load($post) && $sendMess->validate()) {
                if($sendMess->save()){
                    return json_encode(['date'=>date("Y-m-d H:i:s"), 'name'=> Yii::$app->user->identity->customer->name, 'surname'=>Yii::$app->user->identity->customer->surname]);
                }else{
                    return $sendMess->errors;
                }
//                return $this->redirect('/user/send-message');
            }

        }
        if(Yii::$app->controller->id == "user" && Yii::$app->controller->action->id == 'send-message'){
            \Yii::$app->db->createCommand("update message_system set status = 0 where recipient_user_id = '$id'")->execute();


        };
        return $this->render('send-message', compact('sendMess', 'sendMessV'));
    }
}