class CollectionEntry < ApplicationRecord

  belongs_to :book 
  belongs_to :collection
  has_one :user, through: :collection

  validates :book_id, presence: true, numericality: { only_integer: true }
  validates :collection_id, presence: true, numericality: { only_integer: true }

  validate :cannot_duplicate_book_in_collection

  # validation: check if the collection already contains the selected, does not allow for duplicate books in a Collection
  def cannot_duplicate_book_in_collection()
    if Collection.find(collection_id).books.ids.include? book_id
      errors.add(:book, "can only be added to a collection once, select another book and try again.")
    end
  end

end
