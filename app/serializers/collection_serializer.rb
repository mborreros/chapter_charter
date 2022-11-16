class CollectionSerializer < ActiveModel::Serializer

  attributes :id, :name, :description

  belongs_to :user
  has_many :books, through: :collection_entries

end
