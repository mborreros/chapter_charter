class JourneyEntrySerializer < ActiveModel::Serializer
  attributes :id, :date, :progress, :created_at

  belongs_to :journey
  has_one :user, through: :journey
  has_one :book, through: :journey
  
end
