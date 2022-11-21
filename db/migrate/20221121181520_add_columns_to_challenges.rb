class AddColumnsToChallenges < ActiveRecord::Migration[7.0]
  def change
    add_column :challenges, :goal_type, :string
    add_column :challenges, :category_identifier, :string
  end
end
