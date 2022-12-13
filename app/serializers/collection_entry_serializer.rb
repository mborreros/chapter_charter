class CollectionEntrySerializer < ActiveModel::Serializer
  attributes :id, :book_id, :collection_id

  belongs_to :collection
  belongs_to :book
end
