class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :email
      t.string :last_access
      t.string :created
      t.string :api_key
      t.string :api_secret

      t.string :total, array: true, default: [['Day','Total','Break-even-point']]
      t.timestamps
    end
  end
end
