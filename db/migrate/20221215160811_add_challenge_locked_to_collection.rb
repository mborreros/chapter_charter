class AddChallengeLockedToCollection < ActiveRecord::Migration[7.0]
  def change
    add_column :collections, :challenge_locked, :boolean, :default => false
  end
end
