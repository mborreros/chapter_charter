class CreateJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :journeys do |t|
      t.integer :book_id
      t.integer :user_id
      t.date :start_date
      t.date :end_date
      t.boolean :manually_completed

      t.timestamps
    end
  end
end
