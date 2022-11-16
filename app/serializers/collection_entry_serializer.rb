class CollectionEntrySerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :collection
  belongs_to :book
end
