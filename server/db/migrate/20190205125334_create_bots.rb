class CreateBots < ActiveRecord::Migration[5.2]
  def change
    create_table :bots do |t|
      t.integer :user_id
      t.string :coin
      t.float :percentage
      t.float :middle_point
      t.float :ratio
      t.boolean :selling_mode, default: true
      t.float :gained_amount
      t.boolean :active, default: true
      t.timestamps
    end
  end
end
