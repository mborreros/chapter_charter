class ChallengeEntry < ApplicationRecord

  after_create :mark_challenges_completed

  belongs_to :book
  belongs_to :challenge
  belongs_to :journey_entry
  has_one :user, through: :challenge

  validates :book_id, presence: true, numericality: { only_integer: true }
  validates :challenge_id, presence: true, numericality: { only_integer: true }
  validates :journey_entry_id, presence: true, numericality: { only_integer: true }

  validate :no_duplicate_books_in_a_challenge, on: :create

  # duplicate books cannot be added to a challenge, each book added to a challenge must be unique
  def no_duplicate_books_in_a_challenge
    unless Challenge.find(self.challenge_id).books.ids.exclude? self.book_id
      errors.add(:challenge_entry, "cannot be a book that has already contributed to this challenge's progress.")
    end
  end

  # marks challenges inactive and successful immediately after challenge_entry creation
  # catches any progress that would go over 100% before the scheduled challenge_status.rake is run at 12:00AM every night
  def mark_challenges_completed
    challenge = Challenge.find(self.challenge_id)
    if challenge.books.count == challenge.goal_number
      challenge.update!(active: false, successful: true)
    end
  end

end
