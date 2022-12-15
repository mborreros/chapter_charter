class JourneyEntry < ApplicationRecord

  after_create :update_journey_completion
  after_create :check_challenges

  belongs_to :journey
  has_one :user, through: :journey
  has_one :book, through: :journey
  has_many :challenge_entries, dependent: :destroy

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

  def check_challenges
    @all_active_challenges = self.user.challenges.where(active: true)
    if self.progress == 100 && @all_active_challenges.count >0
      @all_active_challenges.each do |active_challenge|
        create_appropriate_challenge_entries(active_challenge.id, active_challenge.goal_type, active_challenge.category, active_challenge.category_identifier)
      end
    end
  end

  def create_appropriate_challenge_entries(challenge_id, goal_type, category = nil, category_identifier = nil)
    if goal_type == "duration" || # duration challenge
      (goal_type == "interest" && category == "author" && self.book.author == category_identifier) || # author challenge
      (goal_type == "interest" && category == "genre" && self.book.genre.include?(category_identifier)) || # genre challenge 
      (category == "collection_id" && CollectionEntry.where(book_id: self.book.id, collection_id: category_identifier.to_i).exists?) # collection challenge 
      begin
        ChallengeEntry.create!(book_id: self.book.id, challenge_id: challenge_id, journey_entry_id: self.id)
      rescue
        puts "One of the challenge entry's was unable to be created because it has already counted towards that challenge's progress, all other applicable challenge entries have been created and the challenge progress has been updated."
      end
    end
  end
  
end

