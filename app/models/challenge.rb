class Challenge < ApplicationRecord

  belongs_to :user
  has_many :challenge_entries
  has_many :books, through: :challenge_entries

  validates :name, presence: true
  validates :start_date, presence: true
  validates :user_id, presence: true, numericality: { only_integer: true }
  validates :goal_number, presence: true, :numericality => { greater_than_or_equal_to: 1 }
  validates :goal_type, inclusion: { in: [ "duration", "interest" ] }

  validate :category_must_be_sepcified

  private

  # if a record has the goal_type of interest selected, it must have a category and a category_identifier specfied; if a record has the goal_type of duration selected, it cannot have any data relating to cateogry and identifier
  def category_must_be_sepcified
    if self.goal_type == "interest"
      unless !self.category.blank? && !self.category_identifier.blank?
        errors.add(:challenge, "is of the interest type, so it must specify and identify the category of interest in their respective fields.")
      end
    elsif self.goal_type == "duration"
      unless self.category.blank? && self.category_identifier.blank?
        errors.add(:challenge, "is of the duration type, so it cannot specify a category and interest.")
      end
    end
end

end
