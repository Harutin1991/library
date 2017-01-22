<?php

use yii\db\Migration;

class m170122_184210_books extends Migration {

    public function up() {
        $this->createTable('books', [
            'id' => $this->primaryKey(),
            'title' => $this->string(250)->notNull(),
            'short_description' => $this->string(250)->notNull(),
            'description' => $this->text()->notNull(),
            'price' => $this->integer(11)->notNull(),
            'pagecount' => $this->integer(11)->notNull(),
            'rate' => $this->integer(11)->notNull(),
            'url' => $this->string(250)->notNull(),
            'status' => $this->integer(1),
            'created' => $this->dateTime()->notNull(),
            'created_at' => $this->dateTime()->notNull(),
            'updated_at' => $this->dateTime(),
        ]);
    }

    public function down() {
        echo "m170122_184210_books cannot be reverted.\n";

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
