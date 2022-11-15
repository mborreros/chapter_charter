class CollectionEntry < ApplicationRecord

  belongs_to :book 
  belongs_to :collection
  has_one :user, through: :collection

  validates :book_id, presence: true
  validates :collection_id, presence: true

end
