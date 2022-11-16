# refactor is_user_already_reading method to use unless condition instead of if condition, try to get method under 6 lines of code (currently at 6)

class Journey < ApplicationRecord

  belongs_to :user
  belongs_to :book

  validates :book_id, presence: true
  validates :user_id, presence: true
  # validate that it is a date? or is that implied through active record bc set as a date datatype in table?
  validates :start_date, presence: true 
  validates :completed, inclusion: { in: [ true, false ] }

  validate :is_user_already_reading
  # validate :if_end_date_then_completed

  # validates if a user is already reading a book, they cannot create another journey with that same book
  def is_user_already_reading
    if User.find(user_id).books.ids.include? book_id || 
      User.find(user_id).books.ids.each do |book|
        User.find(user_id).journeys.find_by(book_id: book).completed == false 
      end
      errors.add(:user, "is already reading this book right now")
    end
  end

  # validates if end date exists on record, completed attribute needs to be true
  # def if_end_date_then_completed
  #   debugger
  #   unless end_date? && completed?
  #     errors.add(:journey, "has an end date but is not marked as completed, please mark as completed and create record again.")
  #   end
  # end

end
