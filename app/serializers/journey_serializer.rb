class JourneySerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :current_progress, :manually_completed, :completed

  # belongs_to :user
  belongs_to :book
  
  # sorting journey entries
  has_many :journey_entries do
    object.journey_entries.order(created_at: :desc)
  end

  def current_progress
    if self.object.manually_completed
      100
    elsif self.object.journey_entries.length() > 0
      self.object.journey_entries.pluck(:progress).max()
    else
      0
    end
  end

end
