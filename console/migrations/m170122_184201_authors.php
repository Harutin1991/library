<?php

use yii\db\Migration;

class m170122_184201_authors extends Migration {

    public function up() {
        $this->createTable('authors', [
            'id' => $this->primaryKey(),
            'firstname' => $this->string(250)->notNull(),
            'lastname' => $this->string(250)->notNull(),
            'email' => $this->string(250)->notNull(),
            'phone' => $this->string(250)->notNull(),
            'country' => $this->string(250)->notNull(),
            'city' => $this->string(250)->notNull(),
            'address' => $this->string(250)->notNull(),
            'status' => $this->integer(1),
            'birthday' => $this->dateTime()->notNull(),
            'created_at' => $this->dateTime()->notNull(),
            'updated_at' => $this->dateTime(),
        ]);
    }

    public function down() {
        echo "m170122_184201_authors cannot be reverted.\n";

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
