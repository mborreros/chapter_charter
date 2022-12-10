class CollectionSerializer < ActiveModel::Serializer

  attributes :id, :name, :description, :created_at

  # belongs_to :user
  has_many :books, through: :collection_entries

end
