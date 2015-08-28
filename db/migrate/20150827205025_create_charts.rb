class CreateCharts < ActiveRecord::Migration
  def change
    create_table :charts do |t|
      t.integer :topic_id, null: false
      t.string :name, null: false
      t.string :state, null: false
      t.string :slug, null: false

      t.timestamps null: false
    end

    add_index :charts, :topic_id

  end
end
