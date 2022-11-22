class AddColumnToChallengeEntries < ActiveRecord::Migration[7.0]
  def change
    add_column :challenge_entries, :journey_entry_id, :integer
  end
end
