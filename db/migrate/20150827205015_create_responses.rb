class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :poll_id, null: false
      t.integer :question_id, null: false
      t.decimal :percentage, null: false
      t.string :answer, null: false
      t.integer :sample_size

      t.timestamps null: false
    end
  end
end
