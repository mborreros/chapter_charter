class JourneyEntry < ApplicationRecord

  belongs_to :journey
  has_one :user, through: :journey
  has_one :book, through: :journey

  validates :journey_id, presence: true
  validates :date, presence: true
  validates :progress, presence: true

  validate :always_making_forward_progress

  # validates that any creation or update to a jounrney entry must me forwards progress, user cannot submit progress less than what has already been logged
  def always_making_forward_progress
    # queries an array of progress associated with user submitted journey, gets the max of those values, compares it to the progress that the user submitted

    journey_entries = JourneyEntry.where(journey_id: journey_id)
    max_progress = journey_entries.length() > 0 ? journey_entries.pluck(:progress).max() : 0

    unless max_progress < progress
      errors.add(:journey_entry, "can only create new entries for positive progress, check that your progress is accurate.")
    end
  end

end
