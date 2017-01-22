<?php

use yii\db\Migration;

class m170122_184223_authors_books extends Migration {

    public function up() {
        $this->createTable('authors_books', [
            'id' => $this->primaryKey(),            
            'book_id' => $this->integer(11)->notNull(),
            'author_id' => $this->integer(11)->notNull(),
        ]);
    }

    public function down() {
        echo "m170122_184223_authors_books cannot be reverted.\n";

        return false;
    }

    /*
      // Use safeUp/safeDown to run migration code within a transaction
      public function safeUp()
      {
      }

      public function safeDown()
      {
      }
     */
}
