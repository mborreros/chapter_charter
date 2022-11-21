class JourneyEntry < ApplicationRecord

  after_create :update_journey_completion

  belongs_to :journey
  has_one :user, through: :journey
  has_one :book, through: :journey

  validates :journey_id, presence: true
  validates :date, presence: true
  validates :progress, presence: true

  validate :always_making_forward_progress

  private
  
  # validates that any creation or update to a jounrney entry must me forwards progress, user cannot submit progress less than what has already been logged
  def always_making_forward_progress
    # queries an array of progress associated with user submitted journey, gets the max of those values, compares it to the progress that the user submitted
    journey_entries = JourneyEntry.where(journey_id: journey_id)
    max_progress = journey_entries.length() > 0 ? journey_entries.pluck(:progress).max() : 0
    unless max_progress < progress
      errors.add(:journey_entry, "can only create new entries for positive progress, check that your progress is accurate.")
    end
  end

  def update_journey_completion
    # if statement updates the Jouney once the Journey Entry is created to completed:true and fills in the end date based on the appropriate Journey Entry if that entry is progress is 100 
    if self.progress == 100
      journey = Journey.find(self.journey_id)
      journey.update!(end_date: self.date, completed: true)
    end
  end

end
