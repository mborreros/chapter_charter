class Book < ApplicationRecord

  has_many :collection_entries
  has_many :collections, through: :collection_entries

  validates :title, presence: true
  validates :author, presence: true
  validates :length, presence: true, :numericality => { greater_than_or_equal_to: 1 }
  validates :genre, presence: true
  validates :cover_img, presence: true

end
