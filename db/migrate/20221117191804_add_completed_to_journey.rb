class AddCompletedToJourney < ActiveRecord::Migration[7.0]
  def change
    add_column :journeys, :manually_completed, :boolean
  end
end
