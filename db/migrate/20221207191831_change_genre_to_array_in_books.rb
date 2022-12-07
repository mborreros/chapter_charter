class ChangeGenreToArrayInBooks < ActiveRecord::Migration[7.0]
  def change
    remove_column :books, :genre
  end
end
