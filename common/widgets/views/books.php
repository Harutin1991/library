<?php foreach($books as $book):?>
<div class="col-sm-4 col-lg-4 col-md-4">
    <div class="thumbnail">
        <img src="http://placehold.it/320x150" alt="">
        <div class="caption">
            <h4 class="pull-right">$<?=$book['price']?></h4>
            <h4><a href="#"><?=$book['title']?></a>
            </h4>
            <p><?=$book['short_description']?></p>
        </div>
        <div class="ratings">
            <p>
                <?php for($i=0;$i<$book['rate'];$i++):?>
                <span class="glyphicon glyphicon-star"></span>
                <?php endfor;?>
            </p>
        </div>
    </div>
</div>
<?php endforeach;?>