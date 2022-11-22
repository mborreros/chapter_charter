# refactor is_user_already_reading method to use unless condition instead of if condition, try to get method under 6 lines of code (currently at 6)

class Journey < ApplicationRecord

  belongs_to :user
  belongs_to :book

  has_many :journey_entries, dependent: :destroy

  validates :book_id, presence: true
  validates :user_id, presence: true
  validates :start_date, presence: true 
  validates :manually_completed, inclusion: { in: [ true, false ] }

  # validate :is_user_already_reading, on: :create

  private
  
  # validates if a user is already reading a book, they cannot create another journey with that same book
  def is_user_already_reading

    in_user_book_list = User.find(user_id).books.ids.include? book_id
    
    manually_completed = User.find(user_id).books.ids.each do |book|
      User.find(user_id).journeys.find_by(book_id: book).manually_completed == false
    end
    book_manually_completed = manually_completed.include? book_id

    in_progress = User.find(user_id).books.ids.each do |book|
      User.find(user_id).journeys.find_by(book_id: book).completed == false
    end
    book_in_progress = in_progress.include? book_id

    # if User.find(user_id).books.ids.include? book_id || book_manually_completed || book_in_progress
    #   errors.add(:user, "is already reading this book right now")
    # end

    if in_user_book_list && book_manually_completed
      errors.add(:user, "is already reading this book right now")
    elsif in_user_book_list && book_in_progress
      errors.add(:user, "is already reading this book right now")
    end

  end

end
