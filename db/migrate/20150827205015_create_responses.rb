class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :poll_id, null: false
      t.integer :question_id, null: false
      t.decimal :percentage, precision: 5, scale: 2, null: false
      t.string :answer, null: false
      t.integer :sample_size

      t.timestamps null: false
    end

    add_index :responses, :poll_id
    add_index :responses, :question_id

  end
end
