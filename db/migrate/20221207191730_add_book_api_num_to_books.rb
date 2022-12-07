class AddBookApiNumToBooks < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :book_api_num, :string
  end
end
