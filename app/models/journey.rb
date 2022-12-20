class Journey < ApplicationRecord

  belongs_to :user
  belongs_to :book

  has_many :journey_entries, dependent: :destroy

  validates :book_id, presence: true
  validates :user_id, presence: true
  validates :start_date, presence: true 
  validates :manually_completed, inclusion: { in: [ true, false ] }

  validate :is_user_already_reading, on: :create

  private
  
  # validates if a user is already reading a book, they cannot create another journey with that same book
  def is_user_already_reading
    if User.find(user_id).journeys.where(book_id: book, completed: false, manually_completed: false).pluck(book_id).include? book_id
      errors.add(:journey, "is currently being read, select a new book without an active journey and try again")
    end
  end

end
