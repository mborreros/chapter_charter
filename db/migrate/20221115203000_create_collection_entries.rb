class CreateCollectionEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :collection_entries do |t|
      t.integer :collection_id
      t.integer :book_id

      t.timestamps
    end
  end
end
