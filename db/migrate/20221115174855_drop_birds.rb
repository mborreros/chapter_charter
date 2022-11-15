class DropBirds < ActiveRecord::Migration[7.0]
  def change
    drop_table :birds
  end
end
