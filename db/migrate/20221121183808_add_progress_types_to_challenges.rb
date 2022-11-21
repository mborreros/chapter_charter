class AddProgressTypesToChallenges < ActiveRecord::Migration[7.0]
  def change
    add_column :challenges, :successful, :boolean
    add_column :challenges, :active, :boolean
  end
end
