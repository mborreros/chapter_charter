class CreateChallengeEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :challenge_entries do |t|
      t.integer :challenge_id
      t.integer :book_id

      t.timestamps
    end
  end
end
