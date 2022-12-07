class AddGenresToBooks < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :genre, :string, array: true
  end
end
