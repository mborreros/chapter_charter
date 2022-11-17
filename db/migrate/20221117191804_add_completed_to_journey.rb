class AddCompletedToJourney < ActiveRecord::Migration[7.0]
  def change
    add_column :journeys, :completed, :boolean
  end
end
