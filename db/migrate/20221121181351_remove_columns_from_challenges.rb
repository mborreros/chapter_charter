class RemoveColumnsFromChallenges < ActiveRecord::Migration[7.0]
  def change
    remove_column :challenges, :tracker, :string
  end
end
