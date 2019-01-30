class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :user_id
      t.string :coin
      t.float :amount
      t.float :price_per_unit
      t.timestamps
    end
  end
end
