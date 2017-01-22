<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>

<?php //echo '<pre>'; var_dump($product->name); die;?>
<html>
<head>
    <title>NewsLetters</title>>
</head>
<body>
<header>
    <div>
        <p>title</p>
    </div>
</header>
<section>

        <div class="image">
            <img src="" alt="name" >
        </div>
        <div class="product_attr">
            <div class="pr_name">
                <h2><?php echo $product->name; ?></h2>
            </div>
            <div class="pr_rating">
                <?php $count = 5; for ($i = 0; $i < $count; $i++) {?>
                    <div class="w_stars">
                        <div class="w_star_hover" data-rating="1"></div>
                        <div class="w_star_hover" data-rating="2"></div>
                    </div>
                <?php } ?>
            </div>
            <div class="pr_desc">
                <h3><?= $product->description ?></h3>
            </div>

            <div class="packages">
                <div class="package">
                    <div>
                        <div class="attributes">
                            <div class="art_num">
                                <p><?= $product->art_no?></p>
                            </div>
                            <div class="weight">
                                <?= $product->weight?>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="price"> <?= $product->weight?></div>
                        <div class="price"> <?= $product->weight?></div>
                    </div>
                </div>
            </div>
        </div>
</section>
<footer>

</footer>
</body>
</html>
<style>
    .body{
        background-color: #c2c2c1;
    }
    .image{
        z-index: 999;
        overflow: hidden;
        margin-left: 0px;
        margin-top: 0px;
        background-position: 0px 0px;
        width: 307px; height: 290px;
        float: left;
        cursor: crosshair;
        background-repeat: no-repeat;
        position: absolute;
        background-image: url("http://admin.odenssnus.co.uk/uploads/images/olde_ving_portion.png");
        top: 0px;
        left: 0px;
        display: none;
    }
</style>