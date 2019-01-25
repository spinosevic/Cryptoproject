class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :user_id
      t.string :coin
      t.integer :amount
      t.integer :price_per_unit
      t.timestamps
    end
  end
end
