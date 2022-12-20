class Book < ApplicationRecord

  has_many :collection_entries
  has_many :collections, through: :collection_entries
  has_many :journeys

  validates :title, presence: true
  validates :author, presence: true
  validates :book_api_num, presence: true

end
