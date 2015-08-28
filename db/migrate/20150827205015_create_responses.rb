class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :chart_id, null: false
      t.string :answer, null: false
      t.decimal :percentage, precision: 5, scale: 2, null: false
      t.date :date

      t.timestamps null: false
    end

    add_index :responses, :chart_id

  end
end
