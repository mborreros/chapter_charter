class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :length
      t.string :genre
      t.string :cover_img

      t.timestamps
    end
  end
end
