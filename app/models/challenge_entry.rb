class ChallengeEntry < ApplicationRecord

  belongs_to :book
  belongs_to :challenge
  has_one :user, through: :challenge

  validates :book_id, presence: true, numericality: { only_integer: true }
  validates :challenge_id, presence: true, numericality: { only_integer: true }

  validate :no_duplicate_books_in_a_challenge, on: :create

  # duplicate books cannot be added to a challenge, each book added to a challenge must be unique
  def no_duplicate_books_in_a_challenge
    unless Challenge.find(self.challenge_id).books.ids.exclude? self.book_id
      errors.add(:challenge_entry, "cannot be a book that has already contributed to this challenge's progress.")
    end
  end

end
