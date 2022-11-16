class Collection < ApplicationRecord

  belongs_to :user
  has_many :collection_entries, dependent: :destroy
  has_many :books, through: :collection_entries

  validates :name, presence: true, length: { minimum: 1 }
  validates :description, presence: true, length: { maximum: 250 }
  validates :user_id, presence: true, numericality: { only_integer: true }

end
