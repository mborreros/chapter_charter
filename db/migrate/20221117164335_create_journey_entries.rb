class CreateJourneyEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :journey_entries do |t|
      t.integer :journey_id
      t.date :date
      t.integer :progress

      t.timestamps
    end
  end
end
