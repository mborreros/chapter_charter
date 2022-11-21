class RemoveCompletedColumnFromChallenges < ActiveRecord::Migration[7.0]
  def change
    remove_column :challenges, :completed, :boolean
  end
end
