class AddCompletedToJourney < ActiveRecord::Migration[7.0]
  def change
    remove_column :journeys, :manually_completed

    add_column :journeys, :completed, :boolean
    add_column :journeys, :manually_completed, :boolean
  end
end
