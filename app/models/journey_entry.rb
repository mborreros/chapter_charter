class JourneyEntry < ApplicationRecord

  after_create :update_journey_completion
  after_create :create_challenge_entries_for_duration_challenges
  after_create :create_challenge_entries_for_author_interest_challenges
  after_create :create_challenge_entries_for_genre_interest_challenges
  after_create :create_challenge_entries_for_collection_interest_challenges

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

  def create_challenge_entries_for_duration_challenges
    if self.progress == 100 && self.user.challenges.where(active: true, goal_type: "duration").count >0
      self.user.challenges.where(active: true, goal_type: "duration").ids.each do |challenge_id|
      ChallengeEntry.create!(book_id: self.book.id, challenge_id: challenge_id, journey_entry_id: self.id)
      end
    end
  end

  def create_challenge_entries_for_author_interest_challenges
    if self.progress == 100 && self.user.challenges.where(active: true, goal_type: "interest", category: "author").count >0
      self.user.challenges.where(active: true, goal_type: "interest", category: "author").pluck(:id, :category_identifier).each do |author_challenge|
        if self.book.author == author_challenge[1] 
          ChallengeEntry.create!(book_id: self.book.id, challenge_id: author_challenge[0], journey_entry_id: self.id)
        end
      end
    end
  end

  def create_challenge_entries_for_genre_interest_challenges
    if self.progress == 100 && self.user.challenges.where(active: true, goal_type: "interest", category: "genre").count >0
      self.user.challenges.where(active: true, goal_type: "interest", category: "genre").pluck(:id, :category_identifier).each do |genre_challenge|
        if self.book.genre == genre_challenge[1] 
          ChallengeEntry.create!(book_id: self.book.id, challenge_id: genre_challenge[0], journey_entry_id: self.id)
        end
      end
    end
  end

  def create_challenge_entries_for_collection_interest_challenges
    if self.progress == 100 && self.user.challenges.where(active: true, goal_type: "interest", category: "collection_id").count >0
      self.user.challenges.where(active: true, goal_type: "interest", category: "collection_id").pluck(:id, :category_identifier).each do |collection_challenge|
        if CollectionEntry.where(book_id: self.book.id, collection_id: collection_challenge[1].to_i)
          ChallengeEntry.create!(book_id: self.book.id, challenge_id: collection_challenge[0], journey_entry_id: self.id)
        end
      end
    end
  end
  
end

