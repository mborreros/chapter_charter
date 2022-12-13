class CollectionSerializer < ActiveModel::Serializer

  attributes :id, :name, :description, :created_at

  # belongs_to :user
  has_many :books, through: :collection_entries
  has_many :collection_entries

end
