class ChallengeEntry < ApplicationRecord

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

end

# {
#   "date": "2022-11-22",
#   "progress": 100,
#   "journey_id": 1
# }

# {
#   "start_date": "2022-11-22",
#   "end_date": null,
#   "manually_completed": false,
#   "user_id": 1,
#   "book_id": 1
# }