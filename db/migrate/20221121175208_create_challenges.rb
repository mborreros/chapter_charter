class CreateChallenges < ActiveRecord::Migration[7.0]
  def change
    create_table :challenges do |t|
      t.string :name
      t.string :description
      t.date :start_date
      t.date :end_date
      t.integer :user_id
      t.integer :goal_number
      t.string :tracker
      t.string :category

      t.timestamps
    end
  end
end
