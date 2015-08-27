class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :state, null: false
      t.integer :topic_id, null: false
      t.string :content, null: false

      t.timestamps null: false
    end
  end
end
