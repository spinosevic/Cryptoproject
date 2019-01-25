class CreateNews < ActiveRecord::Migration[5.2]
  def change
    create_table :news do |t|
      t.string :title
      t.string :content
      t.string :description
      t.string :url
      t.string :urlToImage
      t.string :publishedAt

      t.timestamps
    end
  end
end
